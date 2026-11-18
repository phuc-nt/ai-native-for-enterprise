# Create

Write the first useful documentation for a codebase that already exists.
Read `writing-standard.md` first.

## 1. Find the route

Before deciding what to write, find out how this repository handles docs:

- its agent and contributor instructions, and the root README;
- an existing docs directory or docs-site configuration;
- the language and format of whatever is already written.

If documents already exist for a topic, they are maintained, not replaced.
Create covers only what is missing.

## 2. Read the codebase for answers

Read to answer reader questions, not to catalogue files. Useful sources, in
roughly this order:

- manifests, build files, and scripts: how it is run, built, and tested;
- CI and deployment configuration: how it reaches users;
- entry points and the top level of each module: where the boundaries are;
- schemas, migrations, and API definitions: the contracts;
- configuration loading: what must be provided from outside;
- commit history and merged pull requests around large changes: the reasons.

In a large repository, read by boundary and sample within each. If the
harness supports delegation, each boundary can be read separately, as
described in the delegation rule. Check what comes back before writing it
down.

## 3. Choose the documents by reader question

A document exists because a reader arrives with a question.

| Reader's question | Usual sources |
|---|---|
| What is this, who is it for, what is in and out of scope? | README, product notes, the user |
| How do I run it, change it, and check my change? | Manifests, scripts, CI |
| How is it put together, and why that way? | Module boundaries, history, the user |
| What must I follow that no tool will tell me? | Review history, existing conventions |
| How does it get to production, and how do I recover? | Deploy config, the user |
| What is decided, and what is next? | Issue tracker, the user |
| What does the interface look like and why? | UI code, design assets |

Map each question that has a real answer onto the repository's layout. If
the repository has no layout and the user wants a fixed one, use
`classic-layout.md`.

**A question with no real answer gets no document.** A project without a
deployment has no deployment guide. A library without a UI has no design
guidelines.

## 4. State the set, then gather what only the user knows

Tell the user which documents you will write, what question each answers,
and what it is drawn from. This costs one short message and prevents writing
the wrong set.

Reasons and outside routes are rarely in the code. Collect those questions
and ask them once, together. Where the user does not know or does not
answer, leave the content out.

## 5. Write

- One document per reader question, each opening with its answer.
- Link to the code that owns each fact.
- Leave out what could not be established, and keep a list for the report.

## 6. Give the set one entry point

A reader must be able to reach every document from one place: the README or
the docs index the repository already uses. Add a line per document saying
what question it answers. Do not write a second index.

## 7. Verify

- Every link resolves.
- Every command shown was run, or is listed in the report as not run.
- A reader starting from the entry point can reach setup, structure, and
  conventions without searching.
- Nothing matches the secret or sensitive-path policies.

## Report

What was written and from which sources, what was left out because it could
not be established, and the open questions for the user.
