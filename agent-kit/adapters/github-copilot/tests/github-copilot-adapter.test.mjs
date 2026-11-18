// Installs the kit for GitHub Copilot into a throwaway project, then feeds
// the installed hook the events Copilot sends.

import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { installedProject, runHook } from '../../shared/installed-adapter-test-helpers.mjs';

const { project, install, result } = installedProject('github-copilot');
const hook = join(project, '.github/agent-kit/adapters/github-copilot/pre-tool-use-hook.mjs');

function decision(toolName, toolArgs) {
  const run = runHook(hook, { timestamp: 1, cwd: project, toolName, toolArgs });
  assert.equal(run.status, 0, run.stderr);
  return run.stdout === '' ? null : JSON.parse(run.stdout);
}

test('install places instructions, skills, the guard, and the hooks file', () => {
  assert.equal(result.status, 0, result.stderr);
  for (const path of ['skills/docs/SKILL.md', 'agent-kit/guard/policy-evaluator.mjs',
    'agent-kit/policies/gated-commands.txt', 'agent-kit/adapters/shared/tool-input-fields.mjs']) {
    assert.ok(existsSync(join(project, '.github', path)), path);
  }
  assert.equal(
    existsSync(join(project, '.github/agent-kit/adapters/shared/installed-adapter-test-helpers.mjs')),
    false,
  );
  const rule = readFileSync(
    join(project, '.github/instructions/agent-kit/scope-and-quality.instructions.md'), 'utf8',
  );
  assert.ok(rule.startsWith('---\napplyTo: "**"\n---\n\n# Scope and Quality'));

  const hooksFile = JSON.parse(readFileSync(join(project, '.github/hooks/agent-kit-guard.json'), 'utf8'));
  assert.equal(hooksFile.version, 1);
  const [registered] = hooksFile.hooks.preToolUse;
  assert.ok(existsSync(join(project, registered.command.replace(/^node /, ''))), registered.command);
});

test('reinstalling changes nothing', () => {
  const again = install();
  assert.equal(again.status, 0, again.stderr);
  assert.doesNotMatch(again.stdout, /^write/m);
});

test('the hook reports ask and deny at the top level, and is silent on allow', () => {
  assert.equal(decision('bash', JSON.stringify({ command: 'npm test' })), null);
  assert.equal(decision('view', JSON.stringify({ path: 'src/app.ts' })), null);
  assert.equal(decision('web_fetch', JSON.stringify({ url: 'https://example.com' })), null);

  const push = decision('bash', JSON.stringify({ command: 'git push origin main' }));
  assert.equal(push.permissionDecision, 'ask');
  assert.match(push.permissionDecisionReason, /^agent-kit guard: /);

  assert.equal(decision('bash', JSON.stringify({ command: 'git push --force' })).permissionDecision, 'deny');
  assert.equal(decision('view', JSON.stringify({ path: '.env' })).permissionDecision, 'ask');
  assert.equal(decision('grep', JSON.stringify({ pattern: 'x', path: 'node_modules' })).permissionDecision, 'deny');
  assert.equal(decision('glob', JSON.stringify({ pattern: '**/dist/**' })).permissionDecision, 'deny');

  const secret = ['AKIA', 'IOSFODNN7', 'EXAMPLE'].join('');
  assert.equal(decision('create', JSON.stringify({ path: 'a.ts', file_text: secret })).permissionDecision, 'deny');
  assert.equal(decision('edit', JSON.stringify({ path: 'a.ts', old_str: 'x', new_str: secret })).permissionDecision, 'deny');
  assert.equal(decision('apply_patch', `*** Update File: a.ts\n+${secret}`).permissionDecision, 'deny');
});

test('arguments given as an object and Claude-style event fields are understood', () => {
  assert.equal(decision('bash', { command: 'git push' }).permissionDecision, 'ask');
  const run = runHook(hook, { tool_name: 'Bash', tool_input: { command: 'git push' } });
  assert.equal(JSON.parse(run.stdout).permissionDecision, 'ask');
});

test('a guard failure does not block the tool call', () => {
  const policy = join(project, '.github/agent-kit/policies/gated-commands.txt');
  const original = readFileSync(policy, 'utf8');
  writeFileSync(policy, 'maybe git push\n');
  try {
    const run = runHook(hook, { toolName: 'bash', toolArgs: '{"command":"git push"}' });
    assert.equal(run.status, 0);
    assert.equal(run.stdout, '');
    assert.match(run.stderr, /was not checked/);
  } finally {
    writeFileSync(policy, original);
  }
});
