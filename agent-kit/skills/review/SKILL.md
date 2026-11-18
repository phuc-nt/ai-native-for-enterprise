---
name: review
description: Review a change against what it was supposed to do and report verified findings. Use before merging, after implementing something high-risk, or when asked to review a diff, a branch, or a pull request. Also covers how to handle findings you receive.
---

# Review a change

## Input

- **The specification**: the request, plan, or acceptance criteria the
  change was meant to satisfy.
- **The change**: a diff range or branch, and the list of changed files.
- The repository, for reading the code around the change.

A reviewer should come to the change fresh. When a separate reviewer is
used, give it the specification, the diff range, and the changed files. Do
not give it the author's conversation, reasoning, or opinion of the change.

## Output

A list of findings, most severe first. Each one has:

- the location, as file and line;
- the defect in one sentence;
- a concrete failure scenario: this input or state leads to this wrong
  result;
- whether it is **confirmed** (traced through the code or reproduced) or
  **plausible** (likely but not traced).

Then a verdict: ready, ready after the listed fixes, or not ready. State what
was not reviewed. An empty list is a valid result.

## Constraints

- **A review authorizes reading only.** No edits, no comments posted to a
  pull request, no approvals, no merges, unless the user asked for that
  separately.
- **Start from the specification.** Does the change do everything that was
  asked, and nothing that was not? A correct implementation of the wrong
  thing is the most expensive defect.
- **Then look where defects cost most:** behavior at boundaries and on
  failure paths, public contracts and data shapes, input crossing a trust
  boundary, concurrency and ordering, and whether the tests would fail if the
  behavior broke.
- **Verify before reporting.** Read the code a finding depends on, including
  callers and callees outside the diff. A finding without a failure scenario
  is an opinion and is left out.
- **Skip what a tool already enforces.** No formatting or naming remarks
  beyond what the repository's conventions require.
- **Do not invent risk.** Size a concern against what the code actually
  stores, guards, or exposes, as described in
  the evidence-and-decisions rule.

## When you receive findings

- Check each finding against the code before acting on it. Reviewers are
  wrong often enough that agreement without checking produces regressions.
- Accept a finding with new evidence. Decline one by stating what you
  verified.
- A finding that would undo a decision the user made is taken to the user
  with the trade-off, not applied.

## Stop and ask

- There is no specification to review against and the intent cannot be
  recovered from the change itself.
- The change is too large to review with confidence. Say which parts were
  reviewed and propose how to split the rest.

## Done when

- Every reported finding has a location, a failure scenario, and a
  confirmed-or-plausible label.
- The verdict is stated, along with what was not covered.
- Nothing in the workspace or on the remote was changed by the review.
