// Applies an adapter's install plan to a project. The same rules hold for
// every harness:
//
// - Rules, skills, and guard code belong to the kit. A reinstall replaces them
//   and removes files a newer kit version no longer ships.
// - Policy lists belong to the project once installed. A reinstall keeps them
//   unless policies are reset.
// - A file the kit did not install is never overwritten unless forced.
// - Every decision is made before the first write, so a refused install
//   leaves the project untouched.
//
// A plan is:
//   {
//     baseDirectory,   where the harness keeps its files, such as ".claude"
//     files,           [{ destination, source }] to copy, or
//                      [{ destination, content }] for generated text
//     jsonMerges,      optional [{ destination, merge(current) }] for files the
//                      kit shares with the project; merge returns
//                      { value, changed } and must not modify its input
//     nextStep,        one sentence shown after a successful install
//   }
// Destinations are relative to baseDirectory and use forward slashes.

import {
  existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { POLICY_PREFIX } from './kit-content.mjs';

const MANIFEST_PATH = 'agent-kit/installed.json';

export function readJson(path, fallback) {
  if (!existsSync(path)) {
    if (fallback === undefined) throw new Error(`${path} does not exist`);
    return fallback;
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    throw new Error(`${path} is not valid JSON (${error.message})`);
  }
}

const desiredBytes = (file) => (
  file.content === undefined ? readFileSync(file.source) : Buffer.from(file.content)
);

export function installPlan({ projectDirectory, plan, kit, options, print = console.log }) {
  if (!existsSync(projectDirectory) || !statSync(projectDirectory).isDirectory()) {
    throw new Error(`"${projectDirectory}" is not a directory`);
  }
  const base = join(projectDirectory, plan.baseDirectory);
  const previous = readJson(join(base, MANIFEST_PATH), { files: [] });
  const previouslyInstalled = new Set(previous.files);
  const log = (action, path) => print(`${action.padEnd(9)} ${plan.baseDirectory}/${path}`);
  const isPolicy = (path) => path.startsWith(`${POLICY_PREFIX}/`);

  const steps = plan.files.map((file) => {
    const target = join(base, file.destination);
    const bytes = desiredBytes(file);
    let action = 'write';
    if (existsSync(target)) {
      if (readFileSync(target).equals(bytes)) action = 'unchanged';
      else if (isPolicy(file.destination)) action = options.resetPolicies ? 'write' : 'kept';
      else if (!previouslyInstalled.has(file.destination) && !options.force) action = 'conflict';
    }
    return { destination: file.destination, target, bytes, action };
  });

  const conflicts = steps.filter((step) => step.action === 'conflict');
  if (conflicts.length > 0) {
    for (const step of conflicts) log('conflict', step.destination);
    throw new Error(
      'These files exist and were not installed by agent-kit. Nothing was changed. '
      + 'Move them aside, or rerun with --force to replace them.',
    );
  }

  const merges = (plan.jsonMerges ?? []).map((entry) => {
    const target = join(base, entry.destination);
    return { destination: entry.destination, target, ...entry.merge(readJson(target, {})) };
  });

  const planned = new Set(steps.map((step) => step.destination));
  const stale = previous.files.filter((path) => !planned.has(path) && !isPolicy(path));

  for (const step of steps) {
    log(step.action, step.destination);
    if (step.action !== 'write' || options.dryRun) continue;
    mkdirSync(dirname(step.target), { recursive: true });
    writeFileSync(step.target, step.bytes);
  }
  for (const path of stale) {
    log('remove', path);
    if (!options.dryRun) rmSync(join(base, path), { force: true });
  }
  for (const merge of merges) {
    log(merge.changed ? 'write' : 'unchanged', merge.destination);
    if (!merge.changed || options.dryRun) continue;
    mkdirSync(dirname(merge.target), { recursive: true });
    writeFileSync(merge.target, `${JSON.stringify(merge.value, null, 2)}\n`);
  }

  if (options.dryRun) {
    print(`\nDry run: nothing was written. ${kit.name} ${kit.version} would be installed.`);
    return;
  }
  const manifest = { kit: kit.name, version: kit.version, files: [...planned].sort() };
  mkdirSync(dirname(join(base, MANIFEST_PATH)), { recursive: true });
  writeFileSync(join(base, MANIFEST_PATH), `${JSON.stringify(manifest, null, 2)}\n`);
  print(`\nInstalled ${kit.name} ${kit.version}. ${plan.nextStep}`);
}
