#!/usr/bin/env node
// Installs the kit into a project for one harness.
//
//   node install.mjs <harness> <project-directory> [--dry-run] [--force] [--reset-policies]
//   node install.mjs --list
//
// Each harness has an adapter in adapters/<harness>/ whose install-plan.mjs
// says where that harness expects rules, skills, and the guard hook. The
// rules for replacing, keeping, and refusing files are the same for all of
// them and live in installer/kit-file-installer.mjs.
//
// To serve several harnesses in one project, run the installer once for each.

import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { installPlan, readJson } from './installer/kit-file-installer.mjs';

const KIT_ROOT = dirname(fileURLToPath(import.meta.url));
const KNOWN_FLAGS = ['--dry-run', '--force', '--reset-policies'];

const kit = readJson(join(KIT_ROOT, 'kit.json'));
const usage = () => [
  `Usage: node install.mjs <harness> <project-directory> [${KNOWN_FLAGS.join('] [')}]`,
  '       node install.mjs --list',
  `Harnesses: ${kit.adapters.join(', ')}`,
].join('\n');

function fail(message) {
  console.error(message);
  console.error(usage());
  process.exit(2);
}

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith('--')));
const [harness, projectDirectory, ...extra] = args.filter((arg) => !arg.startsWith('--'));

if (flags.has('--list')) {
  console.log(kit.adapters.join('\n'));
  process.exit(0);
}
const unknownFlag = [...flags].find((flag) => !KNOWN_FLAGS.includes(flag));
if (unknownFlag) fail(`Unknown option ${unknownFlag}`);
if (!harness || !projectDirectory || extra.length > 0) fail('Expected a harness and a project directory.');
if (!kit.adapters.includes(harness)) fail(`Unknown harness "${harness}".`);

try {
  const adapter = await import(
    pathToFileURL(join(KIT_ROOT, 'adapters', harness, 'install-plan.mjs')).href
  );
  installPlan({
    projectDirectory: resolve(projectDirectory),
    plan: adapter.createInstallPlan(KIT_ROOT),
    kit,
    options: {
      dryRun: flags.has('--dry-run'),
      force: flags.has('--force'),
      resetPolicies: flags.has('--reset-policies'),
    },
  });
} catch (error) {
  console.error(`Install failed: ${error.message}`);
  process.exit(1);
}
