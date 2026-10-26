# Lesson 02 — You found a bug. How do you reproduce it on your machine?

> **This lesson solves exactly one problem: how do I reproduce a bug and record it honestly?**
> Time: 45–90 minutes · Prerequisite: [Lesson 01](./01-find-an-issue.md) · Deliverable: [minimal reproduction report](../../templates/en/bug-reproduction.md)

## A. The problem

You picked a real issue in Lesson 01. The tempting move now is to tell your AI assistant "fix it" and watch it write code. Resist that. Before anyone can fix anything, you need to answer one question: **does this error actually happen, reliably, in a known environment — and can I show that to someone else?**

If you can't reproduce the bug, you can't verify any later fix. Everything downstream of this lesson depends on it.

## B. The Aha moment

**Shrinking "my training run fails" down to four lines of code that fail the same way *is* the software engineering skill.**

## C. One concept: the minimal reproducer

A **minimal reproducer** is the shortest program that still triggers the same error as the original report. It matters for two reasons: fewer inputs and dependencies mean fewer distractions when you investigate the cause later, and after a fix you can run the *exact same* reproducer as the "before" side of a comparison.

A reproducer that only fails sometimes, or only on hardware you didn't record, is not yet a reproducer — it's a lead.

## D. Real-world evidence

The reporter of [MIOpen issue #3956](https://github.com/ROCm/MIOpen/issues/3956) supplied a compact `BatchNorm2d` example. The later investigation behind [PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) used essentially this minimal program:

```python
import torch
import torch.nn as nn
m = nn.BatchNorm2d(100).cuda()
m(torch.randn(20, 100, 35, 45, device="cuda"))
```

On the affected Windows runtime-compilation environment this raised `miopenStatusUnknownError`, with deeper logs showing `fatal error: 'type_traits' file not found`. **This is not a program that fails on every machine** — when the preconditions don't match, it runs fine. That's exactly why the environment record (next section) is part of the deliverable, not an afterthought. See the [case study](../../case-studies/en/rocm-pr-13437.md) for the full chain.

## E. Step-by-step exercise

**1. Write down your environment's identity first.** OS and version, dependency versions, the exact commit of the project you're testing, hardware. For GPU issues add driver, ROCm, and GPU architecture. Follow the repository's install documentation and avoid polluting your system Python — use a virtual environment or container where the project supports one.

**2. Run the original steps exactly as reported.** Use the *original, unmodified* code and matching software versions. Record the commands, the full output, and the exception — not just the last line. The last line is where the error *surfaced*; the full log often shows where it *started*.

**3. Shrink it, re-testing after every cut.** Turn the long command or script into a short program. After each removal, run it again and confirm the same error still appears. If the error disappears, you just deleted a triggering condition — put it back and note it.

**4. Repeat in the same environment.** A one-time failure and a stable failure are different things. Record how often it reproduces, and any cache or random-seed conditions that matter.

### No GPU available?

If the issue genuinely requires a Linux ROCm GPU, the optional [AMD Radeon Cloud lab](../../docs/en/cloud-gpu-lab.md) explains how to rent a matching environment — check first that OS, GPU, and software stack actually match the issue. For example, the Windows-specific compile error in #13437 **cannot** be reproduced and proven fixed on a Linux cloud instance alone. If you have no GPU at all, prefer documentation, pure-Python, or CPU-only issues — this course does not require buying hardware.

## F. Copyable CodeX mission

```text
My target issue is: [URL]. Read the issue and its comments, and extract the
documented reproduction steps and environment requirements. Propose a safe,
minimal execution plan and explain what each command will do before running
anything. Do not install scripts from unknown sources. After execution, save
the actual commands, the complete error output, and version information.
Label the outcome REPRODUCED / NOT REPRODUCED / BLOCKED. "Not reproduced"
must never be reported as "the bug does not exist."
```

Standalone file: [mission-02 prompt](../../prompts/en/mission-02-reproduce-a-bug.md)

## G. Expected deliverable

A completed [minimal reproduction report](../../templates/en/bug-reproduction.md): environment, commit, the minimal code, the exact commands, where the raw log is saved, and the reproduction status.

## H. Acceptance criteria

Someone else reading only your report — never having seen the issue — could run the same experiment on a similar machine. Even a **BLOCKED** result (your environment can't match the issue's requirements) counts as a pass *if* the blocking conditions are recorded precisely. A documented BLOCKED is worth more than an invented PASS.

## I. Common mistakes

- **Reinstalling packages until the error disappears** without recording which variable actually changed. Now nobody, including you, knows what fixed it.
- **Assuming a cloud GPU instance covers every GPU/Windows question** because it ran one workload. One Linux machine proves one Linux machine.
- **Trusting a cached build.** A stale compiled kernel or wheel can make broken code look fixed. Record how you ruled caching out, or say you didn't.

## J. Navigation

[← Previous lesson](./01-find-an-issue.md) · [Lesson index](./README.md) · [Next lesson →](./03-root-cause-analysis.md) · [简体中文版](../zh-CN/02-reproduce-a-bug.md) · [Reproduction report](../../templates/en/bug-reproduction.md) · [Mission 02 prompt](../../prompts/en/mission-02-reproduce-a-bug.md)
