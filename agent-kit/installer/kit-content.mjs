// Lists what the kit ships, as { source, destination } pairs, so that each
// adapter only has to say where its harness expects things.

import { readdirSync, statSync } from 'node:fs';
import { basename, join, relative } from 'node:path';

const toPosix = (path) => path.split('\\').join('/');

/** Every file under a directory, skipping test directories. */
export function listFiles(directory, keep = () => true) {
  const files = [];
  for (const name of readdirSync(directory).sort()) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) {
      if (name !== 'tests') files.push(...listFiles(path, keep));
    } else if (keep(name)) {
      files.push(path);
    }
  }
  return files;
}

function mirror(kitRoot, subdirectory, destinationPrefix, keep) {
  const root = join(kitRoot, subdirectory);
  return listFiles(root, keep).map((source) => ({
    source,
    destination: toPosix(join(destinationPrefix, relative(root, source))),
  }));
}

/** The rule files, by name without extension. The adapter decides the destination. */
export function ruleFiles(kitRoot) {
  return listFiles(join(kitRoot, 'rules'), (name) => name.endsWith('.md')).map((source) => ({
    name: basename(source, '.md'),
    source,
  }));
}

/** Every skill, placed under the harness's skills directory. */
export function skillFiles(kitRoot, destinationPrefix) {
  return mirror(kitRoot, 'skills', destinationPrefix);
}

/**
 * The guard, the policy lists, and one adapter's hook code. They keep the
 * kit's own relative layout under `agent-kit/`, because the hook finds the
 * guard and the policies relative to its own location.
 */
export function guardFiles(kitRoot, adapterName, adapterFileNames, { shared = false } = {}) {
  return [
    ...mirror(kitRoot, 'guard', 'agent-kit/guard', (name) => name.endsWith('.mjs')),
    ...mirror(kitRoot, 'policies', POLICY_PREFIX, (name) => name.endsWith('.txt')),
    ...(shared
      ? mirror(kitRoot, 'adapters/shared', 'agent-kit/adapters/shared', (name) => !name.includes('test'))
      : []),
    ...adapterFileNames.map((name) => ({
      source: join(kitRoot, 'adapters', adapterName, name),
      destination: `agent-kit/adapters/${adapterName}/${name}`,
    })),
  ];
}

export const POLICY_PREFIX = 'agent-kit/policies';
