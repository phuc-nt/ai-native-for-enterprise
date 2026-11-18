// Loads the policy lists that sit next to the installed guard and evaluates
// one neutral action against them.

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateAction } from '../../guard/policy-evaluator.mjs';
import { loadPolicies } from '../../guard/policy-file-loader.mjs';

const KIT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export function decide(action) {
  return evaluateAction(action, loadPolicies(join(KIT_ROOT, 'policies')));
}
