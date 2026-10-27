# Lesson 01 — How do I find an open-source issue that's right for me?

> **This lesson solves exactly one problem: which real issue should I start with?**
> Time: 30–45 minutes · Prerequisite: a GitHub account · Deliverable: [issue selection card](../../templates/en/issue-selection.md)
> Brand new to open source? Warm up first with the [Starter Lab](../../labs/first-fix/README.md) (designed for about 15 minutes) — run a real failing test and make it pass.

## A. The problem

You open PyTorch, vLLM, or a ROCm repository for the first time and see hundreds of issues — some are one line long, some have fifty comments, some need a datacenter full of GPUs. Which one is yours?

The beginner instinct is to look for the most impressive bug. The right instinct is the opposite: **find a small problem you can understand, reproduce, and verify.** Your first contribution is about learning the workflow, not proving you're a genius.

## B. The Aha moment

**A clear small problem beats a vague big idea — for a first contribution, "narrow and checkable" is the whole point.**

## C. One concept: repositories and issues

A **repository** ("repo") stores a project's code and its public collaboration history. An **issue** is a public ticket describing a problem or task. A good issue tells you three things: what the user tried to do, what they expected, and what happened instead.

GitHub labels issues to help you filter. `good first issue` *suggests* a task may suit newcomers — it is a hint from maintainers, not a guarantee of easy work. Always open the issue and read it before deciding anything.

## D. Real-world evidence

[MIOpen issue #3956](https://github.com/ROCm/MIOpen/issues/3956) is a real example of a well-reported issue: a Windows Radeon GPU user running `BatchNorm2d` hit `miopenStatusUnknownError`, and included their environment, a small Python sample, and the error log. Fixing that particular low-level bug is *not* a typical beginner task — but it shows what a good starting point looks like: **an observable user problem, not "I want to change something somewhere."** It eventually became [ROCm PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437), the case study that runs through this whole course.

## E. Step-by-step exercise

**1. Pick a repository from software you actually use.** A Python library, an editor plugin, a CLI tool, a documentation site. Choose a project you'd be happy to spend an hour a week on. Skim its README and `CONTRIBUTING.md`, and check whether maintainers respond to issues recently — an abandoned repo can't review your PR.

**2. Search for real issues.** In the GitHub search bar, try:

```text
is:issue is:open label:"good first issue"
```

Add `label:documentation` or `label:bug` to narrow the kind of work, and `repo:owner/name` to stay inside one repository. Open each candidate and read the full thread — don't trust an AI assistant's summary of an issue number it may have invented. Check the date, and look for an existing PR or someone who already claimed the work.

**3. Filter with three questions.** (a) Do I understand what's going wrong? (b) Can I get the environment to reproduce it — or is it documentation work that needs none? (c) Can I produce a checkable intermediate result in one or two short sessions? Three noes means: pick something else.

**4. Choose one primary target and one backup.** If your primary turns out to be fixed already, or a maintainer points discussion elsewhere, switch to the backup without drama.

## F. Copyable CodeX mission

Give this to your AI assistant (also available as a standalone file: [mission-01 prompt](../../prompts/en/mission-01-find-an-issue.md)):

```text
This is my first open-source contribution. Target repository: [URL].
Read the repository's README, CONTRIBUTING.md, and currently open issues.
Propose three beginner-suitable, real issues. For each one, give:
- the issue URL
- what the user expected vs. what happened
- the environment needed to reproduce it
- the knowledge required
- whether anyone appears to be working on it already
- what I should ask the maintainers before starting
Do not modify, commit, or push any code. Every issue must exist on GitHub —
give me the URL so I can verify it myself.
```

## G. Expected deliverable

A filled-in [issue selection card](../../templates/en/issue-selection.md) for your primary issue (plus optionally the backup): URLs, expected vs. actual behavior, environment requirements, and why this issue fits you.

## H. Acceptance criteria

You can answer, in your own words, without looking at the issue page:

1. **Who has which problem, and what did they expect instead?**
2. **What is my first verifiable action on this issue?**

The card has complete URLs, notes the environment the issue needs, and shows no sign of being already fixed or duplicated. That's a pass — no code required in this lesson.

## I. Common mistakes

- **Trusting the `good first issue` label alone.** The label is a hint; the technical scope and hardware requirements decide.
- **Starting from the title only.** Read the discussion, check for linked PRs and assigned people first.
- **Mass-mailing "I want to contribute!" to many projects at once.** Do a little real investigation in one project, then write one specific message — or just start, if the project's rules allow it.

## J. Navigation

[← Start here](../../docs/en/start-here.md) · [Lesson index](./README.md) · [Next lesson →](./02-reproduce-a-bug.md) · [简体中文版](../zh-CN/01-find-an-issue.md) · [Issue selection card](../../templates/en/issue-selection.md) · [Mission 01 prompt](../../prompts/en/mission-01-find-an-issue.md)
