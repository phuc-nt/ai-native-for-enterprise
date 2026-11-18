// Adds the guard's PreToolUse registration to a Claude Code settings object
// without disturbing anything else in it. Running it twice changes nothing.

function registersCommand(entry, command) {
  return (entry?.hooks ?? []).some((hook) => hook?.command === command);
}

/**
 * Return a settings object that includes the registration, and whether
 * anything had to change. The input object is not modified.
 */
export function mergeHookRegistration(settings, registration) {
  const command = registration.hooks[0].command;
  const existing = settings.hooks?.PreToolUse ?? [];
  if (!Array.isArray(existing)) {
    throw new Error('settings.json: "hooks.PreToolUse" is not a list');
  }

  const index = existing.findIndex((entry) => registersCommand(entry, command));
  if (index !== -1 && existing[index].matcher === registration.matcher) {
    return { settings, changed: false };
  }

  const preToolUse = [...existing];
  if (index === -1) preToolUse.push(registration);
  else preToolUse[index] = registration;

  return {
    settings: { ...settings, hooks: { ...settings.hooks, PreToolUse: preToolUse } },
    changed: true,
  };
}
