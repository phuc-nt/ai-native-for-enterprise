import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  describeCommand, describeShellCommands, splitShellCommands,
} from '../shell-command-parser.mjs';

test('splits on shell operators and keeps quoted text as one token', () => {
  assert.deepEqual(splitShellCommands('git add . && git commit -m "fix; push later" | cat'), [
    ['git', 'add', '.'],
    ['git', 'commit', '-m', 'fix; push later'],
    ['cat'],
  ]);
});

test('single quotes are literal and double quotes honour their escapes', () => {
  assert.deepEqual(splitShellCommands(`echo 'a "b" $c' "say \\"hi\\""`), [
    ['echo', 'a "b" $c', 'say "hi"'],
  ]);
});

test('redirections end a token so the target file is visible', () => {
  assert.deepEqual(splitShellCommands('cat <in.txt >out.txt'), [['cat', 'in.txt', 'out.txt']]);
});

test('comments and line continuations are not commands', () => {
  assert.deepEqual(splitShellCommands('ls \\\n  src # git push\npwd'), [['ls', 'src'], ['pwd']]);
});

test('command substitution and subshells are separate commands', () => {
  assert.deepEqual(splitShellCommands('echo $(git rev-parse HEAD); (cd a; ls)'), [
    ['echo'],
    ['git', 'rev-parse', 'HEAD'],
    ['cd', 'a'],
    ['ls'],
  ]);
});

test('wrappers, assignments, and keywords are not the command name', () => {
  assert.equal(describeCommand(['sudo', '-E', 'git', 'push']).name, 'git');
  assert.equal(describeCommand(['CI=1', 'env', 'FOO=bar', 'npm', 'publish']).name, 'npm');
  assert.equal(describeCommand(['if', 'npx', '--yes', 'vercel', 'deploy']).name, 'vercel');
  assert.equal(describeCommand(['/usr/bin/git', 'status']).name, 'git');
  assert.equal(describeCommand(['FOO=bar']), null);
});

test('words exclude flags, and flags are collected by letter and by name', () => {
  const command = describeCommand(['rm', '-r', '-f', '--verbose', 'build', 'dist']);
  assert.deepEqual(command.words, ['rm', 'build', 'dist']);
  assert.deepEqual([...command.shortFlags].sort(), ['f', 'r']);
  assert.deepEqual([...command.longFlags], ['--verbose']);
});

test('a global option value is not mistaken for the subcommand', () => {
  assert.deepEqual(describeCommand(['git', '-C', '../other', 'push']).words, ['git', 'push']);
  assert.deepEqual(
    describeCommand(['kubectl', '-n', 'prod', 'delete', 'pod', 'x']).words,
    ['kubectl', 'delete', 'pod', 'x'],
  );
});

test('scripts passed to a shell or to eval are described too', () => {
  const names = (line) => describeShellCommands(line).map((command) => command.words.join(' '));
  assert.deepEqual(names('bash -lc "cd app && git push"'), [
    'bash cd app && git push',
    'cd app',
    'git push',
  ]);
  assert.ok(names('eval "git push origin main"').includes('git push origin main'));
});
