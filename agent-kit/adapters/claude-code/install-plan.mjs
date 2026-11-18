// Where Claude Code expects each part of the kit, under <project>/.claude:
//
//   rules/agent-kit/     the rule files, loaded every session
//   skills/<skill>/      each skill
//   agent-kit/           the guard, this adapter's hook, and the policy lists
//   settings.json        one PreToolUse registration is added to it

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { guardFiles, ruleFiles, skillFiles } from '../../installer/kit-content.mjs';
import { mergeHookRegistration } from './settings-hook-merger.mjs';

export function createInstallPlan(kitRoot) {
  const registration = JSON.parse(
    readFileSync(join(kitRoot, 'adapters/claude-code/hook-registration.json'), 'utf8'),
  );
  return {
    baseDirectory: '.claude',
    files: [
      ...ruleFiles(kitRoot).map((rule) => ({
        source: rule.source,
        destination: `rules/agent-kit/${rule.name}.md`,
      })),
      ...skillFiles(kitRoot, 'skills'),
      ...guardFiles(kitRoot, 'claude-code', ['pre-tool-use-hook.mjs']),
    ],
    jsonMerges: [{
      destination: 'settings.json',
      merge(settings) {
        const merged = mergeHookRegistration(settings, registration);
        return { value: merged.settings, changed: merged.changed };
      },
    }],
    nextStep: 'Restart the Claude Code session to load the hook.',
  };
}
