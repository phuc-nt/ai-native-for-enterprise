---
name: plan
description: Turn a request into a written plan that another session could execute with only the plan and the repository. Use before work that is broad, risky, spans sessions, or will be handed to someone else. Skip it for a change small enough to state in a few lines.
---

# Plan a change

A plan is a handoff document. Its reader has the repository and nothing from
this conversation.

## Input

- The request, and any decisions the user has already made about it.
- The repository: its docs, the code the change touches, and the tests around
  that code.

## Output

A directory in the location the repository uses for plans, or by default
`plans/<yymmdd-hhmm>-<descriptive-slug>/`, containing:

- `plan.md`, short enough to read in a minute:
  - outcome, constraints, non-goals, acceptance criteria;
  - the phases, each with a status (`pending`, `in-progress`, `done`) and a
    link to its file;
  - dependencies between phases;
  - decisions taken, one line each: what was chosen, why, and what was
    rejected;
  - open questions.
- `phase-NN-<name>.md` for each phase, with only what is needed to carry it
  out safely: the files to change, create, or delete; the steps; how the phase
  is verified; what could go wrong and how to back out.

A change that fits in one phase gets `plan.md` alone.

## Constraints

- **Plan from the code, not from memory.** Every file the plan names either
  exists or is marked as new. Every statement about current behavior comes
  from something you read in this session.
- **This skill changes no code.** Its only writes are the plan files.
- **Each phase can be verified on its own,** and leaves the project working.
- **Put the riskiest assumption first.** If the plan depends on something
  unproven, the first phase proves it.
- **Acceptance criteria are observable.** A command that passes, a response
  that is returned, a state that can be inspected. "Works correctly" is not a
  criterion.
- **Unknowns are written as open questions,** never filled with a guess that
  reads like a decision.
- **No padding.** No phase for work that does not exist, no time estimates
  unless the user asked for them, no restating of the request.
- **If phases may run in parallel,** each one lists the files it owns, and no
  file appears in two lists.
- **Nothing secret goes in a plan.** Refer to a credential by where it is
  kept.

## Stop and ask

- Two workable approaches would lead to different product behavior, cost, or
  data shape.
- The request contradicts existing behavior, a public contract, or an earlier
  decision by the user.
- The work turns out far larger than the request suggests the user expects.

Ask with the options and your recommendation visible, one decision at a time.

## Done when

- Someone holding only the plan and the repository could start the first
  phase without asking what was meant.
- Every acceptance criterion can be checked by observation.
- The user has accepted the plan, or the open questions that block acceptance
  are listed at the top.
