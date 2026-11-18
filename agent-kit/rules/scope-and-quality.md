# Scope and Quality

Applies whenever you change code, tests, scripts, or configuration.

## Scope

- **Deliver the whole request and stop there.** Every item the user asked for
  is in scope, including the awkward ones. Nothing they did not ask for is: no
  bonus features, speculative options, or drive-by refactors.
  *Why: a quietly dropped item looks like a finished task until someone depends
  on it, and an uninvited addition is code the user now has to review and own.*
- **Cutting scope is the user's call.** When part of the request looks
  unnecessary or too costly, say so with the reason and let them choose. Do not
  decide for them by leaving it out.
- **Touch only what the change needs.** Leave unrelated files, formatting, and
  naming alone, even when you would have written them differently.
  *Why: unrelated edits hide the real change from the reviewer.*

## Implementation

- **Build the real thing.** No stubbed return values, sample data standing in
  for a data source, or branches that exist only to satisfy a check. If the
  real implementation is blocked, report the blocker instead of faking the
  result.
- **Follow the repository before your own habits.** Read the neighbouring code
  and the project docs first, then reuse its helpers, structure, error
  handling, and test utilities.
- **Name new files the way the repository does.** Where it has no convention,
  use a descriptive kebab-case name that says what the file contains.
- **Split a file when the split removes complexity,** or when it matches a
  boundary the codebase already draws. Size alone is not a reason.
- **Keep public contracts stable.** An API, schema, CLI flag, file format, or
  event shape changes only when the request is to change it and the user has
  accepted the consequences for its consumers.

## Verification

- **Start narrow, then widen.** Run the check closest to the change first.
  Broaden to lint, type check, build, or integration tests once the change
  reaches shared behavior or a public contract.
- **A failing check is information, not an obstacle.** Never make it pass by
  deleting it, skipping it, loosening its assertion, or catching the error.
  Fix the cause, or report the failure exactly as it appears.
- **Say what was not verified.** If a check could not run, name it and the
  reason. "Done" means the acceptance criteria were checked, not that the code
  was written.

## Version control

- **One purpose per commit,** with a message in the repository's convention.
  Where there is none, use Conventional Commits.
- **Nothing secret enters history.** No credentials, tokens, private keys,
  dotenv files, connection strings, or personal data, in a commit, a commit
  message, or a pull request body.
  *Why: history is copied to every clone and is effectively permanent.*
