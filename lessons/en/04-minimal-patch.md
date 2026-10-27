# Lesson 04 — How do I direct AI to fix a bug without creating three new ones?

> **This lesson solves exactly one problem: how do I design the smallest patch that solves the problem?**
> Time: 45–90 minutes · Prerequisite: an evidence-backed RCA from [Lesson 03](./03-root-cause-analysis.md), made on your own working branch ([Git Quickstart](../../docs/en/git-quickstart.md)) · Deliverable: [patch plan](../../templates/en/patch-plan.md) + a minimal diff

## A. The problem

You've confirmed the root cause. You hand it to an AI assistant, and it comes back in ninety seconds with a few hundred lines: a new helper file, a refactor of the surrounding code, maybe a "small improvement" to an unrelated function. It looks impressive. To an open-source reviewer, it looks like **risk**: every extra line is a line they must understand, test, and maintain for years.

## B. The Aha moment

**The first principle of a high-quality PR is not "do more" — it's "do less, and just enough."**

## C. One concept: minimal necessary change

A minimal patch changes **only what the confirmed root cause requires** — no drive-by refactors, no style cleanups in untouched code, no new abstractions "for the future." Minimal does *not* mean skipping tests: a regression test that fails on the old code and passes on the new code is part of the fix, not decoration.

The test is simple: for every hunk in your `git diff` (diff reading is covered in the [Git Quickstart](../../docs/en/git-quickstart.md)), you can answer "which part of the root cause demands this?" If the answer is "it was just nicer this way," the hunk goes.

## D. Real-world evidence

In [PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437), the first version carried a separate set of freestanding fallback headers. In the [second review round](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5502061602), the maintainer asked: can the fallback live *inside the existing MIOpen headers*, enabled only when the standard library is unavailable? And can the `HIP < 7` compatibility checks go, since that support is already dropped? The author merged the separate files away and deleted the dead branches — the final PR is **7 files, +317/−21**, smaller and easier to review than the first draft.

In the [approval round](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5551696370), the maintainer also asked to restore existing `typedef` style and definition order in code the patch had incidentally restyled. Functionally harmless changes — but they made the diff bigger than the fix. See the [case study](../../case-studies/en/rocm-pr-13437.md) review table.

## E. Step-by-step exercise

**1. Study how the project already solves this class of problem.** Is there an existing fallback pattern, error-handling convention, or test helper? Your patch should look like it was written by someone who read the codebase.

**2. Write the patch plan *before* letting the AI code.** In the [patch plan](../../templates/en/patch-plan.md), list each file you intend to touch, why it must change, the risk, and how you'll verify it. Add an explicit **non-goals** list ("will not reformat", "will not rename") — this is your defense against assistant drift.

**3. Implement for the smallest diff.** After the AI writes code, read `git diff` hunk by hunk. Did it touch modules outside the plan? Did it re-indent or rewrite code that only *looks* different? Can you justify every added line?

**4. Review until you can restate it.** Ask the assistant to explain any part you don't understand until you could write it yourself. You may not submit code you cannot explain — that's the rule reviewers will hold you to anyway.

## F. Copyable CodeX mission

```text
The confirmed root cause is: [evidence link]. Study how this repository already
implements similar fixes — conventions, naming, test framework. Design a
minimal-necessary patch: list each file to change, the purpose of each change,
compatibility risks, and how each change will be verified. Explicitly list what
will NOT be refactored. Wait for my approval before coding. After coding,
show me the diff file by file and flag any change unrelated to the root cause.
Do not push or open a PR.
```

Standalone file: [mission-04 prompt](../../prompts/en/mission-04-minimal-patch.md)

## G. Expected deliverable

A completed [patch plan](../../templates/en/patch-plan.md) with its non-goals list, plus the working diff on a branch — every hunk traceable to the root cause.

## H. Acceptance criteria

For every line in your diff you can answer **"why must this line change?"** without hand-waving — and your regression test from the plan exists and runs. Bonus check: `git diff --stat` shows no file you can't account for.

## I. Common mistakes

- **Bundling drive-by improvements** (reformatting, renames, dependency bumps) into a bug-fix PR. Each belongs in its own PR, if anywhere.
- **Skipping the regression test to "keep the diff small."** The test is part of the fix's quality boundary, not optional weight.
- **Reviewing only the line count.** "+12 −3" can still be wrong if those 12 lines do the wrong thing. Read the actual behavior change.

## J. Navigation

[← Previous lesson](./03-root-cause-analysis.md) · [Lesson index](./README.md) · [Next lesson →](./05-prove-the-fix.md) · [简体中文版](../zh-CN/04-minimal-patch.md) · [Patch plan](../../templates/en/patch-plan.md) · [Mission 04 prompt](../../prompts/en/mission-04-minimal-patch.md)
