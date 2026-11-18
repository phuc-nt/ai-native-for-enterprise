#!/usr/bin/env node
// Claude Code PreToolUse hook. Translates the pending tool call into a
// neutral action, asks the guard for a decision, and reports it in the form
// Claude Code expects.
//
// When the guard allows the call this prints nothing, so Claude Code's own
// permission rules still apply. It never answers "allow" on the user's behalf.
//
// If the guard itself fails, the hook exits with a non-blocking error: the
// tool call proceeds unchecked and the user sees why.

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateAction } from '../../guard/policy-evaluator.mjs';
import { loadPolicies } from '../../guard/policy-file-loader.mjs';

const KIT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const TOOL_TO_ACTION = {
  Read: (input) => ({ kind: 'read', paths: [input.file_path] }),
  Grep: (input) => ({ kind: 'search', paths: [input.path, input.glob] }),
  Glob: (input) => ({ kind: 'search', paths: [input.path, input.pattern] }),
  Write: (input) => ({ kind: 'write', paths: [input.file_path], content: input.content }),
  Edit: (input) => ({ kind: 'write', paths: [input.file_path], content: input.new_string }),
  MultiEdit: (input) => ({
    kind: 'write',
    paths: [input.file_path],
    content: (input.edits ?? []).map((edit) => edit.new_string ?? '').join('\n'),
  }),
  NotebookEdit: (input) => ({
    kind: 'write',
    paths: [input.notebook_path],
    content: input.new_source,
  }),
  Bash: (input) => ({ kind: 'shell', command: input.command }),
};

function main() {
  const event = JSON.parse(readFileSync(0, 'utf8'));
  const toAction = TOOL_TO_ACTION[event.tool_name];
  if (!toAction) return;

  const policies = loadPolicies(join(KIT_ROOT, 'policies'));
  const result = evaluateAction(toAction(event.tool_input ?? {}), policies);
  if (result.decision === 'allow') return;

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: result.decision,
        permissionDecisionReason: `agent-kit guard: ${result.reason}`,
      },
    }),
  );
}

try {
  main();
} catch (error) {
  console.error(`agent-kit guard failed, so this tool call was not checked: ${error.message}`);
  process.exit(1);
}
