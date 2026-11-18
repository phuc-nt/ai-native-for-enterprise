---
name: docs
description: Create, prune, and query a repository's documentation and its agent instruction file. Use to document an existing codebase, bring docs back in line after a change, audit docs for drift, answer where something is documented, tighten CLAUDE.md or AGENTS.md, derive agent rules from repeated failures in git and CI history, generate an llms.txt index, or write the repo card that lets a catalogue or knowledge base route people to this repository.
---

# Project docs

Code already says what the system does and how. Documentation exists for
what code cannot say: **why** it is this way, and **where** things are. Every
operation below is judged by that division. A document that restates the
code is a second copy that will be wrong after the next commit.

## Operations

Pick the operation from the request, then read its reference. Read
`references/writing-standard.md` before writing or editing any document,
whichever operation you are in.

| The user wants | Operation | Reference |
|---|---|---|
| Docs for a codebase that has few or none | Create | `references/create-docs.md` |
| Docs brought in line after changes, or checked for drift | Maintain | `references/maintain-docs.md` |
| An answer about the project, or where something is documented | Answer | `references/maintain-docs.md` |
| A leaner, more useful CLAUDE.md or AGENTS.md | Agent context | `references/agent-context-file.md` |
| Agent rules backed by what actually went wrong | Rules from history | `references/rules-from-history.md` |
| An index of the docs for external language-model clients | llms.txt | `references/llms-index.md` |
| A one-screen card that routes people across many repositories to this one | Repo card | `references/repo-card.md` |

## Input

- The repository, including its own instructions about where docs live.
- For Maintain: what changed, as a diff range, a set of commits, or the work
  just completed.
- Answers only the user has: why a decision was made, how to reach systems
  outside the repository, who the readers are.

## Output

- Documents in the locations and language the repository already uses.
- A report: what was written, changed, or removed; what was deliberately
  left undocumented because it could not be established; what needs the
  user's input.
- "No documentation change is needed", with the reason, is a complete and
  valid result.

## Constraints

- **Discover the layout, do not impose one.** Use the repository's existing
  docs location, file names, format, and language. The fixed layout in
  `references/classic-layout.md` is for a repository that has none and a
  user who wants one. The repo card is the exception: its path and shape
  are the same in every repository, because it is read across repositories.
- **Every claim traces to something.** Code, configuration, history, or the
  user. What cannot be established is left out and listed in the report.
  Never fill a gap with what is usually true of projects like this.
- **No placeholders.** A file or section with nothing true to say is not
  created. The repo card's front matter is the exception: a field that
  cannot be established is written as `unknown`.
- **Prefer removing to adding.** A stale sentence is worse than a missing
  one.
- **No credential values, ever,** in any document. Record where a secret is
  kept and how to get access.

## Write authority

Do without asking, when the operation was requested:

- correct a statement that the code contradicts, fix a broken link, delete
  content that is stale or restates the code;
- create the documents of a requested Create operation.

Confirm first, showing the proposed change:

- deleting, renaming, or merging a document, or restructuring the docs tree;
- any change to an agent instruction file;
- any statement of policy: security, compliance, pricing, support, legal;
- recording a route to something outside the repository that you have not
  verified yourself;
- anything published outside the repository.

Never edit harness settings, hooks, or CI configuration from this skill.
When a rule needs enforcement, recommend the setting and let the user apply
it.

## Stop and ask

- The repository's instructions and its actual docs disagree about where
  documentation lives.
- A document's claim and the code disagree, and it is unclear which one is
  the mistake.
- The content needed is knowledge only the user has. Collect such questions
  and ask them together.

## Done when

- Every statement written or kept was checked against its source in this
  session.
- Links resolve, and commands shown were run or are flagged in the report as
  not run.
- The report lists what was left out and why.
