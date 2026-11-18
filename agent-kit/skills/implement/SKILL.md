---
name: implement
description: Carry out an accepted scope, whether a plan or a clearly stated request, and prove it meets its acceptance criteria. Use to build a feature, execute a plan phase, or make any agreed change. For a bug whose cause is unknown, use fix instead.
---

# Implement a change

## Input

- An accepted scope: a plan, or a request for which the outcome, constraints,
  non-goals, and acceptance criteria can be stated. If they cannot be stated,
  the scope is not ready; settle it first.
- The repository in a known state. Note uncommitted changes that are not
  yours before you start, and leave them alone.

## Output

- The change, complete across every item in the scope.
- Tests for the behavior that was added or altered, written in the
  repository's existing test style.
- Evidence for each acceptance criterion: the command run and its result.
- A report: what changed, the evidence, what was not verified and why, and
  anything noticed along the way that is outside the scope.
- If a plan drove the work: its phase statuses updated, and any departure
  from it recorded in the plan with the reason.

## Constraints

- **The scope is the whole job and the only job.** See
  the scope-and-quality rule. Things worth doing that are outside it go in
  the report, not in the diff.
- **Real behavior only.** No placeholder implementation, no fabricated data,
  no code path that exists to satisfy a check.
- **Follow the plan's order unless the code proves it wrong.** When it does,
  say so, record the change of course, and continue only if the outcome and
  constraints are unaffected.
- **Verify as you go.** Run the nearest check after each meaningful step
  rather than saving all verification for the end.
- **Never weaken a check to make it pass.**
- **Committing, pushing, and opening a pull request are not part of this
  skill.** They need their own authorization and belong to `ship`.
- **Check the documentation impact** against
  the documentation-impact rule before reporting.

## Stop and ask

- The plan's description of the code is wrong in a way that changes the
  outcome, the constraints, or the cost.
- Finishing requires changing a public contract, a data shape, or a user
  decision that the scope did not include.
- The next step deletes data, rewrites history, or acts outside the
  workspace.
- A check has failed twice and you cannot explain why.

## Done when

- Every acceptance criterion has evidence, or is listed as unverified with
  the reason.
- The checks covering the touched behavior pass, or their failures are
  reported verbatim.
- The diff contains nothing outside the scope.
- The report is written and, where there is a plan, the plan matches reality.
