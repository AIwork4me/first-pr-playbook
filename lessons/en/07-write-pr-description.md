# Lesson 07 — Writing a PR description maintainers want to review

> **This lesson solves exactly one problem: how do I write a reviewable PR description?**
> Time: 30–60 minutes · Prerequisite: the PR from [Lesson 06](./06-open-first-pr.md) and the evidence from [Lesson 05](./05-prove-the-fix.md) · Deliverable: a completed description using the [PR template](../../templates/en/pr-description.md)

## A. The problem

Your PR is open, and its entire body reads: "Fixed bug, please merge." Now the maintainer has to guess what the user's problem was, whether your change is safe, and where to see the evidence — before deciding whether to spend an hour on you. **A good description is respect for maintainer time**, and it is the cheapest thing you can do to raise your PR's odds.

## B. The Aha moment

**A PR description doesn't narrate "what I did" — it answers "why should you believe this change."**

## C. One concept: the review path

A reviewer reads in a specific order: *why does this problem exist → where is the proof it's real → what exactly changed → what proves the fix → what's still untested*. Structure your description in that order and a maintainer can verify as they read, instead of reverse-engineering. Short English is fine; exactness beats eloquence.

## D. Real-world evidence

The merged [PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) description includes Motivation, Root cause, Minimal implementation, Regression test, Validation, Scope, Related issue, and Review updates — a reader can walk from the user problem to the exact changes to the evidence without leaving the page. During review, the author kept updating the description and adding evidence comments (like the [CI status comment](https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225886811)), so the PR stayed self-explanatory for maintainers arriving late.

## E. Step-by-step exercise

Write the body by answering six questions:

1. **Motivation / why** — who hit which problem? Link the issue and quote the key error.
2. **Reproduce** — on which OS, versions, and input? What is the minimal command?
3. **Root cause** — which logs/experiments located it? Which part is still hypothesis?
4. **Changes** — which files, and why is this the minimal necessary scope?
5. **Validation** — baseline vs. patched results in a small table: environment, test, PASS/FAIL/SKIP, link to logs.
6. **Limitations** — what was not tested, what is explicitly out of scope.

A compact skeleton:

```markdown
## Motivation
Fix a reproducible failure reported in #<ISSUE_NUMBER>.

## Changes
Use the smallest change required for <SPECIFIC_ROOT_CAUSE>.

## Validation
- Baseline: EXPECTED_FAIL — original error reproduced.
- Patched: PASS — regression test executed.
- Not tested: <PLATFORM_OR_WORKLOAD>.
```

**The PASS lines above are template placeholders, not your results.** Replace them with your actual outputs — an invented PASS discovered later costs you all credibility in that community. Check any unfamiliar terms against the [glossary](../../docs/en/glossary.md).

## F. Copyable CodeX mission

```text
Draft the PR description in concise English, using ONLY the issue, RCA,
patch plan, and real test logs I provide. Follow the upstream PR template if
one exists. Structure: Motivation, Reproduction, Root Cause, Changes,
Validation, Limitations, Related evidence. Every technical claim must point
to a log or a code location; where evidence is missing, write NOT RUN or
Unknown — do not invent PASS results, performance claims, or universal
compatibility. Output the draft for my review; do not post it to GitHub.
```

Standalone file: [mission-07 prompt](../../prompts/en/mission-07-write-pr-description.md)

## G. Expected deliverable

The description applied to your real PR (or ready to paste), following the upstream template when one exists, with the [PR template](../../templates/en/pr-description.md) structure otherwise.

## H. Acceptance criteria

Hand the description to someone who did *not* work on the fix. In about two minutes they can answer: **why fix it, what changed, how was it verified, what risk remains?** If they can't, cut background and add evidence links until they can.

## I. Common mistakes

- **Marketing language** — "fully supports all environments now!" Reviewers read that as "author didn't test boundaries."
- **Pasting the entire RCA** into the description. Link the details; keep the PR body a navigable summary.
- **Overly elaborate English.** Simple, exact sentences from a non-native speaker are perfectly professional; wrong claims are not.

## J. Navigation

[← Previous lesson](./06-open-first-pr.md) · [Lesson index](./README.md) · [Next lesson →](./08-handle-review.md) · [简体中文版](../zh-CN/07-write-pr-description.md) · [PR description template](../../templates/en/pr-description.md) · [Mission 07 prompt](../../prompts/en/mission-07-write-pr-description.md)
