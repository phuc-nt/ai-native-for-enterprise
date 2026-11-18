---
name: fix
description: Find the proven cause of a defect and fix that cause with the smallest change. Use for a bug report, an error, a failing test, a failing CI job, or behavior that differs from what was specified.
---

# Fix a defect

The order is fixed: observe the failure, prove the cause, then change the
code. A fix written before the cause is proven is a guess that happens to
compile.

## Input

- The symptom: an error message, a failing test, a log excerpt, or a
  description of wrong behavior.
- The expected behavior, and where that expectation comes from: a spec, a
  test, a contract, or the user's statement.

## Output

- A cause statement of one or two sentences, with the evidence that proves
  it.
- The smallest change that removes the cause.
- A regression test that fails without the change and passes with it.
- A report: symptom, cause, fix, evidence, and other places the same cause
  may be present.

## Constraints

- **Reproduce first.** Make the failure happen on demand before
  investigating. If it cannot be reproduced, say so and state what evidence
  stands in for a reproduction.
- **A cause is proven when it predicts the symptom.** You can say why this
  cause produces exactly this failure under these conditions, and show that
  removing it removes the failure. A change that makes the symptom disappear
  without that explanation is not a proof.
- **Fix the cause, not the place the symptom appears.** No catching the
  error, special-casing the input, retrying, or raising a timeout in place of
  understanding.
- **Change as little as the cause requires.** No refactoring, renaming, or
  cleanup in the same change.
- **The regression test targets the cause.** Confirm that it fails on the
  unfixed code.
- **Never make a failing check pass by weakening it.**
- **Look for the same defect nearby.** Report what you find. Fix those
  places only when they are inside the agreed scope.

## Stop and ask

- The failure cannot be reproduced and the available evidence fits more than
  one cause.
- The "expected behavior" is not established, and the current behavior may
  be intended.
- The real fix needs a change to a public contract, a data shape, or stored
  data.
- Existing data is already damaged and needs repair.
- Two attempts at a fix have failed. Return to the evidence before a third.

## Done when

- The reproduction no longer fails, and the regression test passes.
- The surrounding tests pass, or their failures are reported verbatim and
  shown to be unrelated.
- The report states the cause in terms a maintainer could verify without
  rerunning the investigation.
