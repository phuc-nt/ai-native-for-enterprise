import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  compileGlob, findIgnoredSegment, matchSensitivePath, normalizePath,
} from '../path-pattern-matcher.mjs';

const sensitive = (include, exclude = []) => ({
  include: include.map((pattern) => ({ pattern, regex: compileGlob(pattern) })),
  exclude: exclude.map((pattern) => ({ pattern, regex: compileGlob(pattern) })),
});

test('normalizes leading ./, repeated slashes, and a trailing slash', () => {
  assert.equal(normalizePath('./a//b/'), 'a/b');
  assert.equal(normalizePath('/'), '/');
});

test('a pattern without a slash matches the file name at any depth', () => {
  const policy = sensitive(['.env', '.env.*', '*.pem']);
  assert.equal(matchSensitivePath('.env', policy), '.env');
  assert.equal(matchSensitivePath('/work/app/.env.production', policy), '.env.*');
  assert.equal(matchSensitivePath('certs/server.pem', policy), '*.pem');
  assert.equal(matchSensitivePath('src/environment.ts', policy), null);
  assert.equal(matchSensitivePath('docs/dotenv.md', policy), null);
});

test('a single star does not cross a directory boundary', () => {
  const policy = sensitive(['config/*.key']);
  assert.equal(matchSensitivePath('app/config/tls.key', policy), 'config/*.key');
  assert.equal(matchSensitivePath('config/nested/tls.key', policy), null);
});

test('dir/** covers the directory and everything under it', () => {
  const policy = sensitive(['.ssh/**', 'secrets/**']);
  assert.equal(matchSensitivePath('/home/me/.ssh', policy), '.ssh/**');
  assert.equal(matchSensitivePath('/home/me/.ssh/keys/deploy', policy), '.ssh/**');
  assert.equal(matchSensitivePath('infra/secrets/prod.yml', policy), 'secrets/**');
  assert.equal(matchSensitivePath('src/secrets-manager.ts', policy), null);
});

test('an exception always wins', () => {
  const policy = sensitive(['.env.*', 'id_rsa*'], ['.env.example', '*.pub']);
  assert.equal(matchSensitivePath('.env.example', policy), null);
  assert.equal(matchSensitivePath('.ssh/id_rsa.pub', policy), null);
  assert.equal(matchSensitivePath('.ssh/id_rsa', policy), 'id_rsa*');
});

test('matching ignores letter case', () => {
  assert.equal(matchSensitivePath('.ENV', sensitive(['.env'])), '.env');
});

test('an ignored directory is found only as a whole segment', () => {
  const ignored = new Set(['node_modules', 'dist']);
  assert.equal(findIgnoredSegment('node_modules/react/index.js', ignored), 'node_modules');
  assert.equal(findIgnoredSegment('./packages/a/dist', ignored), 'dist');
  assert.equal(findIgnoredSegment('**/node_modules/**', ignored), 'node_modules');
  assert.equal(findIgnoredSegment('src/distribution/index.ts', ignored), null);
  assert.equal(findIgnoredSegment('docs/node_modules.md', ignored), null);
});
