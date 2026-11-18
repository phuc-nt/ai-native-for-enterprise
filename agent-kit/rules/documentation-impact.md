# Documentation Impact

Applies when a change might require a documentation update, and whenever you
write a plan or a report. The full documentation operations live in the
`docs` skill.

## When documentation must change

Update documentation in the same piece of work when the change affects:

- behavior a user can see, or how the project is set up, run, or configured;
- architecture, data flow, a public contract, security posture, or recovery;
- a contract read by machines, or reference output generated from the code;
- a decision future maintainers would otherwise have to rediscover;
- how to reach something outside the repository: a deploy path, a log source,
  where a credential is stored, a webhook or DNS setup, a backup or rollback
  route, or a previously recorded route that turned out to be wrong.

An internal edit that changes none of these needs no documentation change.
Finishing a task or a plan phase is not, by itself, a reason to edit a doc.

## Where it goes

- Find the right document through the repository's own instructions, the root
  README, and the existing docs index. Do not assume a filename.
- Change the one document that owns the fact. If a command list, inventory, or
  matrix already lives in a script, manifest, schema, or generated file, update
  that owner and link to it instead of restating it in prose.
- Read a document before editing it. Afterwards, check its links and claims
  against the source, tests, or live state.

## Plans and reports are records, not reference

- Put plans where the repository says to. By default:
  `plans/<yymmdd-hhmm>-<descriptive-slug>/plan.md`, with `phase-NN-<name>.md`
  files beside it when the work needs phases.
- A plan index stays short: status, phases, dependencies, acceptance criteria,
  and links. Detail goes in the phase files.
- Plans, reports, and audit results describe a moment. They do not become the
  authority on how the product works once the work is finished. Durable
  conclusions are moved into the documentation that owns them.

## Never in any document

Credential values, tokens, signed URLs, and personal data are never written
into a document, plan, report, commit, or pull request, whoever approves it.
Record how to obtain a secret, never the secret.
