#!/usr/bin/env node
// GitHub Copilot preToolUse hook, for Copilot CLI, Copilot cloud agent, and
// agent mode in VS Code. Translates the pending tool call into a neutral
// action, asks the guard for a decision, and reports it in Copilot's form.
//
// When the guard allows the call this prints nothing, so Copilot's own
// permission handling still applies. It never answers "allow".
//
// "ask" reaches the user only where Copilot can show a prompt. Cloud agent
// and autopilot runs have nobody to ask, and Copilot treats it as a refusal
// there.
//
// Copilot refuses the tool call when a preToolUse hook exits with an error.
// A broken policy list would then stop every tool, so a guard failure is
// reported on stderr and the hook exits cleanly: the call proceeds unchecked.

import { readFileSync } from 'node:fs';
import { decide } from '../shared/guard-decision.mjs';
import { parseToolArguments, toNeutralAction } from '../shared/tool-input-fields.mjs';

// Copilot's runtime tool names, plus the Claude-style names it reports to
// hooks registered under the PascalCase event name.
const TOOL_KINDS = {
  view: 'read', read: 'read',
  grep: 'search', rg: 'search',
  glob: 'find-files',
  create: 'write', write: 'write', edit: 'write', multiedit: 'write',
  str_replace_editor: 'write', apply_patch: 'write',
  bash: 'shell', powershell: 'shell',
};

function main() {
  const event = JSON.parse(readFileSync(0, 'utf8'));
  const toolName = String(event.toolName ?? event.tool_name ?? '').toLowerCase();
  const kind = TOOL_KINDS[toolName];
  if (!kind) return;

  const toolInput = parseToolArguments(event.toolArgs ?? event.tool_input);
  const result = decide(toNeutralAction(kind, toolInput));
  if (result.decision === 'allow') return;

  process.stdout.write(
    JSON.stringify({
      permissionDecision: result.decision,
      permissionDecisionReason: `agent-kit guard: ${result.reason}`,
    }),
  );
}

try {
  main();
} catch (error) {
  console.error(`agent-kit guard failed, so this tool call was not checked: ${error.message}`);
}
