# Lesson 05 — The AI says it's fixed. How do you prove it?

> **This lesson solves exactly one problem: what evidence shows the fix actually works?**
> Time: 45–90 minutes · Prerequisite: the minimal patch from [Lesson 04](./04-minimal-patch.md) · Deliverable: [validation matrix](../../templates/en/validation-matrix.md)

## A. The problem

"Tests passed!" is the phrase AI assistants love to report. But if the test never exercised the original bug, or a compiler quietly reused a cached build, that sentence is worthless — and if you repeat it in a PR, reviewers will (rightly) distrust everything else you wrote. Real verification is designed so that **a skeptic can re-run it**.

## B. The Aha moment

**The unpatched code must fail and the patched code must pass — under identical conditions — and you need logs for both.**

## C. One concept: baseline vs. patched, and honest test states

Two concepts carry this lesson:

- **A/B comparison.** "Baseline" is the unpatched code at a recorded commit; "patched" is your fix at another recorded commit. Everything else — input, environment, versions — stays fixed. The *only* variable that changes is the patch.
- **Test states that don't lie.** PASS means an assertion you defined ran and held. FAIL means it ran and broke. SKIP means a precondition was missing, and **SKIP is not PASS**. NOT RUN means you never executed it. EXPECTED_FAIL means a negative control failed *on purpose* (like the baseline hitting the original bug).

## D. Real-world evidence

[PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) did not merely show "no error after the fix". Under identical test conditions, the **unpatched** code reproduced the original `type_traits` missing-file signature, and the patched code passed. The new no-STL regression test first verifies the host STL is genuinely unreachable in the test environment, and changes compilation parameters so a **stale GPU kernel cache** cannot fake a pass. On the final HEAD, the author's recorded validation on Windows 11 / Radeon 8060S (gfx1151) covered the HIPRTC regression test, BatchNorm forward/backward numerical checks, kthvalue 27/27, and one epoch of YOLO26n COCO8 training **in FP32**. Explicitly *not* claimed: AMP training success, and coverage of every Windows AMD GPU. Details: [case study](../../case-studies/en/rocm-pr-13437.md) and the author's [CI evidence comment](https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225886811).

## E. Step-by-step exercise

**1. Set up baseline and patched runs.** Pin the input, environment, and dependency versions. Record both commit SHAs. If possible, one run right after the other on the same machine.

**2. Write the red–green regression test.** On the *unpatched* code the test must fail with the exact error you predicted (that's "red"). On the patched code it must pass its assertions ("green"). If the test's preconditions are absent in your environment, mark it SKIP with the reason — never invent a pass.

**3. Check that nothing else regressed.** Run the project's existing test suite for the areas your patch touches, then run the real workload from the original issue once. GPU tests you can't run locally may fit the optional [cloud lab](../../docs/en/cloud-gpu-lab.md) — record OS/architecture/version limits either way.

**4. Rule out cache and numeric traps.** If your fix touches compiled kernels or floating-point behavior, state explicitly: was the cache rebuilt or bypassed, could old results have been reused, and are output differences within a reasonable tolerance?

## F. Copyable CodeX mission

```text
Design and execute a validation matrix for my patch: (1) baseline reproduction
of the original error on the unpatched commit, (2) the same input on the
patched commit, (3) the new regression test, (4) related existing tests, and
(5) the affected real workload. Record every command, environment, version,
commit SHA, exit status, and where the log is saved. Mark each result
PASS / FAIL / SKIP / NOT RUN / EXPECTED_FAIL — never count SKIP as PASS.
List the OSes, GPUs, precisions, and workloads that were NOT validated, and
state the narrowest conclusion the evidence supports.
```

Standalone file: [mission-05 prompt](../../prompts/en/mission-05-prove-the-fix.md)

## G. Expected deliverable

A completed [validation matrix](../../templates/en/validation-matrix.md): one reproducible baseline, one checkable patched result, one regression guard — each with real command output attached.

## H. Acceptance criteria

Your matrix answers all three: **Can I rerun the baseline failure? Can I rerun the fixed behavior? Does the regression test protect it?** Any cell you couldn't execute says exactly why. An honest NOT RUN beats an invented PASS every time.

## I. Common mistakes

- **Treating "it ran once without crashing" as regression validation.** One success is an anecdote; a matrix is evidence.
- **Declaring a Windows issue fixed because Linux passed.** Platform results don't transfer in either direction.
- **Confusing EXPECTED_FAIL (negative control failing on purpose) with FAIL (your fix breaking something).** They mean opposite things.

## J. Navigation

[← Previous lesson](./04-minimal-patch.md) · [Lesson index](./README.md) · [Next lesson →](./06-open-first-pr.md) · [简体中文版](../zh-CN/05-prove-the-fix.md) · [Validation matrix](../../templates/en/validation-matrix.md) · [Mission 05 prompt](../../prompts/en/mission-05-prove-the-fix.md)
