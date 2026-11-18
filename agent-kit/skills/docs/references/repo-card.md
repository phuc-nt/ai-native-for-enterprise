# Repo card

Write one short file that tells someone outside the repository what it is
for, who owns it, and what it connects to. Read `writing-standard.md` first.

The card is the one document in this skill with a fixed location and a fixed
shape. Every other document follows the repository's own layout. The card
does not, because its readers do not open one repository: they look across
many. An organization collects the cards of all its repositories into a
catalogue or a knowledge base, and that only works when each card sits at
the same path and has the same fields.

## Readers

- A business analyst or bridge engineer asking which system handles a
  business function. They search with business words and may never read
  code.
- A developer, or their agent, asking which repository to open and where to
  start in it.

Both arrive from outside with a question and leave as soon as they know
whether this is the right repository. The card routes them. It does not
explain the system; the repository's other documents do that.

## Location and shape

The file is `docs/repo-card.md`. If the organization has agreed on another
path, use that one; the path must be the same in every repository.

```markdown
---
name: payment-gateway
summary: Takes card and bank-transfer payments for the web shop and the mobile app.
kind: service
status: active
owner: payments-team
verified_commit: 3f2a91c
verified_date: 2026-11-18
---

# payment-gateway

## What it does

## Known as

## Connects to

## Not here

## Start here

## Related sources
```

### Fields

All seven fields are always present, so that a collector can tell "not
established" from "forgotten". This is the one exception to the rule against
placeholders: when a value cannot be established, write `unknown` and list
it in the report.

| Field | Value | Established from |
|---|---|---|
| `name` | The repository's name as its host shows it | The remote |
| `summary` | One sentence in business terms: what it does, for whom | The overview, the user |
| `kind` | `service`, `application`, `library`, `infrastructure`, `tool`, or `documentation` | Manifests, deployment configuration |
| `status` | `active`, `maintenance`, `deprecated`, or `archived` | The user. Commit dates are a hint, not an answer |
| `owner` | The team that answers for it, never a person | A code owners file, the user |
| `verified_commit` | The commit the card was checked against | `git rev-parse --short HEAD` |
| `verified_date` | The date of that check | Today |

Write the field names and the `kind` and `status` values exactly as shown.
Write everything else in the language the repository's documents use.

### Sections

The headings and their order are fixed. A section with nothing true to say
is left out, not left empty.

- **What it does.** Three to six sentences that a reader who does not read
  code can follow: the business function, who uses it, what goes in and what
  comes out. No class names, no framework names.
- **Known as.** The words people use when they look for this: feature names,
  screen names, product names, former names of the repository, the same
  terms in the other languages the business works in. One line each. This
  section is what a search matches, so it holds the words of the people
  searching, not the words of the code.
- **Connects to.** What it calls, what calls it, and the data stores, queues,
  and external services it uses. One line per connection: the other side,
  the direction, the purpose. Name the other side by its repository name
  when it has one, so the cards link up.
- **Not here.** What people reasonably expect to find in this repository and
  will not, each with where it is instead. Write an entry only when the
  confusion is real: a similar name, a function that was moved out.
- **Start here.** For the reader who will open the repository: the entry
  point, the document to read first, the command that runs it. Links, not
  explanations.
- **Related sources.** Where the rest of the knowledge lives: issue tracker
  project, wiki space, design files, dashboards. Name and link only.

## Rules

- **One screen.** About sixty lines. When a section grows, the content
  belongs in another document and the card links to it.
- **Nothing in the card is new knowledge.** Each line comes from the code,
  the configuration, an existing document, or the user. If the repository
  has no overview to take the summary from, write the card from the code and
  say in the report that Create has not been done.
- **Connections come from evidence.** Client configuration, API definitions,
  deployment manifests, queue and topic names, environment variable names.
  A connection that is only suspected is not written. What calls this
  repository is often invisible from inside it: record the callers the code
  or the user can confirm, and report that the list may be incomplete.
- **No secrets, no credential values, no internal addresses.** The card is
  copied out of the repository to a wider audience than the code has. Name a
  system; do not give its hostname.
- **Ask the user once, together,** for what the code cannot say: status,
  owner, the business words, the related sources.

## Write authority

Creating the card is covered by the request. Confirm first, showing the
line, before recording `status: deprecated` or `archived`, an owner that
does not come from a code owners file, or a related source you have not
opened yourself.

## Keeping it true

The card is checked whenever Maintain runs. It changes when a connection is
added or removed, when ownership or status changes, or when the business
function changes.

`verified_commit` and `verified_date` record the last time every line of the
card was checked against the code. Update them when a line changes and when
an audit confirms the card as it stands. Do not update them for a commit
that did not touch what the card describes.

An audit for drift checks every line of the card, never a sample, because
the card is the document most widely read.

## Verify

- The front matter parses and has all seven fields, with `kind` and `status`
  from the lists above.
- Every connection can be pointed to in the code or configuration, or was
  given by the user.
- Every link resolves.
- Nothing in the file matches the secret or sensitive-path policies.

## Report

The card's path, the fields left `unknown`, the connections that could not
be confirmed, and the questions still open for the user.
