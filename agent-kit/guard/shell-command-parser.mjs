// Turns a shell command line into a list of simple commands the policy
// evaluator can reason about. This is a tokenizer, not a shell: it sees the
// text of the command, not what variables, aliases, or scripts expand to.

import { basename } from 'node:path';

const COMMAND_SEPARATORS = new Set([';', '|', '&', '\n', '(', ')', '`']);
const TOKEN_SEPARATORS = new Set([' ', '\t', '\r', '<', '>']);
const ESCAPABLE_IN_DOUBLE_QUOTES = new Set(['"', '\\', '$', '`']);

/** Split a command line into simple commands, each a list of unquoted tokens. */
export function splitShellCommands(source) {
  const commands = [];
  let tokens = [];
  let current = '';
  let tokenOpen = false;
  let quote = null;

  const endToken = () => {
    if (tokenOpen) tokens.push(current);
    current = '';
    tokenOpen = false;
  };
  const endCommand = () => {
    endToken();
    if (tokens.length > 0) commands.push(tokens);
    tokens = [];
  };

  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    const next = source[i + 1];

    if (quote === "'") {
      if (char === "'") quote = null;
      else current += char;
    } else if (quote === '"') {
      if (char === '"') quote = null;
      else if (char === '\\' && ESCAPABLE_IN_DOUBLE_QUOTES.has(next)) current += source[++i];
      else current += char;
    } else if (char === "'" || char === '"') {
      quote = char;
      tokenOpen = true;
    } else if (char === '\\') {
      // A backslash-newline is a line continuation; otherwise it escapes one character.
      if (next !== undefined && next !== '\n') {
        current += next;
        tokenOpen = true;
      }
      i++;
    } else if (char === '#' && !tokenOpen) {
      while (i + 1 < source.length && source[i + 1] !== '\n') i++;
    } else if (char === '$' && next === '(') {
      endCommand();
      i++;
    } else if (COMMAND_SEPARATORS.has(char)) {
      endCommand();
    } else if (TOKEN_SEPARATORS.has(char)) {
      endToken();
    } else {
      current += char;
      tokenOpen = true;
    }
  }
  endCommand();
  return commands;
}

// Words that run or introduce another command and are not the command itself.
const PREFIX_WORDS = new Set([
  'sudo', 'doas', 'env', 'command', 'exec', 'time', 'nohup', 'xargs', 'npx', 'bunx',
  'if', 'then', 'else', 'elif', 'do', 'while', 'until', '!', '{',
]);
const VARIABLE_ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/;

// Options that take a separate value and may sit between a command name and
// its subcommand, e.g. `git -C ../other push`. Without this table the value
// would be mistaken for the subcommand.
const GLOBAL_VALUE_FLAGS = {
  git: ['-C', '-c', '--git-dir', '--work-tree'],
  gh: ['-R', '--repo'],
  kubectl: ['-n', '--namespace', '--context', '--kubeconfig'],
  helm: ['-n', '--namespace', '--kube-context'],
  docker: ['-H', '--host', '--context'],
  npm: ['--prefix', '-w', '--workspace'],
  pnpm: ['-C', '--dir', '-F', '--filter'],
  yarn: ['--cwd'],
  aws: ['--profile', '--region'],
};

function stripPrefixes(tokens) {
  const rest = [...tokens];
  for (;;) {
    while (rest.length > 0 && VARIABLE_ASSIGNMENT.test(rest[0])) rest.shift();
    if (rest.length === 0 || !PREFIX_WORDS.has(rest[0])) return rest;
    rest.shift();
    while (rest.length > 0 && rest[0].startsWith('-')) rest.shift();
  }
}

/**
 * Describe one simple command.
 * `words` is the command name followed by its non-flag arguments in order;
 * short flags are collected by letter and long flags by name.
 */
export function describeCommand(tokens) {
  const rest = stripPrefixes(tokens);
  if (rest.length === 0) return null;

  const name = basename(rest[0]);
  const valueFlags = GLOBAL_VALUE_FLAGS[name] ?? [];
  const command = {
    name,
    words: [name],
    shortFlags: new Set(),
    longFlags: new Set(),
    args: rest.slice(1),
  };

  for (let i = 1; i < rest.length; i++) {
    const token = rest[i];
    if (token === '--') continue;
    if (token.startsWith('--')) {
      command.longFlags.add(token.split('=')[0]);
    } else if (token.startsWith('-') && token.length > 1) {
      for (const letter of token.slice(1)) command.shortFlags.add(letter);
    } else {
      command.words.push(token);
      continue;
    }
    if (command.words.length === 1 && valueFlags.includes(token)) i++;
  }
  return command;
}

const SHELLS = new Set(['sh', 'bash', 'zsh', 'dash', 'ksh']);
const MAX_NESTING = 3;

function nestedScript(command) {
  if (command.name === 'eval') return command.args.join(' ');
  if (!SHELLS.has(command.name)) return null;
  const flagIndex = command.args.findIndex((arg) => /^-[A-Za-z]*c[A-Za-z]*$/.test(arg));
  return flagIndex === -1 ? null : (command.args[flagIndex + 1] ?? null);
}

/**
 * Describe every simple command in a command line, including the script
 * passed to `sh -c "..."` or `eval`.
 */
export function describeShellCommands(source, depth = 0) {
  const described = [];
  for (const tokens of splitShellCommands(source)) {
    const command = describeCommand(tokens);
    if (!command) continue;
    described.push(command);
    const script = depth < MAX_NESTING ? nestedScript(command) : null;
    if (script) described.push(...describeShellCommands(script, depth + 1));
  }
  return described;
}
