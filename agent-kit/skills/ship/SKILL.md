---
name: ship
description: Take a verified change out of the workspace by committing, pushing, opening a pull request, merging, or deploying, strictly within what the user authorized. Use when asked to commit, push, open or merge a pull request, release, or deploy.
---

# Ship a change

Everything before this skill can be undone locally. Most of what this skill
does is seen by other people or cannot be taken back.

## Input

- A change that has been verified.
- **The authorization, read literally.** Which of these did the user ask
  for, this time: commit, push, pull request, merge, release, deploy?

## Output

- Exactly the authorized actions, and no further ones.
- A report with the resulting state: commit identifiers, branch, pull
  request link, CI status, deployment identifier. Each is confirmed from the
  remote or the tool's output, not assumed from a command having exited.

## Constraints

- **Authorization does not extend.** "Commit" is not "push". "Push" is not
  "open a pull request". "Open a pull request" is not "merge". Approval
  given earlier in the session covers the action it was given for, once.
- **Ship what was verified.** The checks must have passed on the tree being
  shipped. If the tree changed since, run them again.
- **Read the outgoing diff before committing.** It contains only the
  intended change: no stray files, debug output, generated artifacts, local
  configuration, or anything matching the sensitive-path or secret policies.
- **High-risk changes are reviewed first.** If the change crosses module
  boundaries, alters a public contract, or touches security or data, and no
  review has happened, say so before shipping.
- **Never bypass a gate.** No skipped hooks, no forced push over shared
  history, no administrative merge around branch protection, no disabled
  check. A failing gate is fixed or reported.
- **Follow the repository's branch and commit conventions.** Do not commit
  directly to the default branch unless that is how this repository works.
- **A pull request description states** what changed, why, how it was
  verified, and what was not verified. It contains no secrets and no
  conversation transcript.
- **Stay until the outcome is known.** After a push or a pull request, check
  the CI result. After a deploy, check that the new version is serving.
  Report a failure with its output.

## Stop and ask

- A check fails, or the working tree holds changes you did not make.
- The branch has diverged and resolving it needs a judgment about someone
  else's work.
- The next action goes beyond what was authorized, even when it looks like
  the obvious next step.
- A guard policy asks or refuses. The prompt is the user's decision to make;
  do not look for another route to the same effect.

## Done when

- Each authorized action is complete and its result confirmed.
- Nothing beyond the authorization was done.
- The report gives the user everything needed to find and, if necessary,
  revert what was shipped.
