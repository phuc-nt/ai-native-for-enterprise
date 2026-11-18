# Writing standard

What belongs in a project document, and how to write it so that it stays
true. Applies to every operation of this skill.

## Who holds which knowledge

| Question | Owner |
|---|---|
| What does it do, and how? | The code |
| What is guaranteed to keep working? | The tests |
| When did it change, and who changed it? | Version history |
| Why is it this way? Where do I look? What must I not break? | Documentation |

Write documentation only for the last row. When a document answers a
question from one of the other rows, it duplicates a source that will change
without it.

## The sentence test

For each sentence, ask:

> If this were deleted, what would a competent newcomer with the repository
> open get wrong, or need more than a few minutes to work out?

If the answer is "nothing", delete the sentence. Apply the same test to
sections and to whole files.

## What passes the test

- **Reasons.** Why this design, what it traded away, which alternative was
  rejected and why. The code shows the choice and never the reason.
- **Invariants that span files.** A rule that holds across modules and is
  visible in none of them alone.
- **The map.** Where a kind of thing lives and where to start reading, at
  the level of boundaries, not files.
- **Unwritten conventions.** What reviewers expect and no tool enforces.
- **Traps.** What looks safe and is not, with what it costs to get wrong.
- **Setup and operation that the manifests do not reveal.** Order of steps,
  required services, the one command that is not what you would guess.
- **Contracts for consumers** outside this codebase.
- **Routes outside the repository.** See below.

## What fails it

- A walk through the code: "this function takes X and returns Y".
- A tour of the directory tree, file by file.
- Lists, counts, and inventories kept by hand: the endpoints, the commands,
  the environment variables, "the 14 services".
- A narration of recent changes. That is the history's job.
- Intentions written as facts. What is planned goes in a roadmap, labelled
  as planned.
- Generic advice that would be equally true in any repository.
- Headings with nothing under them, and "to be written".

## Staying true

Documentation fails by drifting, so write in the way that drifts least.

- **Point, do not paraphrase.** Link to the file, symbol, schema, or script
  that owns a fact. When that owner changes, the link is still right.
- **One fact, one place.** If two documents need it, one states it and the
  other links.
- **No numbers that change with the code** unless a tool generates them.
- **No tree deeper than the level that rarely changes.**
- **Describe the present.** No "currently", "recently", "new", or "soon".
  They are false the day after they are written.
- **Dates belong to decisions and records,** not to descriptions.
- **If a list must exist, generate it,** or link to the manifest that is
  already the list.

## Evidence

- Every statement comes from code, configuration, history, or the user.
- Read the source of a statement in this session. Memory of how such
  projects usually work is not a source.
- What cannot be established is left out of the document and named in the
  report. A confident wrong sentence costs more than a gap.
- Commands shown in a document were run, or the report says they were not.

## Secrets and outside routes

Some knowledge lives outside the repository: how to deploy, where the logs
are, which dashboard, where a credential is stored, how a webhook or DNS
record is set up, how to restore a backup or roll back.

- Record **the route**: what it reaches, how to get access, who owns it.
- Record **never the secret**: no credential value, token, signed URL, or
  personal data, in any document, whoever approves it.
- Record a route only after verifying it, or when the user states it. A
  wrong route sends the next person confidently in the wrong direction.
- When a recorded route turns out to be wrong, correcting it is a
  documentation change that must happen in the same piece of work.

## Form

- Use the repository's language, tone, and file format.
- Lead with what the reader came for. Put background after it, or leave it
  out.
- Short documents get read. Split by reader task, not by size.
- Show an example by linking to real code, not by copying it.
- Draw a diagram only when the relation is spatial: flow, containment,
  sequence. If the repository generates diagrams from a source, edit the
  source.
