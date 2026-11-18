// Installs the kit for Kiro into a throwaway project, then feeds the
// installed hook the events Kiro sends.

import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { installedProject, runHook } from '../../shared/installed-adapter-test-helpers.mjs';

const { project, install, result } = installedProject('kiro');
const hook = join(project, '.kiro/agent-kit/adapters/kiro/pre-tool-use-hook.mjs');

const callTool = (toolName, toolInput) => runHook(hook, {
  hook_event_name: 'PreToolUse', cwd: project, session_id: 's', tool_name: toolName, tool_input: toolInput,
});

test('install places steering files, skills, the guard, and the hooks file', () => {
  assert.equal(result.status, 0, result.stderr);
  for (const path of ['steering/agent-kit-scope-and-quality.md', 'skills/docs/SKILL.md',
    'agent-kit/guard/policy-evaluator.mjs', 'agent-kit/policies/gated-commands.txt']) {
    assert.ok(existsSync(join(project, '.kiro', path)), path);
  }
  const hooksFile = JSON.parse(readFileSync(join(project, '.kiro/hooks/agent-kit-guard.json'), 'utf8'));
  assert.equal(hooksFile.version, 'v1');
  const [registered] = hooksFile.hooks;
  assert.equal(registered.trigger, 'PreToolUse');
  assert.ok(existsSync(join(project, registered.action.command.replace(/^node /, ''))));
});

test('reinstalling changes nothing', () => {
  const again = install();
  assert.equal(again.status, 0, again.stderr);
  assert.doesNotMatch(again.stdout, /^write/m);
});

test('allowed calls exit cleanly and say nothing', () => {
  for (const [tool, input] of [
    ['execute_bash', { command: 'npm test' }],
    ['read_file', { path: 'src/app.ts' }],
    ['fs_write', { path: 'src/app.ts', text: 'export {};' }],
    ['mcp_postgres_query', { sql: 'select 1' }],
  ]) {
    const run = callTool(tool, input);
    assert.equal(run.status, 0, `${tool}: ${run.stderr}`);
    assert.equal(run.stdout + run.stderr, '', tool);
  }
});

test('refused calls exit with the blocking code and explain on stderr', () => {
  const secret = ['AKIA', 'IOSFODNN7', 'EXAMPLE'].join('');
  for (const [tool, input] of [
    ['execute_bash', { command: 'git push --force' }],
    ['grep_search', { query: 'x', path: 'node_modules' }],
    ['file_search', { query: '**/dist/**' }],
    ['list_directory', { path: 'node_modules' }],
    ['fs_write', { path: 'a.ts', text: secret }],
    ['str_replace', { path: 'a.ts', oldStr: 'x', newStr: secret }],
    ['fs_append', { path: 'a.ts', text: secret }],
  ]) {
    const run = callTool(tool, input);
    assert.equal(run.status, 2, tool);
    assert.match(run.stderr, /^agent-kit guard: /, tool);
    assert.doesNotMatch(run.stderr, /cannot ask the user/, tool);
  }
});

test('a decision that needs the user is refused and handed to the user', () => {
  for (const [tool, input] of [
    ['execute_bash', { command: 'git push origin main' }],
    ['read_file', { path: '.env' }],
    ['delete_file', { path: '.env' }],
    ['read_file', { path: 'node_modules/react/index.js' }],
  ]) {
    const run = callTool(tool, input);
    assert.equal(run.status, 2, tool);
    assert.match(run.stderr, /cannot ask the user from a hook/, tool);
  }
});

test('a guard failure does not block the tool call', () => {
  const policy = join(project, '.kiro/agent-kit/policies/gated-commands.txt');
  const original = readFileSync(policy, 'utf8');
  writeFileSync(policy, 'maybe git push\n');
  try {
    const run = callTool('execute_bash', { command: 'git push' });
    assert.equal(run.status, 0);
    assert.match(run.stdout, /was not checked/);
  } finally {
    writeFileSync(policy, original);
  }
});
