# llms.txt

Generate an `llms.txt`: a short Markdown index that tells an external
language-model client which of the project's documents to read. Produce it
only when the user asks, or when the project publishes documentation for
outside consumers.

It is an index of documents that already exist. It contains no new
knowledge. If the underlying docs are thin or stale, fix them first with
Create or Maintain.

## Shape

The file follows the public llms.txt convention:

```markdown
# Project name

> One or two sentences: what the project is and who it is for.

Optional short notes a reader needs before following the links.

## Section name

- [Document title](url): what question this document answers

## Optional

- [Document title](url): material that can be skipped when context is short
```

- Exactly one H1, then the blockquote summary.
- Each H2 groups links. Each link has a note saying why to read it.
- The section named `Optional` is special: it marks what may be dropped.

## Rules

- **Take the content from the docs.** The summary comes from the project's
  own overview. Each note says what the linked document answers. Do not
  write descriptions the documents do not support.
- **Link what an outside reader needs:** overview, getting started, the
  public interface, the main guides. Leave out internal process documents.
- **Every link must resolve.** Use absolute URLs when the docs are published
  on a site, and repository-relative paths otherwise. Do not mix them.
- **Keep it short.** It is a table of contents. If it needs scrolling, it is
  doing the documents' job.
- **Regenerate, do not hand-edit.** Rebuild the file when the document set
  changes, so that it cannot drift from what it indexes.
- **No secrets and no internal hostnames.** The file is meant to be public.

## Placement

Put it where the published site serves its root, or at the repository root
when there is no site. Follow the repository's convention if it already has
one.

A companion file that inlines the full text of every document is produced
only when the user asks for it, by concatenating the linked documents
without rewriting them.

## Verify

Every link resolves, the summary matches the project's overview, and nothing
in the file matches the secret or sensitive-path policies.
