import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { loadPolicies } from '../policy-file-loader.mjs';

function withPolicyFiles(files, run) {
  const directory = mkdtempSync(join(tmpdir(), 'agent-kit-policies-'));
  try {
    for (const [name, content] of Object.entries(files)) {
      writeFileSync(join(directory, name), content);
    }
    return run(directory);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test('a missing list switches that policy off', () => {
  withPolicyFiles({}, (directory) => {
    const policies = loadPolicies(directory);
    assert.deepEqual(policies.sensitivePaths, { include: [], exclude: [] });
    assert.equal(policies.ignoredDirectories.size, 0);
    assert.deepEqual(policies.gatedCommands, []);
    assert.deepEqual(policies.secretPatterns, []);
  });
});

test('comments and blank lines are skipped, exceptions are separated', () => {
  withPolicyFiles({ 'sensitive-paths.txt': '# note\n\n.env\n!.env.example\n' }, (directory) => {
    const { sensitivePaths } = loadPolicies(directory);
    assert.deepEqual(sensitivePaths.include.map((entry) => entry.pattern), ['.env']);
    assert.deepEqual(sensitivePaths.exclude.map((entry) => entry.pattern), ['.env.example']);
  });
});

test('a gated command keeps its decision, flags, and reason', () => {
  withPolicyFiles({ 'gated-commands.txt': 'deny git push --force :: rewrites history\n' }, (directory) => {
    const [gate] = loadPolicies(directory).gatedCommands;
    assert.equal(gate.decision, 'deny');
    assert.deepEqual(gate.words, ['git', 'push']);
    assert.deepEqual([...gate.longFlags], ['--force']);
    assert.equal(gate.reason, 'rewrites history');
  });
});

test('a malformed line fails loudly with its location', () => {
  withPolicyFiles({ 'gated-commands.txt': '# ok\nallow git push\n' }, (directory) => {
    assert.throws(() => loadPolicies(directory), /gated-commands\.txt:2/);
  });
  withPolicyFiles({ 'secret-patterns.txt': 'broken ([a-z\n' }, (directory) => {
    assert.throws(() => loadPolicies(directory), /secret-patterns\.txt:1: invalid regular expression/);
  });
});
