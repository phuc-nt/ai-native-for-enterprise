# Background Processes

Applies when a task starts, reuses, or stops anything long-running: a dev
server, file watcher, build daemon, tunnel, emulator, or test runner in watch
mode.

The failure this prevents: an agent starts a server and forgets it; the next
run finds the port taken, picks another, and starts a second copy. After a few
rounds the machine is full of duplicates holding ports and memory, and nobody
knows which one is current.

## Rules

- **Know what you started.** For each background process keep its command,
  process id, port, and the worktree it belongs to. Use the harness's own
  background facility when it has one, so that the exit is observable.
- **Check before starting.** If this project or port already has a running
  process, reuse it or stop it. Never start a second copy beside it.
- **One fixed port per project or worktree.** When the port is busy, find out
  what holds it and deal with that. Do not move to the next free port.
- **Stop what you started** when the task, session, or worktree ends. Stop a
  worktree's processes before removing the worktree.
- **Stop gently first.** Send a normal termination signal and escalate to a
  forced kill only when it is ignored.

## Limits

- Stop only processes you started or clearly own.
- A process belonging to the user, another session, or the operating system is
  left running unless the user confirms.
- Never use a kill pattern broad enough to match a process you did not start.
