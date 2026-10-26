# Mission 03 — Root cause analysis

[Lesson 03](../../lessons/en/03-root-cause-analysis.md) · [Template: RCA record](../../templates/en/rca.md) · [中文版](../zh-CN/mission-03-root-cause-analysis.md)

**Mission.** Separate the verified root cause of the reproduced failure from hypotheses, using refutable experiments — without changing source code.

**Context.** The error line is usually where a failure surfaces, not where it lives. The assistant structures the investigation; experiments run on the human's recorded environment.

**Inputs.** The verified reproducer, its logs, and the environment record from Mission 02.

**Constraints.**

- Classify every statement as observed fact or inference, explicitly.
- Propose at least two refutable hypotheses (H1, H2, …) before any conclusion.
- One variable per experiment; each hypothesis gets its minimal distinguishing experiment with expected outcome.
- No source modifications and no "root cause confirmed" statement until evidence explains the original error.

**Steps.**

1. Layer the call chain from entry point to the deepest failing module, marking where information becomes more specific.
2. Draft the hypothesis table with distinguishing experiments for human execution.
3. As results arrive, mark each hypothesis CONFIRMED / REJECTED / UNKNOWN with a log pointer.
4. State the confirmed root cause, the unverified remainder, and why patching at the symptom would be wrong.

**Validation.** The root-cause conclusion explains the original error signature, and at least one experiment result would have come out differently under a competing hypothesis.

**Deliverables.** Completed [RCA record](../../templates/en/rca.md) with the evidence table.

**Stop conditions.** Stop and report UNKNOWN honestly if experiments cannot distinguish the hypotheses; do not let the assistant's confidence substitute for evidence, and do not proceed to patching without a defensible root cause.
