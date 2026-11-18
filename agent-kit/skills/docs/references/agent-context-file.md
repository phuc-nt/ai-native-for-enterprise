# Agent context file

The file a harness loads into every session: `CLAUDE.md`, `AGENTS.md`, or
the equivalent. Changing it always needs the user's confirmation.

## What it is

It is not documentation. It is **process memory**: the few things an agent
must know to behave correctly in this repository and cannot find out by
looking.

Two facts set the standard:

- **It is loaded every time.** Each line is paid for in every session, by
  every agent, whether or not it applies to the task.
- **It competes for attention.** The more lines, the less weight each one
  carries. An important rule buried among obvious ones is followed less
  often.

## The test for a line

Keep a line only if it passes all four:

1. **Could the agent find this itself?** If the manifest, the code, or a
   quick search reveals it, cut it.
2. **What goes wrong without it, and what does that cost?** If you cannot
   name a concrete, costly mistake, cut it.
3. **Can it be checked?** "Run `make verify` before reporting done" can be.
   "Write clean code" cannot. Rewrite it until it can, or cut it.
4. **Does it conflict with another line, or with the repository?** Resolve
   the conflict. Two rules that disagree teach the agent to ignore both.

## What usually passes

- The command that is not what you would guess, and the one that must be run
  before work counts as done.
- A hard constraint with a cost: a directory that must not be edited by
  hand, a branch that must not be pushed to, a generated file.
- Where the documentation is, in one line.
- A trap that has already cost someone time.
- How this team wants to be asked and reported to, when it differs from the
  default.

## What usually fails

- A description of the architecture or the directory tree. That is
  documentation; link to it.
- Style rules a formatter or linter already enforces.
- Advice a capable model follows anyway: "write tests", "handle errors",
  "be careful".
- Anything copied from the docs. One fact, one place.
- Rules for situations that have never occurred here.

## Add on failure, not up front

A line is added when an agent has actually made the mistake, not because the
mistake is imaginable. The useful question when something goes wrong is
"what is the smallest instruction that would have prevented this?".
`rules-from-history.md` does the same thing systematically.

When a new model release arrives, test the file by deletion: remove a line,
run the usual tasks, and restore it only if the behavior gets worse.

## Guidance is not enforcement

A sentence in this file is a request. It will be followed most of the time.
When "most of the time" is not good enough, the rule belongs in a mechanism
that cannot be forgotten: a permission setting, a hook, a guard policy, a CI
check, branch protection.

Say which lines need enforcement and recommend the mechanism. Do not edit
settings, hooks, or CI yourself from this skill.

## More than one harness

When the repository serves several harnesses, keep one file as the source
and make the others point to it. Do not maintain parallel copies.

A context file inside a subdirectory is justified only when that directory
has rules that apply nowhere else.

## The operation

1. Read every context file the repository has, and the instructions they
   import.
2. Sort each line: **keep**, **cut**, **move** to documentation and replace
   with a link, **enforce** by a recommended mechanism, or **rewrite** until
   it can be checked.
3. Show the user the proposed file as a diff, with the reason for each
   removal and each recommended mechanism.
4. Write after confirmation.
5. Report the line count before and after, and the enforcement
   recommendations that are still open.

The line count is an observation, not a target. A file that grows by one
line that prevents a real failure is better than a short file that does not.
