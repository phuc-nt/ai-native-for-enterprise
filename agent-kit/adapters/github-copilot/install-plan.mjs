// Where GitHub Copilot expects each part of the kit, under <project>/.github:
//
//   instructions/agent-kit/<rule>.instructions.md   the rules, applied to every path
//   skills/<skill>/                                  each skill
//   agent-kit/                                       the guard, this adapter's hook, the policy lists
//   hooks/agent-kit-guard.json                       the preToolUse registration
//
// The hooks file is the kit's own, so nothing of the project's is merged.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { guardFiles, ruleFiles, skillFiles } from '../../installer/kit-content.mjs';

// Copilot loads an instructions file only when its front matter says which
// paths it applies to.
const APPLY_TO_EVERY_PATH = '---\napplyTo: "**"\n---\n\n';

export function createInstallPlan(kitRoot) {
  return {
    baseDirectory: '.github',
    files: [
      ...ruleFiles(kitRoot).map((rule) => ({
        content: APPLY_TO_EVERY_PATH + readFileSync(rule.source, 'utf8'),
        destination: `instructions/agent-kit/${rule.name}.instructions.md`,
      })),
      ...skillFiles(kitRoot, 'skills'),
      ...guardFiles(kitRoot, 'github-copilot', ['pre-tool-use-hook.mjs'], { shared: true }),
      {
        source: join(kitRoot, 'adapters/github-copilot/hooks-file.json'),
        destination: 'hooks/agent-kit-guard.json',
      },
    ],
    nextStep: 'Commit .github/ so Copilot cloud agent sees it, and start a new Copilot session.',
  };
}
