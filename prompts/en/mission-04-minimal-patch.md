# Mission 04 — Minimal patch plan

[Lesson 04](../../lessons/en/04-minimal-patch.md) · [Template: patch plan](../../templates/en/patch-plan.md) · [中文版](../zh-CN/mission-04-minimal-patch.md)

**Mission.** Design the minimal-necessary patch for the confirmed root cause — plan first, code only after human approval, and keep the diff minimal.

**Context.** Reviewers price every extra line in maintenance cost. The assistant proposes; the human approves scope before any code exists.

**Inputs.** The confirmed RCA with evidence; the target repository's conventions and existing tests.

**Constraints.**

- Study existing implementations of similar fixes first; reuse the project's conventions and test framework.
- Compare at least two fix options (scope, compatibility, maintenance cost, regression risk) and recommend the minimal necessary change.
- An explicit non-goals list travels with the plan.
- After coding: present `git diff --stat` and the per-file diff; flag and revert anything unrelated to the root cause.
- No pushing, no PR.

**Steps.**

1. Survey how the repository solves this class of problem (patterns, tests, naming).
2. Draft the per-file patch plan + non-goals; wait for human review.
3. Implement after approval, on a branch.
4. Walk the human through the diff hunk by hunk until they can restate every change.

**Validation.** Every diff hunk answers "which part of the root cause requires this?"; the planned regression test exists and runs.

**Deliverables.** Completed [patch plan](../../templates/en/patch-plan.md) + minimal working diff.

**Stop conditions.** Stop if the root cause turns out weaker than believed (return to Mission 03); stop if the minimal fix would require a design the project explicitly rejects in its guidelines — summarize the conflict for the human instead of improvising.
