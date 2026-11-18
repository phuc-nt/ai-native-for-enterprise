#!/usr/bin/env node
// Kiro Pre Tool Use hook, for the Kiro IDE and CLI. Translates the pending
// tool call into a neutral action and asks the guard for a decision.
//
// Kiro lets this hook do two things: exit cleanly so the tool runs, or exit
// with an error so the tool is blocked and the text on stderr goes back to
// the agent. It cannot make Kiro prompt the user. A guard decision of "ask"
// is therefore a refusal here, with a message telling the agent to hand the
// action to the user.
//
// If the guard itself fails, the hook exits cleanly with a notice on stdout,
// which Kiro adds to the agent's context: the call proceeds unchecked rather
// than every tool being blocked by a broken policy list.

import { readFileSync } from 'node:fs';
import { decide } from '../shared/guard-decision.mjs';
import { parseToolArguments, toNeutralAction } from '../shared/tool-input-fields.mjs';

const BLOCK_EXIT_CODE = 2;

// Current tool IDs first, then the names used by earlier CLI versions.
const TOOL_KINDS = {
  read_file: 'read', fs_read: 'read', read: 'read',
  list_directory: 'search', grep_search: 'search', grep: 'search',
  file_search: 'find-files', glob: 'find-files',
  fs_write: 'write', fs_append: 'write', str_replace: 'write', delete_file: 'write', write: 'write',
  execute_bash: 'shell', execute_pwsh: 'shell', execute_cmd: 'shell', shell: 'shell',
};

const NEEDS_THE_USER = 'Kiro cannot ask the user from a hook, so this action is refused. '
  + 'Stop and tell the user what you were about to do; they can do it themselves.';

function main() {
  const event = JSON.parse(readFileSync(0, 'utf8'));
  const kind = TOOL_KINDS[String(event.tool_name ?? '').toLowerCase()];
  if (!kind) return 0;

  const result = decide(toNeutralAction(kind, parseToolArguments(event.tool_input)));
  if (result.decision === 'allow') return 0;

  const suffix = result.decision === 'ask' ? `\n${NEEDS_THE_USER}` : '';
  console.error(`agent-kit guard: ${result.reason}${suffix}`);
  return BLOCK_EXIT_CODE;
}

try {
  process.exitCode = main();
} catch (error) {
  console.log(`agent-kit guard failed, so this tool call was not checked: ${error.message}`);
}
