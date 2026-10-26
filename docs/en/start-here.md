# Start Here — Your First Open-Source PR

**One goal: build a checkable engineering record around one real problem.** You don't need to be able to merge a PR on day one, and you don't need to know ROCm or C++.

## What you'll have after ten lessons

You will have practiced, on a real issue of your choosing: find an issue → reproduce it → investigate the root cause → make a minimal fix → validate with tests → open a PR → handle review → judge CI → close out. Whether upstream merges it is the maintainers' decision — not controlled by you, this course, or any AI.

## The three most common beginner traps

1. **Choosing an issue that's too big.** Prefer tasks with clear errors, small scope, maintainer activity, and no duplicate PRs.
2. **Believing "fixed" because the AI said so.** Save commands, logs, environments, and commits; build before/after comparisons.
3. **Submitting code you don't understand.** You must be able to explain every change and every test conclusion to a maintainer.

## Four checks before you start

- [ ] I have a GitHub account and can read issues and PRs.
- [ ] I can run a terminal (Windows PowerShell, macOS Terminal, or a Linux shell).
- [ ] I can use an AI coding assistant (optional — exercises also work by hand).
- [ ] I have a folder for my learning log that will never contain secrets, private data, or non-publishable logs.

## How the course works

Every lesson follows the same rhythm: **what's the problem → why this solution → real-world evidence → hands-on steps → acceptance criteria**. From Lesson 02 on, each lesson reuses the previous lesson's output. Each lesson has a CodeX mission prompt as a starting point — but you review every command before it runs.

### Can I do this without a GPU?

Yes. Documentation, install scripts, and plain software bugs need no GPU. If you choose a GPU issue, read the [cloud GPU lab](cloud-gpu-lab.md) first. Cloud Linux results never automatically represent Windows, your local driver, or a different GPU architecture.

**Now begin: [Lesson 01 — Find your issue](../../lessons/en/01-find-an-issue.md)**. [简体中文版](../zh-CN/start-here.md)
