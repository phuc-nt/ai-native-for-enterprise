// Test support: installs the kit into a throwaway project for one harness
// and runs the installed hook the way that harness would, with the tool-call
// event on stdin.

import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after } from 'node:test';
import { fileURLToPath } from 'node:url';

const INSTALLER = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'install.mjs');

export function installedProject(harness, ...flags) {
  const project = mkdtempSync(join(tmpdir(), 'agent-kit-project-'));
  after(() => rmSync(project, { recursive: true, force: true }));
  const install = (...moreFlags) => spawnSync(
    process.execPath, [INSTALLER, harness, project, ...moreFlags], { encoding: 'utf8' },
  );
  return { project, install, result: install(...flags) };
}

export function runHook(hookPath, event) {
  return spawnSync(process.execPath, [hookPath], { input: JSON.stringify(event), encoding: 'utf8' });
}
