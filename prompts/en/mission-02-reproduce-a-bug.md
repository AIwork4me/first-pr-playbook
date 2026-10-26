# Mission 02 — Build a minimal reproducer

[Lesson 02](../../lessons/en/02-reproduce-a-bug.md) · [Template: reproduction report](../../templates/en/bug-reproduction.md) · [中文版](../zh-CN/mission-02-reproduce-a-bug.md)

**Mission.** Reproduce the selected issue in a recorded environment and shrink it to a minimal, stable reproducer — or produce an honest NOT REPRODUCED / BLOCKED record.

**Context.** The failure must be shown to exist before anyone fixes it. The assistant plans; the human approves each execution.

**Inputs.** `[ISSUE_URL]` and its documented steps; the human's machine (OS, versions, hardware).

**Constraints.**

- Run the original, unmodified code and matching versions first.
- Explain each command's effect before execution; no installs from untrusted sources; keep the system environment clean (venvo/container where supported).
- Record OS, dependencies, GPU/driver (if applicable), commit SHA, full commands, and complete error output.
- Re-test after every reduction step; never drop a triggering condition just to shorten.

**Steps.**

1. Extract the issue's reproducible steps and environment requirements into a short, safe execution plan for human review.
2. Execute the original steps; capture full logs.
3. Reduce step by step, re-running after each cut, keeping the same error signature.
4. Repeat runs to confirm stability; note caches and seeds where relevant.
5. Label the outcome REPRODUCED / NOT REPRODUCED / BLOCKED.

**Validation.** Same error signature after reduction; a second run reproduces; environment identity recorded next to the log.

**Deliverables.** Reproducer script + real log + completed [reproduction report](../../templates/en/bug-reproduction.md).

**Stop conditions.** Stop and mark BLOCKED if the required environment (OS, GPU, driver, credentials) is unavailable — record exactly what is missing. Never report "not reproduced" as "bug does not exist"; never change dependency versions to force a failure.
