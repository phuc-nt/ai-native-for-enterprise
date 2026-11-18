// Reads the plain-text policy lists and compiles them into matchers.
// A missing list means that policy is switched off. A malformed line throws,
// naming the file and line, so that a typo cannot silently disable a rule.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { compileGlob } from './path-pattern-matcher.mjs';
import { describeCommand } from './shell-command-parser.mjs';

const GATE_DECISIONS = new Set(['ask', 'deny']);

function readEntries(directory, fileName) {
  const file = join(directory, fileName);
  if (!existsSync(file)) return [];
  return readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .map((line, index) => ({ text: line.trim(), where: `${fileName}:${index + 1}` }))
    .filter((entry) => entry.text !== '' && !entry.text.startsWith('#'));
}

function parseSensitivePaths(entries) {
  const sensitivePaths = { include: [], exclude: [] };
  for (const { text } of entries) {
    const isException = text.startsWith('!');
    const pattern = isException ? text.slice(1) : text;
    const target = isException ? sensitivePaths.exclude : sensitivePaths.include;
    target.push({ pattern, regex: compileGlob(pattern) });
  }
  return sensitivePaths;
}

function parseGatedCommand({ text, where }) {
  const separator = text.indexOf('::');
  const left = separator === -1 ? text : text.slice(0, separator);
  const reason = separator === -1 ? '' : text.slice(separator + 2).trim();
  const [decision, ...tokens] = left.trim().split(/\s+/);
  if (!GATE_DECISIONS.has(decision) || tokens.length === 0) {
    throw new Error(`${where}: expected "<ask|deny> <command> :: <reason>"`);
  }
  const { words, shortFlags, longFlags } = describeCommand(tokens);
  return { decision, pattern: tokens.join(' '), words, shortFlags, longFlags, reason };
}

function parseSecretPattern({ text, where }) {
  const match = /^(\S+)\s+(.+)$/.exec(text);
  if (!match) throw new Error(`${where}: expected "<name> <regular expression>"`);
  try {
    return { name: match[1], regex: new RegExp(match[2]) };
  } catch (error) {
    throw new Error(`${where}: invalid regular expression (${error.message})`);
  }
}

/** Load every policy list found in a directory. */
export function loadPolicies(directory) {
  return {
    sensitivePaths: parseSensitivePaths(readEntries(directory, 'sensitive-paths.txt')),
    ignoredDirectories: new Set(
      readEntries(directory, 'ignored-paths.txt').map((entry) => entry.text.toLowerCase()),
    ),
    gatedCommands: readEntries(directory, 'gated-commands.txt').map(parseGatedCommand),
    secretPatterns: readEntries(directory, 'secret-patterns.txt').map(parseSecretPattern),
  };
}
