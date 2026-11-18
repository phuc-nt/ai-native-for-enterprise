// Decides whether an agent action is allowed, needs the user's confirmation,
// or is refused. The evaluator knows nothing about any particular harness:
// an adapter translates a tool call into one of these neutral actions.
//
//   { kind: 'read',   paths: [...] }             open a file
//   { kind: 'search', paths: [...] }             search or list under paths or globs
//   { kind: 'write',  paths: [...], content }    create or change a file
//   { kind: 'shell',  command }                  run a shell command line

import { findIgnoredSegment, matchSensitivePath } from './path-pattern-matcher.mjs';
import { describeShellCommands } from './shell-command-parser.mjs';

const SEVERITY = { allow: 0, ask: 1, deny: 2 };
const MAX_REASONS = 3;

// Commands whose purpose is to look at files. Only these are checked against
// the ignored directories, so builds and package managers keep working.
const LOOKING_COMMANDS = new Set([
  'ls', 'tree', 'du', 'find', 'fd', 'cat', 'bat', 'head', 'tail', 'less', 'more', 'wc',
  'grep', 'egrep', 'fgrep', 'rg', 'ag',
]);
// Of those, the ones that open the files they are given rather than walking a
// directory. Naming one file inside an ignored directory is a deliberate act,
// so it is put to the user instead of being refused.
const FILE_READING_COMMANDS = new Set(['cat', 'bat', 'head', 'tail', 'less', 'more', 'wc']);
const GLOB_CHARACTERS = /[*?[\]{}]/;
// Their first plain argument is a search pattern, not a location.
const PATTERN_FIRST_COMMANDS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'fd']);
const PATTERN_FLAGS = new Set(['-e', '--regexp', '-f', '--file']);
// Flags followed by a value that is not a location to look in. Excluding a
// directory must never be read as an attempt to open it.
const FLAGS_WITH_VALUE = new Set([
  ...PATTERN_FLAGS,
  '-g', '--glob', '--iglob', '--include', '--exclude', '--exclude-dir', '--ignore',
  '--ignore-dir', '-E', '-I', '-A', '-B', '-C', '-m', '--max-count', '-t', '-T', '--type',
  '-d', '--max-depth',
]);

function sensitivePathFindings(paths, policies) {
  const findings = [];
  for (const path of paths) {
    const pattern = matchSensitivePath(path, policies.sensitivePaths);
    if (!pattern) continue;
    findings.push({
      policy: 'sensitive-paths',
      decision: 'ask',
      reason: `"${path}" matches the sensitive-path pattern "${pattern}". The user decides whether the agent may access it.`,
    });
  }
  return findings;
}

/**
 * Looking inside a generated or downloaded directory. Sweeping it (searching,
 * listing, globbing) is refused; opening one named file asks the user.
 */
function ignoredPathFindings(paths, policies, { singleFile }) {
  const findings = [];
  for (const path of paths) {
    const segment = findIgnoredSegment(path, policies.ignoredDirectories);
    if (!segment) continue;
    const oneFile = singleFile && !GLOB_CHARACTERS.test(path);
    findings.push({
      policy: 'ignored-paths',
      decision: oneFile ? 'ask' : 'deny',
      reason: oneFile
        ? `"${path}" is inside "${segment}/", which holds generated or downloaded files. The user decides whether reading this one file is worth it.`
        : `"${path}" is inside "${segment}/", which holds generated or downloaded files and is excluded from searching and listing. Use the authored source, the manifest, or the lockfile, or read one specific file there by its path.`,
    });
  }
  return findings;
}

function secretFindings(text, policies) {
  if (!text) return [];
  return policies.secretPatterns
    .filter((pattern) => pattern.regex.test(text))
    .map((pattern) => ({
      policy: 'secret-patterns',
      decision: 'deny',
      reason: `The text contains a value shaped like a credential (${pattern.name}). Refer to the secret by name, such as an environment variable or a secret-manager key, and never write the value itself.`,
    }));
}

function matchesGate(gate, command) {
  if (gate.words.length > command.words.length) return false;
  if (!gate.words.every((word, index) => command.words[index] === word)) return false;
  for (const letter of gate.shortFlags) if (!command.shortFlags.has(letter)) return false;
  for (const flag of gate.longFlags) if (!command.longFlags.has(flag)) return false;
  return true;
}

function gatedCommandFindings(command, policies) {
  return policies.gatedCommands
    .filter((gate) => matchesGate(gate, command))
    .map((gate) => ({
      policy: 'gated-commands',
      decision: gate.decision,
      reason: `"${gate.pattern}" is gated${gate.reason ? `: ${gate.reason}` : ''}.`,
    }));
}

/** Every argument that could name a file, including the value of `--flag=value`. */
function pathLikeArguments(command) {
  const candidates = [];
  for (const arg of command.args) {
    if (!arg.startsWith('-')) candidates.push(arg);
    else if (arg.includes('=')) candidates.push(arg.slice(arg.indexOf('=') + 1));
  }
  return candidates;
}

/** The locations a looking command would open, leaving out patterns and exclusions. */
function lookedAtLocations(command) {
  const locations = [];
  let patternPending = PATTERN_FIRST_COMMANDS.has(command.name);
  for (let i = 0; i < command.args.length; i++) {
    const arg = command.args[i];
    // `find` takes its start points first; everything after is an expression.
    if (command.name === 'find' && (arg.startsWith('-') || arg === '!')) break;
    if (FLAGS_WITH_VALUE.has(arg)) {
      if (PATTERN_FLAGS.has(arg)) patternPending = false;
      i++;
    } else if (arg.startsWith('-') || arg.startsWith('!')) {
      continue;
    } else if (patternPending) {
      patternPending = false;
    } else {
      locations.push(arg);
    }
  }
  return locations;
}

function shellFindings(commandLine, policies) {
  const findings = secretFindings(commandLine, policies);
  for (const command of describeShellCommands(commandLine)) {
    findings.push(...gatedCommandFindings(command, policies));
    findings.push(...sensitivePathFindings(pathLikeArguments(command), policies));
    if (LOOKING_COMMANDS.has(command.name)) {
      findings.push(...ignoredPathFindings(lookedAtLocations(command), policies, {
        singleFile: FILE_READING_COMMANDS.has(command.name),
      }));
    }
  }
  return findings;
}

function summarize(findings) {
  const decision = findings.reduce(
    (worst, finding) => (SEVERITY[finding.decision] > SEVERITY[worst] ? finding.decision : worst),
    'allow',
  );
  const decisive = findings.filter((finding) => finding.decision === decision);
  const reasons = [...new Set(decisive.map((finding) => finding.reason))].slice(0, MAX_REASONS);
  return { decision, reason: reasons.join('\n'), findings: decisive };
}

/** Evaluate one neutral action against the loaded policies. */
export function evaluateAction(action, policies) {
  const paths = (action.paths ?? []).filter((path) => typeof path === 'string' && path !== '');
  switch (action.kind) {
    case 'read':
    case 'search':
      return summarize([
        ...sensitivePathFindings(paths, policies),
        ...ignoredPathFindings(paths, policies, { singleFile: action.kind === 'read' }),
      ]);
    case 'write':
      return summarize([
        ...sensitivePathFindings(paths, policies),
        ...secretFindings(action.content, policies),
      ]);
    case 'shell':
      return summarize(shellFindings(action.command ?? '', policies));
    default:
      throw new Error(`Unknown action kind "${action.kind}"`);
  }
}
