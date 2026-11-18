# Installing agent-kit

This file is written for the coding agent that was asked to install
agent-kit into a project. Follow it top to bottom. Everything you need is in
the directory this file sits in; nothing is downloaded during the install.

## What gets installed

Into the project's harness directory, and nowhere else:

- working rules, loaded as the harness's always-on instructions;
- six skills: `plan`, `implement`, `fix`, `review`, `ship`, `docs`;
- a guard, with four plain-text policy lists, registered as a hook that
  checks each tool call before it runs.

[README.md](README.md) describes each part. You do not need to read it to
install.

## Before you start

1. **Node.js 20 or later** must be available: run `node --version`. The
   installer and the guard hook both need it. If it is missing, stop and
   tell the user; do not install Node.js yourself.
2. **Know the project directory.** If the user did not name one, ask. Do not
   assume it is the directory this kit was unpacked in.
3. **Know the harness.** Supported values are `claude-code`,
   `github-copilot`, and `kiro`. If the user did not say, look at the
   project and at what you are running in:

   | Sign in the project | Harness |
   |---|---|
   | `.claude/` directory, or `CLAUDE.md` | `claude-code` |
   | `.github/copilot-instructions.md`, `.github/instructions/`, or `.github/hooks/` | `github-copilot` |
   | `.kiro/` directory | `kiro` |

   If there are signs of more than one, or of none, ask the user which to
   install for. Several can be installed side by side, one run each.

## Install

Run these from the directory that contains this file. Replace `<harness>`
and `<project-directory>`.

1. Preview. This writes nothing.

   ```sh
   node install.mjs <harness> <project-directory> --dry-run
   ```

2. Read the preview.
   - Lines starting with `write`, `unchanged`, `kept`, or `remove` are
     normal.
   - A line starting with `conflict` means the project already has a file
     with that name that the kit did not put there, most often a skill
     called `plan`, `fix`, `review`, `ship`, or `docs`. **Stop.** Show the
     user the conflicting paths and let them choose: move their file aside,
     or replace it. Use `--force` only after the user chose to replace.

3. Install.

   ```sh
   node install.mjs <harness> <project-directory>
   ```

   The last line reads `Installed agent-kit <version>.` Any other ending is
   a failure: report the output to the user as it is.

## Check that the guard works

Pipe one tool call into the installed hook. Run this from the project
directory.

Claude Code. Expect JSON containing `"permissionDecision":"deny"`:

```sh
echo '{"tool_name":"Bash","tool_input":{"command":"git push --force"}}' \
  | node .claude/agent-kit/adapters/claude-code/pre-tool-use-hook.mjs
```

GitHub Copilot. Expect JSON containing `"permissionDecision":"deny"`:

```sh
echo '{"toolName":"bash","toolArgs":"{\"command\":\"git push --force\"}"}' \
  | node .github/agent-kit/adapters/github-copilot/pre-tool-use-hook.mjs
```

Kiro. Expect a message starting with `agent-kit guard:` and exit code 2:

```sh
echo '{"tool_name":"execute_bash","tool_input":{"command":"git push --force"}}' \
  | node .kiro/agent-kit/adapters/kiro/pre-tool-use-hook.mjs; echo "exit code $?"
```

If the output differs, the install is not working. Report what you saw.

## Tell the user

- Which harness and directory the kit was installed into, and its version.
- **A new session is needed** before the rules, skills, and hook load.
- The policy lists in `<harness directory>/agent-kit/policies/` are now
  theirs to edit. A later reinstall keeps their edits.
- For GitHub Copilot: `.github/` must be committed for the cloud agent to
  see it.
- For Kiro: a hook cannot prompt the user, so actions the guard would ask
  about, such as `git push`, are refused there. The user runs those
  themselves or removes the line from
  `.kiro/agent-kit/policies/gated-commands.txt`.
- For GitHub Copilot and Kiro: the guard was written from the vendors'
  documentation and has not been confirmed in a live session of those
  products. Ask the user to try one gated command, such as `git push`, in a
  real session.

## Do not

- Do not use `--force` or `--reset-policies` unless the user asked for what
  they do.
- Do not edit the installed files to make a conflict or a failed check go
  away.
- Do not commit, push, or change anything else in the project. Installing is
  the whole task unless the user asked for more.

## Update or remove

To update, unpack the newer kit and run the same install command. Files the
old version installed and the new one no longer ships are removed, and the
project's policy lists are kept.

To remove, delete the paths listed in
`<harness directory>/agent-kit/installed.json`, then the
`<harness directory>/agent-kit/` directory. For Claude Code, also remove the
`PreToolUse` entry in `.claude/settings.json` whose command mentions
`agent-kit`. Confirm with the user before deleting.
