// Runs the evaluator against the policy lists the kit actually ships, so a
// change to a list that breaks an expectation below is caught here.

import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { evaluateAction } from '../policy-evaluator.mjs';
import { loadPolicies } from '../policy-file-loader.mjs';

const policies = loadPolicies(join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'policies'));

const decide = (action) => evaluateAction(action, policies).decision;
const shell = (command) => decide({ kind: 'shell', command });
const read = (path) => decide({ kind: 'read', paths: [path] });

// Credential-shaped test values are assembled at run time so that this file
// never contains one, and the guard does not refuse edits to its own tests.
const fakeAwsKeyId = ['AKIA', 'IOSFODNN7', 'EXAMPLE'].join('');
const fakeGithubToken = `ghp_${'a1B2'.repeat(9)}`;
const fakeKeyBlock = `-----BEGIN RSA ${'PRIVATE'} KEY-----`;

test('ordinary work is allowed', () => {
  assert.equal(read('src/index.ts'), 'allow');
  assert.equal(decide({ kind: 'search', paths: ['src', '**/*.ts'] }), 'allow');
  assert.equal(decide({ kind: 'write', paths: ['src/a.ts'], content: 'export const a = 1;' }), 'allow');
  for (const command of ['npm test', 'npm run build', 'git status', 'git commit -m "add x"',
    'git stash push -m wip', 'npm run publish-docs', 'rm -rf dist', 'ls src', 'cat package.json']) {
    assert.equal(shell(command), 'allow', command);
  }
});

test('sensitive files ask, whichever tool reaches for them', () => {
  assert.equal(read('.env'), 'ask');
  assert.equal(read('/work/app/config/.env.production'), 'ask');
  assert.equal(decide({ kind: 'write', paths: ['deploy/server.pem'], content: 'x' }), 'ask');
  assert.equal(shell('cat .env'), 'ask');
  assert.equal(shell('source ./.env && npm start'), 'ask');
  assert.equal(shell('cp .env.example .env'), 'ask');
  assert.equal(shell('docker compose --env-file=.env.staging up'), 'ask');
  assert.equal(shell('grep TOKEN < ~/.npmrc'), 'ask');
});

test('documented exceptions and look-alikes do not ask', () => {
  assert.equal(read('.env.example'), 'allow');
  assert.equal(read('/home/me/.ssh/id_ed25519.pub'), 'allow');
  assert.equal(read('src/env.ts'), 'allow');
  assert.equal(shell('git add .env.example'), 'allow');
  assert.equal(shell('echo "copy .env.example to .env first"'), 'allow');
});

test('generated and dependency directories cannot be searched or listed', () => {
  assert.equal(decide({ kind: 'search', paths: [undefined, '**/node_modules/**'] }), 'deny');
  assert.equal(decide({ kind: 'search', paths: ['dist'] }), 'deny');
  for (const command of ['ls node_modules', 'find node_modules -name "*.d.ts"',
    'grep -r useState node_modules/react', 'rg TODO build', 'grep useState node_modules/react/index.js',
    'cat node_modules/*/package.json']) {
    assert.equal(shell(command), 'deny', command);
  }
});

test('reading one named file inside such a directory asks the user', () => {
  assert.equal(read('node_modules/react/package.json'), 'ask');
  assert.equal(read('/work/app/.git/config'), 'ask');
  for (const command of ['cat dist/main.js', 'tail -n 20 coverage/lcov.info',
    'head -50 node_modules/react/index.js']) {
    assert.equal(shell(command), 'ask', command);
  }
  // A sweep in the same command line still wins.
  assert.equal(shell('cat dist/main.js && ls node_modules'), 'deny');
});

test('builds, exclusions, and search terms that name those directories are allowed', () => {
  for (const command of [
    'npm install',
    'rm -rf node_modules && npm ci',
    'node dist/main.js',
    'grep -rn "node_modules" src',
    'rg build src',
    'grep -r TODO . --exclude-dir=node_modules',
    'grep -r --exclude-dir node_modules TODO .',
    "rg TODO -g '!dist'",
    'find . -name "*.ts" -not -path "./node_modules/*"',
    'grep -e dist -r src',
  ]) {
    assert.equal(shell(command), 'allow', command);
  }
  assert.equal(decide({ kind: 'write', paths: ['dist/placeholder.txt'], content: 'x' }), 'allow');
});

test('publishing, deploying, and discarding work ask the user', () => {
  for (const command of [
    'git push',
    'git push origin main --force-with-lease',
    'git -C ../service push',
    'sudo git push',
    'npm test && git push -u origin feature',
    'gh pr create --fill',
    'gh pr merge 12 --squash',
    'npm publish --access public',
    'npx vercel --prod',
    'kubectl -n prod apply -f deploy.yaml',
    'terraform apply -auto-approve',
    'git reset --hard HEAD~1',
    'git clean -fdx',
    'git branch -D old-feature',
    'bash -c "git push"',
  ]) {
    assert.equal(shell(command), 'ask', command);
  }
});

test('related harmless commands stay allowed', () => {
  for (const command of ['git reset HEAD~1', 'git clean -n', 'git branch -d merged', 'gh pr view 12',
    'gh pr list', 'terraform plan', 'kubectl get pods', 'vercel --version', 'git stash list',
    'git log --grep push', 'echo "git push"']) {
    assert.equal(shell(command), 'allow', command);
  }
});

test('history rewrites, skipped checks, and root deletions are refused', () => {
  for (const command of [
    'git push --force',
    'git push origin main -f',
    'git commit --no-verify -m "wip"',
    'git commit -nm "wip"',
    'gh pr merge 12 --admin',
    'rm -rf /',
    'rm -fr ~',
    'sudo rm -r -f "$HOME"',
    'npm test; git push --force origin main',
  ]) {
    assert.equal(shell(command), 'deny', command);
  }
});

test('credential-shaped values cannot be written or put on a command line', () => {
  const write = (content) => decide({ kind: 'write', paths: ['src/config.ts'], content });
  assert.equal(write(`const key = "${fakeAwsKeyId}";`), 'deny');
  assert.equal(write(`token: ${fakeGithubToken}`), 'deny');
  assert.equal(write(`${fakeKeyBlock}\nabc`), 'deny');
  assert.equal(shell(`curl -H "Authorization: Bearer ${fakeGithubToken}" https://example.test`), 'deny');
  assert.equal(write('const key = process.env.AWS_ACCESS_KEY_ID;'), 'allow');
  assert.equal(write('Use a token that starts with ghp_ and store it in the vault.'), 'allow');
});

test('the strictest decision wins and the reason never repeats the secret', () => {
  const result = evaluateAction(
    { kind: 'write', paths: ['.env'], content: `AWS_ACCESS_KEY_ID=${fakeAwsKeyId}` },
    policies,
  );
  assert.equal(result.decision, 'deny');
  assert.match(result.reason, /aws-access-key-id/);
  assert.ok(!result.reason.includes(fakeAwsKeyId));
});

test('a reason names the policy entry that matched', () => {
  assert.match(evaluateAction({ kind: 'read', paths: ['.env'] }, policies).reason, /"\.env"/);
  assert.match(evaluateAction({ kind: 'shell', command: 'git push' }, policies).reason, /git push/);
});

test('an unknown action kind is an error, not a silent allow', () => {
  assert.throws(() => evaluateAction({ kind: 'teleport' }, policies), /Unknown action kind/);
});
