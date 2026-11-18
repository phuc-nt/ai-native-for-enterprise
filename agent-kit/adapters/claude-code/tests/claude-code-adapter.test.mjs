// Exercises the adapter the way Claude Code does: the installer is run against
// a throwaway project, then the installed hook is fed tool-call events on stdin.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { mergeHookRegistration } from '../settings-hook-merger.mjs';

const ADAPTER_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const INSTALLER = join(ADAPTER_DIR, '..', '..', 'install.mjs');
const registration = JSON.parse(readFileSync(join(ADAPTER_DIR, 'hook-registration.json'), 'utf8'));
const temporaryProjects = [];

function newProject() {
  const project = mkdtempSync(join(tmpdir(), 'agent-kit-project-'));
  temporaryProjects.push(project);
  return project;
}
after(() => temporaryProjects.forEach((path) => rmSync(path, { recursive: true, force: true })));

const runInstaller = (...args) => spawnSync(process.execPath, [INSTALLER, 'claude-code', ...args], { encoding: 'utf8' });
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

function runHook(project, event) {
  const hook = join(project, '.claude/agent-kit/adapters/claude-code/pre-tool-use-hook.mjs');
  return spawnSync(process.execPath, [hook], { input: JSON.stringify(event), encoding: 'utf8' });
}
function hookDecision(project, toolName, toolInput) {
  const result = runHook(project, { tool_name: toolName, tool_input: toolInput, cwd: project });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout === '' ? null : JSON.parse(result.stdout).hookSpecificOutput;
}

test('merging the registration is idempotent and keeps other settings', () => {
  const original = {
    permissions: { allow: ['Bash(npm test)'] },
    hooks: { PreToolUse: [{ matcher: 'Bash', hooks: [{ type: 'command', command: 'other' }] }] },
  };
  const first = mergeHookRegistration(original, registration);
  assert.equal(first.changed, true);
  assert.deepEqual(first.settings.permissions, original.permissions);
  assert.equal(first.settings.hooks.PreToolUse.length, 2);
  assert.equal(original.hooks.PreToolUse.length, 1, 'input must not be modified');
  assert.equal(mergeHookRegistration(first.settings, registration).changed, false);
});

test('a dry run writes nothing', () => {
  const project = newProject();
  const result = runInstaller(project, '--dry-run');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(join(project, '.claude')), false);
});

test('install places rules, skills, guard, policies, and the hook registration', () => {
  const project = newProject();
  mkdirSync(join(project, '.claude'));
  writeFileSync(join(project, '.claude/settings.json'), '{"permissions":{"deny":["WebFetch"]}}');

  const result = runInstaller(project);
  assert.equal(result.status, 0, result.stderr);
  for (const path of ['rules/agent-kit/scope-and-quality.md', 'skills/docs/SKILL.md',
    'agent-kit/guard/policy-evaluator.mjs', 'agent-kit/policies/gated-commands.txt',
    'agent-kit/adapters/claude-code/pre-tool-use-hook.mjs', 'agent-kit/installed.json']) {
    assert.ok(existsSync(join(project, '.claude', path)), path);
  }
  assert.equal(existsSync(join(project, '.claude/agent-kit/guard/tests')), false);

  const settings = readJson(join(project, '.claude/settings.json'));
  assert.deepEqual(settings.permissions, { deny: ['WebFetch'] });
  assert.deepEqual(settings.hooks.PreToolUse, [registration]);
});

test('reinstall keeps edited policies, removes stale kit files, and is otherwise a no-op', () => {
  const project = newProject();
  assert.equal(runInstaller(project).status, 0);
  const claude = join(project, '.claude');

  const policy = join(claude, 'agent-kit/policies/ignored-paths.txt');
  writeFileSync(policy, 'node_modules\n');
  const manifestPath = join(claude, 'agent-kit/installed.json');
  const manifest = readJson(manifestPath);
  manifest.files.push('rules/agent-kit/retired-rule.md');
  writeFileSync(manifestPath, JSON.stringify(manifest));
  writeFileSync(join(claude, 'rules/agent-kit/retired-rule.md'), 'old');

  const result = runInstaller(project);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(policy, 'utf8'), 'node_modules\n');
  assert.equal(existsSync(join(claude, 'rules/agent-kit/retired-rule.md')), false);
  assert.equal(readJson(join(claude, 'settings.json')).hooks.PreToolUse.length, 1);

  assert.equal(runInstaller(project, '--reset-policies').status, 0);
  assert.notEqual(readFileSync(policy, 'utf8'), 'node_modules\n');
});

test('a file the kit did not install is not overwritten without --force', () => {
  const project = newProject();
  const ownSkill = join(project, '.claude/skills/review/SKILL.md');
  mkdirSync(dirname(ownSkill), { recursive: true });
  writeFileSync(ownSkill, 'the project wrote this');

  const refused = runInstaller(project);
  assert.equal(refused.status, 1);
  assert.match(refused.stdout, /conflict\s+\.claude\/skills\/review\/SKILL\.md/);
  assert.equal(readFileSync(ownSkill, 'utf8'), 'the project wrote this');
  assert.equal(existsSync(join(project, '.claude/rules')), false, 'nothing else was written');

  assert.equal(runInstaller(project, '--force').status, 0);
  assert.notEqual(readFileSync(ownSkill, 'utf8'), 'the project wrote this');
});

test('the installed hook reports ask and deny in Claude Code form and is silent on allow', () => {
  const project = newProject();
  assert.equal(runInstaller(project).status, 0);

  assert.equal(hookDecision(project, 'Read', { file_path: 'src/index.ts' }), null);
  assert.equal(hookDecision(project, 'Bash', { command: 'npm test' }), null);
  assert.equal(hookDecision(project, 'WebFetch', { url: 'https://example.test' }), null);

  const ask = hookDecision(project, 'Read', { file_path: join(project, '.env') });
  assert.equal(ask.hookEventName, 'PreToolUse');
  assert.equal(ask.permissionDecision, 'ask');
  assert.match(ask.permissionDecisionReason, /^agent-kit guard: /);

  assert.equal(hookDecision(project, 'Bash', { command: 'git push origin main' }).permissionDecision, 'ask');
  assert.equal(hookDecision(project, 'Bash', { command: 'git push --force' }).permissionDecision, 'deny');
  assert.equal(hookDecision(project, 'Grep', { pattern: 'x', path: 'node_modules' }).permissionDecision, 'deny');
  assert.equal(hookDecision(project, 'Glob', { pattern: '**/dist/**' }).permissionDecision, 'deny');
  const secret = ['AKIA', 'IOSFODNN7', 'EXAMPLE'].join('');
  for (const [tool, input] of [
    ['Write', { file_path: 'a.ts', content: secret }],
    ['Edit', { file_path: 'a.ts', old_string: 'x', new_string: secret }],
    ['NotebookEdit', { notebook_path: 'a.ipynb', new_source: secret }],
  ]) {
    assert.equal(hookDecision(project, tool, input).permissionDecision, 'deny', tool);
  }
});

test('a broken policy list is a visible, non-blocking hook error', () => {
  const project = newProject();
  assert.equal(runInstaller(project).status, 0);
  writeFileSync(join(project, '.claude/agent-kit/policies/gated-commands.txt'), 'maybe git push\n');

  const result = runHook(project, { tool_name: 'Bash', tool_input: { command: 'ls' } });
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /gated-commands\.txt:1/);
});
