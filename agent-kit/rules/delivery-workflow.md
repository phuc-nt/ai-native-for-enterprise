# Delivery Workflow

Applies to any task that changes the workspace in more than one step. A direct
answer or a read-only lookup needs none of this.

The stages name what must be true before moving on. How you get there is up to
you.

## 1. Frame

Before changing anything, be able to state four things:

- **Outcome**: what will be different when the work is done.
- **Constraints**: what must not change or break.
- **Non-goals**: what is deliberately left out.
- **Acceptance criteria**: the observable checks that prove the outcome.

Keep this proportional. A one-file fix needs one line for each. An accepted
plan or an earlier agreement that already records them is reused, not reopened.

## 2. Inspect

- Read the request, the relevant project docs, the surrounding code, and its
  tests before deciding on an approach.
- Confirm who owns the behavior from the code itself. A file or function name
  is a hint, not proof.
- For work that is broad, risky, or spans sessions, write a plan first.

## 3. Change

- Prefer editing what exists. Create a new file only where there is a real
  boundary.
- Keep behavior compatible unless the accepted scope says otherwise.
- **For a defect, prove the cause before changing behavior.** A fix aimed at
  an unproven cause hides the defect or moves it.

## 4. Verify

- Run the checks that cover the behavior you touched, then widen as described
  in `scope-and-quality.md`.
- A regression you introduced is yours to repair, within the same scope.

## 5. Close

- Get a review, from a person or a fresh-context reviewer, when the change is
  high-risk, crosses module boundaries, or alters a public contract.
- Update documentation only when `documentation-impact.md` says the change
  affects it.
- Compare the result with the acceptance criteria from stage 1 and report:
  what was done, the evidence, what was not verified, what remains.

## Stop and ask

Pause for the user, whatever stage you are in, when:

- the next step is destructive, irreversible, or visible outside the workspace
  and was not explicitly authorized;
- continuing would change a product decision the user made;
- the evidence contradicts the request as written;
- the same approach has failed twice and you have no new information.

## Skills for each stage

| Stage | Skill |
|---|---|
| Frame, inspect, plan | `plan` |
| Change and verify | `implement`, or `fix` for a bug |
| Close | `review`, then `ship` |
| Documentation | `docs` |
