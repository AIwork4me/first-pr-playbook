# Mission 07 — Reviewable PR description

[Lesson 07](../../lessons/en/07-write-pr-description.md) · [Template: PR description](../../templates/en/pr-description.md) · [中文版](../zh-CN/mission-07-write-pr-description.md)

**Mission.** Draft a concise, accurate English PR description from real evidence only, following the upstream template when one exists — for human review before posting.

**Context.** The description decides whether a maintainer can review efficiently. Invented claims destroy credibility; missing evidence wastes maintainer time.

**Inputs.** The issue, the RCA, the patch plan, the real test logs and validation matrix, the upstream PR template (if any).

**Constraints.**

- Use only provided evidence. Every technical claim points to a log or code location.
- Missing evidence becomes "NOT RUN" or "Unknown" — never an invented PASS, performance claim, or universal-compatibility claim.
- Follow the upstream PR template if it exists; otherwise: Motivation / Reproduction / Root cause / Changes / Validation / Limitations / Related evidence.
- Output is a draft; the assistant never posts to GitHub.

**Steps.**

1. Summarize the user problem and link the issue.
2. State the root cause with its evidence and remaining uncertainty.
3. Describe changes file-by-file; justify minimal scope.
4. Fill the validation table from the real matrix; write limitations last.
5. Hand the draft to the human; revise until a non-participant can answer the four review questions.

**Validation.** Someone who didn't work on the fix reads it in ~2 minutes and can answer: why fix, what changed, how verified, what risk remains.

**Deliverables.** A PR description draft (or the updated description on the real PR).

**Stop conditions.** Stop if required evidence (baseline log, regression test result) doesn't exist yet — the description cannot be completed honestly; return to Mission 05 instead of papering over gaps.
