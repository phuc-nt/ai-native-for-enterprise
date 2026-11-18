# Maintain and Answer

Keep existing documentation true, and answer questions from it. Read
`writing-standard.md` first.

Maintaining is pruning. The aim is that every remaining sentence is true and
earns its place. It is never to make the docs look recently touched.

## Maintain after a change

1. **Establish what changed.** Use the diff range, the commits, or the work
   just completed. Without a defined change there is nothing to maintain
   against; use the audit below instead.
2. **Decide whether documentation is affected.** Apply the list in the
   documentation-impact rule. Most internal changes affect nothing. Then the
   result is "no documentation change is needed, because …", and the
   operation is finished.
3. **Find the documents that own the affected facts.** Follow the
   repository's docs index. Search for the names that changed. Do not assume
   a file.
4. **For each affected statement, choose one:**
   - it is now false and still worth saying: correct it;
   - it is now false and fails the sentence test: delete it;
   - it restates something the change moved into code, a schema, or a
     generated file: replace it with a link to that owner.
5. **Add only what the change made necessary:** a new reason, a new trap, a
   new route, a contract a consumer must know.
6. **Verify.** Links resolve, commands were run, and nothing else in the
   edited document contradicts the code you just read.

Do not rewrite sections that are still true. Do not update a "last updated"
line as the only change. Do not reformat.

## Audit for drift

Use when the docs have not been checked for a while, or the user asks
whether they can be trusted.

1. List the documents from the entry point.
2. For each, pull out the statements that can be checked: paths, commands,
   names, described behavior, described structure.
3. Check them against the code. In a large set, check every statement in the
   documents people start from and sample the rest.
4. Report the drift as a list: document, statement, what the code says.
   Separate what is plainly wrong from what is merely redundant.
5. Fix what falls under routine write authority. Bring the rest to the user.

A document that is mostly drift is a candidate for deletion, which needs the
user's confirmation.

## Answer

Use when the user asks what the project does, how something works, or where
something is documented.

- Answer the question. Read the docs and the code they point to, and cite
  the files the answer rests on.
- **Do not create a file to hold the answer** unless the user asks for one.
- If answering reveals that a document is wrong or missing something a
  reader needs, say so. Fix it when it falls under routine write authority.
- If the answer exists only in the code, give it from the code, and consider
  whether it passes the sentence test before proposing to document it.

## Report

For Maintain and audit: each document changed and why, each statement
removed, and anything left for the user. For Answer: the answer, its
sources, and any documentation fault found on the way.
