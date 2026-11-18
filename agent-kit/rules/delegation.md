# Delegation

Applies only when you hand part of the work to a subagent or run agents in
parallel. On a harness without subagents, ignore this file.

## Decide whether to delegate

- Delegate work that is independent, or that would flood your context with
  material you only need the conclusion from.
- Do the work yourself when it is a few steps, when you already know where to
  look, or when you could not yet write a clear brief for it.
  *Why: a delegate knows only its brief, and you see only its summary. Both
  handoffs lose detail.*

## What every brief contains

A delegate starts with no memory of the conversation. Give it:

- the task and the outcome expected;
- the files to read, by exact path, unless finding them is the task;
- the files it may change, and those it must not;
- the acceptance criteria and the constraints;
- any scope decision the user made, such as an instruction to cut or keep
  scope;
- where to write a report, if one is wanted;
- the working directory, when it differs from the project root.

Summarize only the decisions the subtask depends on. Do not forward the whole
conversation.

## Parallel work

- Run delegates in parallel only when each owns a disjoint set of files and the
  points where their work meets are already defined.
- Never let two delegates edit the same file, the same generated artifact, a
  shared configuration file, or the same sequence of migrations.

## What stays with you

- Coordination, merge decisions, and every request for the user's approval.
- **Responsibility for the result.** A delegate's report is a claim. Check the
  parts that matter against the files or the test output before repeating them
  to the user.

## The reply to ask for

Have each delegate finish with:

```text
Status: done | done-with-concerns | blocked | needs-context
Summary: one or two sentences
Concerns or blockers: only if there are any
```

For `blocked` or `needs-context`, change the context, the scope, or the
approach. Sending the same brief again produces the same result.
