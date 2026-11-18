# agent-kit

A small kit for coding agents. It holds what a model cannot work out from
the repository in front of it: how this team wants work scoped and reported,
what an agent may not touch or publish without a person, what counts as done
for each kind of task, and how documentation is kept true.

It deliberately holds nothing that teaches a model how to think, plan, or
write code. Models and harnesses improve at that on their own, and such
instructions become dead weight.

## Contents

| Directory | What it is | Loaded |
|---|---|---|
| [rules/](rules/) | Working rules, each with its reason | Every session |
| [policies/](policies/) | Four plain-text lists: sensitive paths, ignored directories, gated commands, credential shapes | By the guard |
| [guard/](guard/) | A small engine that turns the lists into allow, ask, or deny for an agent action | On every tool call |
| [skills/](skills/) | Task contracts: input, output, constraints, when to stop and ask, done criteria | When the task calls for one |
| [adapters/](adapters/) | The thin layer that connects the above to one harness | At install |

Rules, policies, and skills are plain Markdown and text with no dependency
on a harness. Only an adapter knows about a specific product.

## Install

An agent asked to install the kit should follow [INSTALL.md](INSTALL.md),
which is self-contained. The rest of this section is the reference.

Requires Node.js 20 or later, both to install and on any machine where the
guard hook runs.

```sh
node agent-kit/install.mjs <harness> <project-directory> --dry-run
node agent-kit/install.mjs <harness> <project-directory>
```

`<harness>` is `claude-code`, `github-copilot`, or `kiro`. To serve several
harnesses in one project, run the installer once for each. It prints what it
does to each file.

| | Claude Code | GitHub Copilot | Kiro |
|---|---|---|---|
| Base directory | `.claude/` | `.github/` | `.kiro/` |
| Rules | `rules/agent-kit/*.md` | `instructions/agent-kit/*.instructions.md`, applied to every path | `steering/agent-kit-*.md`, always included |
| Skills | `skills/<name>/` | `skills/<name>/` | `skills/<name>/` |
| Guard and policies | `agent-kit/` | `agent-kit/` | `agent-kit/` |
| Hook registration | one `PreToolUse` entry merged into `settings.json` | `hooks/agent-kit-guard.json` | `hooks/agent-kit-guard.json` |

The same rules apply for every harness:

- Reinstalling replaces kit files and removes ones a newer version no longer
  ships.
- Policy lists become the project's own once installed. A reinstall keeps
  the project's edits unless `--reset-policies` is given. Each harness has
  its own copy of the lists.
- A file the kit did not install is never overwritten unless `--force` is
  given. This includes a skill of the same name that the project already
  has.

### What each harness can enforce

The guard returns allow, ask, or deny. Harnesses differ in what a hook may
do with that.

| Guard decision | Claude Code | GitHub Copilot | Kiro |
|---|---|---|---|
| Deny | Blocked | Blocked | Blocked |
| Ask | The user is prompted | The user is prompted in an interactive session; refused in cloud agent and autopilot runs | Refused, and the agent is told to hand the action to the user |
| Guard fails to load | Call proceeds, error shown | Call proceeds, error on stderr | Call proceeds, notice added to context |

A Kiro hook can only let a tool call through or block it. Until Kiro lets a
hook prompt the user, everything on an "ask" line, such as `git push`, is
something the user does themselves in a Kiro project, or removes from that
project's policy list.

GitHub Copilot and Kiro do not publish the argument names of their built-in
tools. Their adapters recognise locations and text by field name, in
[tool-input-fields.mjs](adapters/shared/tool-input-fields.mjs), and the tool
names they map are listed at the top of each hook. Both were written from
the vendors' documentation and exercised with simulated events, not in a
live session of either product. Check one ask and one deny by hand after
installing.

## How the guard decides

| Policy list | Applies to | Decision |
|---|---|---|
| [sensitive-paths.txt](policies/sensitive-paths.txt) | Reading, writing, or naming the file in a shell command | Ask the user |
| [ignored-paths.txt](policies/ignored-paths.txt) | Searching or listing inside the directory; reading one named file there | Deny; ask the user |
| [gated-commands.txt](policies/gated-commands.txt) | Shell commands that publish, deploy, or destroy | Ask or deny, per line |
| [secret-patterns.txt](policies/secret-patterns.txt) | Text being written to a file or put on a command line | Deny |

The strictest matching decision wins. When nothing matches, the guard stays
silent and the harness's own permission rules apply. It never approves an
action on the user's behalf.

Each list explains its own format in its header. To change a policy, edit
the list. No code changes are needed.

## Limits of the guard

The guard is a tripwire for honest mistakes, not a sandbox.

- It reads the text of a shell command. It does not see what a script, an
  alias, a variable, or a command substitution inside double quotes expands
  to.
- A gated subcommand must directly follow its command name, apart from the
  global options listed in
  [shell-command-parser.mjs](guard/shell-command-parser.mjs).
- Text in a heredoc is read as commands, so a script written that way can
  trigger a gate.
- A search term that is exactly an ignored directory name can be refused in
  unusual argument orders. Passing the term with `-e` avoids it.
- Secret detection covers only credential formats with a fixed prefix or
  frame. Run a dedicated secret scanner in CI as well.
- If a policy list is malformed, the hook reports the file and line as a
  non-blocking error and the tool call proceeds unchecked.

Use the harness's permission settings, branch protection, and CI for
anything that must hold without exception.

## Tests

```sh
node --test agent-kit/guard/tests/ agent-kit/adapters/*/tests/
```

The evaluator tests run against the shipped policy lists, so an edit to a
list that changes an expected decision fails a test.

## Releasing

```sh
agent-kit/package-release.sh <output-directory>
```

This builds `agent-kit-<version>.zip` from [kit.json](kit.json)'s version,
without the tests. The archive unpacks to a single `agent-kit/` directory
whose [INSTALL.md](INSTALL.md) is all an agent needs.

## Maintaining the kit

- **Each item has an owner and a reason.** If nobody can say what goes wrong
  without a rule, remove it.
- **Add on failure, not up front.** A rule or policy line is added when
  something actually went wrong, with the change recorded in
  [CHANGELOG.md](CHANGELOG.md).
- **Delete-test at every model release.** Remove a rule or a skill
  constraint, run the usual tasks, and restore it only if the results get
  worse. The kit is expected to shrink.
- **Guarantees go in mechanisms.** If a rule must never be broken, move it
  from Markdown into a policy list, a permission setting, or CI.

## Adding another harness

Add a directory under [adapters/](adapters/) and list its name in
[kit.json](kit.json). It needs two files:

1. `install-plan.mjs`, which says where the harness loads rules, skills, and
   hook registrations from. The copying, conflict, and reinstall rules come
   from [kit-file-installer.mjs](installer/kit-file-installer.mjs).
2. A hook that translates each pending tool call into one of the neutral
   actions described at the top of
   [policy-evaluator.mjs](guard/policy-evaluator.mjs), and reports allow,
   ask, or deny in the harness's own form.

The [Kiro adapter](adapters/kiro/) is the shortest example. Use
[claude-code](adapters/claude-code/) as the model when the harness documents
its tool arguments and the registration has to be merged into a file the
project also edits.

## Not included yet

- Evaluation tasks that measure whether each rule and skill changes results.
- Organization-specific conventions and connectors to internal systems.
