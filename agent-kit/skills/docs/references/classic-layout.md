# Classic layout

An optional fixed set of file names under `docs/`, for a repository that has
no documentation layout of its own and a user who wants a predictable one.

The layout fixes names only. It does not oblige any file to exist, and it
does not prescribe sections inside a file. A file with nothing true to say
is not created.

| File | The question it answers |
|---|---|
| `project-overview-pdr.md` | What is this product, who is it for, what are its requirements and its limits? |
| `system-architecture.md` | How is it put together, what talks to what, and why this shape? |
| `codebase-summary.md` | Where do I look for a given kind of thing? |
| `code-standards.md` | What conventions must I follow that tools do not enforce? |
| `design-guidelines.md` | What does the interface look and behave like, and why? |
| `deployment-guide.md` | How does it reach production, and how do I recover? |
| `project-roadmap.md` | What is decided, what is in progress, what comes next? |

## Using it

- Use it only when the repository has no existing layout. Never rename
  existing documents to fit it.
- Keep the root README as the entry point, with one line per file that
  exists.
- `codebase-summary.md` is a map at the level of boundaries. It is the file
  most likely to turn into a hand-kept inventory. Hold it to the
  writing standard: where to look, not what is there.
- `project-roadmap.md` is the one place for intentions. Everything else
  describes the present.
