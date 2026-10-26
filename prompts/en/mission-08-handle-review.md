# Mission 08 — Review response loop

[Lesson 08](../../lessons/en/08-handle-review.md) · [Template: review response table](../../templates/en/review-response.md) · [中文版](../zh-CN/mission-08-handle-review.md)

**Mission.** Turn every review comment on the PR into either a verified change with evidence, a factual discussion point, or an explicit open question.

**Context.** Review is collaboration. Comments encode project constraints; responses must be traceable to real commits and real test runs.

**Inputs.** The PR URL and its public review threads; the repository's conventions.

**Constraints.**

- For each comment record: original URL, the maintainer's actual request, the engineering reason, a proposed minimal change, risks, and any needed regression test.
- Classify as policy / design / test / format / clarification. Do not assume reviewers are always right — where a suggestion has real trade-offs, draft a polite, fact-based discussion option.
- Changes happen only after classification and human review; keep rounds small.
- Replies use only real commit SHAs and real test logs, in the form: Addressed in `<SHA>` / Change / Verified / Limitations.
- Nothing posts without human approval.

**Steps.**

1. Read the latest review threads; fill the classification table.
2. Agree with the human on the response per comment (implement / discuss / clarify).
3. Implement small; re-run affected validation on the new commit.
4. Draft concise English replies; human reviews; human posts.

**Validation.** Every comment traces to a commit + verification, or carries a clearly-stated open status; nothing silently dropped.

**Deliverables.** Completed [review response table](../../templates/en/review-response.md) + posted replies.

**Stop conditions.** Stop if a comment requires information the human cannot obtain (private logs, credentials) — say so openly on the thread instead of approximating. Stop if responding requires changes beyond the agreed scope — that is a new patch-plan discussion, not a reply.
