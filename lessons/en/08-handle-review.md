# Lesson 08 — The reviewer doesn't like your code. Now what?

> **This lesson solves exactly one problem: how do I understand and act on code review?**
> Time: 45–75 minutes · Prerequisite: the reviewable PR from [Lesson 07](./07-write-pr-description.md) · Deliverable: a completed [review response table](../../templates/en/review-response.md)

## A. The problem

The first comment from an international maintainer lands, and your stomach drops: "Is my code that bad?" No — **review is collaboration, not an exam grade.** Comments describe distance between your change and what the project can maintain, and the skill you're learning is turning each comment into a verified improvement.

## B. The Aha moment

**Review isn't only about changing code — it's about lowering the whole community's maintenance cost.**

## C. One concept: review comments have engineering reasons

A request that looks arbitrary ("use the existing test file", "keep the original formatting") usually encodes a project constraint: uniform copyright, one test framework, minimal diffs, consistent style tooling. When you classify each comment by its *underlying reason* — policy, design, test evidence, or format — the right response often writes itself. And when you disagree, the same classification lets you discuss facts instead of feelings.

## D. Real-world evidence

[PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) went through three substantive rounds — all public, all instructive:

- **Round 1 — project policy.** In the [first review](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5489844163) (a maintainer-run automated first pass, 2026-10-12): work done at AMD needs the correct AMD copyright, not a personal one; use the existing gtest infrastructure instead of a standalone test; remove comments meaningful only with the author's private experiment logs.
- **Round 2 — design simplification.** The [second review](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5502061602) asked to merge the separate freestanding headers into existing ones, drop `HIP < 7` legacy checks, and shrink the test to a trivial inline kernel.
- **Round 3 — diff hygiene, then approval.** Restore untouched code's definition order and `typedef` style, trim comments, run the project's clang-format/pre-commit. Then: ["LGTM, thanks! Will merge once CI is green."](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5551696370)

Full table with links: [case study](../../case-studies/en/rocm-pr-13437.md).

## E. Step-by-step exercise

**1. Don't reply immediately.** Copy each comment into the [review response table](../../templates/en/review-response.md) and tag it: policy / design / test evidence / format / needs clarification. The table, not your inbox, tracks the work.

**2. Understand the "why" before deciding.** For anything unclear, have your assistant find similar existing code and explain the convention. You don't have to obey every comment — but disagreement needs a factual case, politely made.

**3. Change small, re-verify each time.** If a change touches tests or dependencies, previous PASS results are void — rerun the relevant validation on the new commit.

**4. Reply with evidence, in the fixed format.** For each thread: `Addressed in <SHA>` → what changed → how it was verified on the new commit. A reply like "Done" or an unevidenced "tests pass" is exactly what skeptical maintainers can't use.

## F. Copyable CodeX mission

```text
Read the public review threads on my PR. For each comment, produce: the
original comment URL, the maintainer's actual request, the engineering reason
behind it, a proposed minimal change, its risks, and any regression test it
needs. Classify each as policy/design/test/format/clarification. Do not assume
the reviewer is always right — if a suggestion has real trade-offs, draft a
polite, fact-based discussion option too. After my changes, draft concise
English replies in the form Addressed in <SHA> / Change / Verified, citing
only real commits and real test logs. I will review before anything is posted.
```

Standalone file: [mission-08 prompt](../../prompts/en/mission-08-handle-review.md)

## G. Expected deliverable

A completed [review response table](../../templates/en/review-response.md) where every comment has a status — addressed (with commit + evidence), under discussion, or awaiting clarification — and replies drafted in the evidence format.

## H. Acceptance criteria

Traceability: **every review comment leads to a real commit + verification, or to a clearly-stated open question.** Nothing is silently dropped. Note that a resolved thread is not the same as approval — new rounds may follow.

## I. Common mistakes

- **Replying "Done" with no SHA, no verification.** The maintainer now has to check your work manually — the thing the reply was supposed to prevent.
- **Sneaking in a refactor with a review fix**, forcing a full re-review of everything. Keep rounds small.
- **Letting the AI write a warm, wordy reply that avoids the technical point.** Politeness is one sentence; the payload is the evidence.

## J. Navigation

[← Previous lesson](./07-write-pr-description.md) · [Lesson index](./README.md) · [Next lesson →](./09-debug-ci.md) · [简体中文版](../zh-CN/08-handle-review.md) · [Review response table](../../templates/en/review-response.md) · [Mission 08 prompt](../../prompts/en/mission-08-handle-review.md)
