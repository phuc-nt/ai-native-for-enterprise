// Where Kiro expects each part of the kit, under <project>/.kiro:
//
//   steering/agent-kit-<rule>.md   the rules; steering files load in every
//                                  interaction unless front matter says otherwise
//   skills/<skill>/                each skill
//   agent-kit/                     the guard, this adapter's hook, the policy lists
//   hooks/agent-kit-guard.json     the Pre Tool Use registration
//
// The hooks file is the kit's own, so nothing of the project's is merged.

import { join } from 'node:path';
import { guardFiles, ruleFiles, skillFiles } from '../../installer/kit-content.mjs';

export function createInstallPlan(kitRoot) {
  return {
    baseDirectory: '.kiro',
    files: [
      ...ruleFiles(kitRoot).map((rule) => ({
        source: rule.source,
        destination: `steering/agent-kit-${rule.name}.md`,
      })),
      ...skillFiles(kitRoot, 'skills'),
      ...guardFiles(kitRoot, 'kiro', ['pre-tool-use-hook.mjs'], { shared: true }),
      {
        source: join(kitRoot, 'adapters/kiro/hooks-file.json'),
        destination: 'hooks/agent-kit-guard.json',
      },
    ],
    nextStep: 'Start a new Kiro session to load the steering files and the hook.',
  };
}
