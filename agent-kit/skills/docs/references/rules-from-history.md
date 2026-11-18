# Rules from history

Derive agent rules from failures that actually happened in this repository,
and add them to the agent context file. Read `agent-context-file.md` first.
Every write here needs the user's confirmation.

The point is to replace "rules someone thought of" with "rules the record
supports". Most runs should propose few rules. Proposing none is a normal
result.

## Sources

- **Commit history**: reverts, commits that fix a commit made shortly
  before, repeated fixes to the same file or concern, hotfixes that follow a
  merge.
- **CI history**, where the tooling gives access: failed runs grouped by the
  step and reason they failed.
- **Review history**, where available: the same correction requested again
  and again.

If a source is unavailable, such as a shallow clone or no access to CI, say
so and work from what exists. Never reconstruct incidents that cannot be
read.

## The window

Look at a bounded, recent slice:

- commits: the last 90 days or the last 300 commits, whichever is fewer;
- CI: the last 200 runs.

Older failures describe a codebase and a team that may no longer exist.

## Gates a candidate must pass

A pattern becomes a proposed rule only if it passes every gate.

1. **Recurrence.** At least three independent incidents. Three retries of
   one push are one incident. Different changes, on different days, count
   separately.
2. **Preventability.** An instruction read at the time of writing would have
   prevented it. A flaky test or an outage upstream is not prevented by a
   rule.
3. **Not already enforced.** If a linter, hook, or CI check already catches
   it, an instruction adds nothing. If it recurs although it is enforced,
   the finding is that the enforcement is late or bypassed. Report that
   instead.
4. **Still live.** The most recent incident falls in the latest third of the
   window. A pattern that stopped by itself needs no rule.
5. **Passes the line test** in `agent-context-file.md`: it cannot be found
   by looking, it is costly, it can be checked, and it conflicts with
   nothing.

## Writing a rule

- Phrase it as an instruction that can be checked: do this, or do not do
  that.
- Add the reason in a few words when it is not obvious.
- Keep the evidence out of the context file. Commit identifiers and run
  links go in the report.
- Where a pattern needs a guarantee, recommend the enforcing mechanism
  instead of, or alongside, the rule.

## Limits per run

- At most five rules.
- The context file grows by at most ten lines net. If the proposal exceeds
  that, find lines to cut, using the line test, until it fits.

These limits keep the file from becoming an incident log.

## The operation

1. State the window and the sources that were actually available.
2. Collect candidate patterns with their incidents.
3. Apply the gates. Keep a note of what was rejected and by which gate.
4. Present to the user: each proposed rule, its incidents, the exact diff to
   the context file, and any enforcement recommendation.
5. Write only what the user confirms.

## Report

The window and sources used, the rules proposed and accepted, the candidates
rejected with the gate that rejected them, and the patterns better served by
enforcement.
