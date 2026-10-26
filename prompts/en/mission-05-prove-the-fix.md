# Mission 05 — A/B and regression validation

[Lesson 05](../../lessons/en/05-prove-the-fix.md) · [Template: validation matrix](../../templates/en/validation-matrix.md) · [中文版](../zh-CN/mission-05-prove-the-fix.md)

**Mission.** Design and execute a repeatable Baseline (unpatched) vs. Patched comparison, including a regression test, and record every result honestly.

**Context.** "It runs now" is not validation. The evidence must convince a skeptic who can re-run it.

**Inputs.** The patched branch; the baseline commit; the reproducer and real workload from the original issue.

**Constraints.**

- Fix comparable inputs and environment; the only variable is the patch. Record both SHAs.
- Verify first that the baseline reproduces the original error; only then run the patched side and the regression test.
- Mark each item PASS / FAIL / SKIP / NOT RUN / EXPECTED_FAIL; never count SKIP as PASS.
- Address cache and numeric validity: was compilation cache rebuilt/bypassed; are float differences within tolerance?
- State the narrowest supportable conclusion and the untested OS/GPU/precision/workload list.

**Steps.**

1. Design the matrix: baseline reproduction, patched same-input check, new regression test, related existing tests, affected real workload.
2. Execute in that order, saving commands, versions, exit states, and log locations.
3. Fill the [validation matrix](../../templates/en/validation-matrix.md); write the limitations row last.

**Validation.** Baseline shows the original failure; patched passes the same input; the regression test is red on baseline and green on patched (or marked SKIP with reason).

**Deliverables.** A validation matrix with real logs attached.

**Stop conditions.** Stop if the baseline cannot reproduce (fix the environment first — a comparison without a failing baseline proves nothing); stop and report if any result contradicts the fix hypothesis rather than massaging it into PASS.
