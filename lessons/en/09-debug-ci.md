# Lesson 09 — CI is red. Whose fault is it, and what do you fix?

> **This lesson solves exactly one problem: how do I work out why CI failed on my PR?**
> Time: 45–90 minutes · Prerequisite: the review state and PR URL from [Lesson 08](./08-handle-review.md) · Deliverable: a [CI triage record](../../templates/en/ci-triage.md)

## A. The problem

CI — Continuous Integration — automatically runs formatting checks, builds, and tests on every PR. Yours shows a red ✗, and your assistant instantly concludes "my patch must be broken." Maybe. But red CI means "**a failure that needs explaining**", not "your code is wrong." The failure could be your code, your formatting, a permission wall, a flaky runner, or a problem that already exists on the base branch.

## B. The Aha moment

**Never diagnose CI from the overall icon. Diagnose from the failing job's log and a matching comparison run.**

## C. One concept: CI failure categories

Every red check falls into one of a few buckets, each with a different owner:

| Category | Typical signature | Whose work is it |
|---|---|---|
| Code/test failure | A test or build step fails with your code in the log | Yours |
| Format/lint | clang-format, pre-commit, or black complains about style | Yours (mechanical) |
| Permission gate | Status `action_required` — awaiting a maintainer approval | Maintainers' |
| Infrastructure/flake | Network timeouts, disk-full, runner killed | Nobody's — retry or report |
| Pre-existing base failure | Same failure on the base branch | Upstream's, not yours |

Triage = reading the log, placing the failure in one bucket, and doing only that bucket's action.

## D. Real-world evidence

The [PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) history shows several buckets at once: a real clang-format/pre-commit issue the author had to fix in code; some GitHub Actions sitting in `action_required` until maintainers approved them (not a test failure); and a TheRock multi-architecture CI failure where maintainers pointed out that upstream `develop` showed the same failure on that older TheRock revision — a **pre-existing base failure**, not a regression. The author's [CI status comment](https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225886811) reports the seven major workflows green on the final HEAD before merge. The [case study](../../case-studies/en/rocm-pr-13437.md) links each piece.

## E. Step-by-step exercise

**1. Open the PR's Checks tab.** Identify the exact workflow, job, and step. Find the *first meaningful* error line in the log (not the last "job failed" line), and save the GitHub URL of that run.

**2. Categorize the failure** using the table above. Check the job's status word: `failed`, `action_required`, `cancelled`, and `pending` mean different things, and only some are yours to fix.

**3. Reproduce locally where possible.** Format problems reproduce with the repository's pinned pre-commit/clang-format versions. GPU tests need matching hardware — the optional [cloud lab](../../docs/en/cloud-gpu-lab.md) can cover some Linux GPU tests, but never assumes Windows or CI-specific hardware.

**4. Compare before concluding.** Suspect a pre-existing failure? Find the same check on the base branch (or a maintainer's reference run) under comparable conditions. Permission gate? Politely ask a maintainer to approve — don't hammer re-run. Either way, act only on the bucket you've established.

## F. Copyable CodeX mission

```text
Analyze the real CI state of my PR at its current HEAD — do not trust the
overall red/green icon. For every abnormal job, report: the workflow/job URL,
the failing step, the key log lines, the HEAD SHA, evidence from a comparable
base-branch run, and your classification: code / format / test / permission /
infrastructure / pre-existing / unknown. Recommend only the minimal next
action per job. Never describe action_required as a test failure, and never
report an unfinished workflow as green. I decide on any re-run or comment.
```

Standalone file: [mission-09 prompt](../../prompts/en/mission-09-debug-ci.md)

## G. Expected deliverable

A [CI triage record](../../templates/en/ci-triage.md): PR URL + HEAD SHA, workflow/job URLs, original log evidence, comparison results, your classification with supporting evidence, and the action taken.

## H. Acceptance criteria

You can explain **at least one real CI status** end-to-end: the log line that matters, the category you assigned, the evidence for that category, and what you did (or asked for) next. If the cause is genuinely unclear, the record says UNKNOWN with what you checked — that's a legitimate outcome.

## I. Common mistakes

- **Clicking Re-run repeatedly without reading the log.** Flaky ≠ fixed; and if it's your code, no number of retries helps.
- **Overruling CI with "it passes on my machine."** Your machine isn't the contract; the CI environment is.
- **Blaming infrastructure by default.** It's sometimes true and always convenient — verify with a base comparison before claiming it.

## J. Navigation

[← Previous lesson](./08-handle-review.md) · [Lesson index](./README.md) · [Next lesson →](./10-merge-and-handoff.md) · [简体中文版](../zh-CN/09-debug-ci.md) · [CI triage record](../../templates/en/ci-triage.md) · [Mission 09 prompt](../../prompts/en/mission-09-debug-ci.md)
