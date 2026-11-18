import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseToolArguments, toNeutralAction } from '../tool-input-fields.mjs';

test('arguments are accepted as an object or as a JSON string', () => {
  assert.deepEqual(parseToolArguments({ command: 'ls' }), { command: 'ls' });
  assert.deepEqual(parseToolArguments('{"command":"ls"}'), { command: 'ls' });
  assert.deepEqual(parseToolArguments('*** Begin Patch'), { text: '*** Begin Patch' });
  assert.deepEqual(parseToolArguments(undefined), {});
});

test('locations are found under any of the usual field names, at any depth', () => {
  assert.deepEqual(toNeutralAction('read', { path: 'a.ts' }).paths, ['a.ts']);
  assert.deepEqual(toNeutralAction('read', { file_path: 'a.ts' }).paths, ['a.ts']);
  assert.deepEqual(toNeutralAction('read', { filePath: 'a.ts' }).paths, ['a.ts']);
  assert.deepEqual(
    toNeutralAction('read', { operations: [{ mode: 'Line', path: 'a.ts' }, { path: 'b.ts' }] }).paths,
    ['a.ts', 'b.ts'],
  );
});

test('a content search pattern is not a location, but a file query is', () => {
  assert.deepEqual(toNeutralAction('search', { pattern: 'node_modules', path: 'src' }).paths, ['src']);
  assert.deepEqual(toNeutralAction('find-files', { pattern: '**/dist/**' }).paths, ['**/dist/**']);
});

test('a write carries its text without the path', () => {
  const action = toNeutralAction('write', { path: 'a.ts', old_str: 'x', new_str: 'y' });
  assert.deepEqual(action, { kind: 'write', paths: ['a.ts'], content: 'x\ny' });
});

test('a shell call carries its command line', () => {
  assert.deepEqual(toNeutralAction('shell', { command: 'git push' }), { kind: 'shell', command: 'git push' });
  assert.equal(toNeutralAction('shell', {}).command, '');
});
