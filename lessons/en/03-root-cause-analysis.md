# Lesson 03 — The program crashed. How do I find the *real* cause with AI?

> **This lesson solves exactly one problem: how do I get from an error message to a root cause I can defend?**
> Time: 45–75 minutes · Prerequisite: the logs from [Lesson 02](./02-reproduce-a-bug.md) · Deliverable: [RCA record](../../templates/en/rca.md)

## A. The problem

You now have a stable, minimal reproduction and a full error log. There's a seductive line in that log — a Python function call that failed — and an obvious move: wrap it in `try/except` or "fix" it right there. **Don't.** The line that reports an error is usually where the consequence *surfaced*, not where the cause *lives*. Fixing at the symptom produces patches that hide bugs instead of solving them.

## B. The Aha moment

**Debugging is not "finding the broken line" — it's eliminating wrong explanations until only defensible ones remain.**

## C. One concept: hypotheses you can disprove

Root-cause analysis (RCA) works like science, not like guessing. You write down at least two competing explanations — H1, H2 — and design the *cheapest experiment that would disprove each one*. Change one variable at a time. A hypothesis that survives its disproof experiment and explains the original error becomes your root-cause candidate; anything else goes in the "unverified" pile.

This is where AI assistants help most and mislead most: they generate plausible hypotheses fast, but only *you*, running experiments, can promote a hypothesis to a fact.

## D. Real-world evidence

The [PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) story started as "YOLO training misbehaves" — but the fix never touched YOLO. The investigation walked down the stack:

```text
YOLO (application)
   ↓
PyTorch (framework)
   ↓
MIOpen (AMD compute library)
   ↓
HIPRTC (GPU runtime compilation)
```

The decisive evidence came from the bottom: HIPRTC could not find host C++ standard-library headers like `<type_traits>`. MIOpen's kernel compilation failed there, and the upper layers merely *reported* it as `miopenStatusUnknownError`. Note the boundary: this is what the investigation found **in that specific software environment**. It does not mean every BatchNorm error has this cause. Full chain in the [case study](../../case-studies/en/rocm-pr-13437.md).

## E. Step-by-step exercise

**1. Split your log into facts and guesses.** "The log says `type_traits` not found" is a fact. "The GPU driver is broken" is a guess until an experiment supports it. Write the two lists separately — this one habit prevents most bad RCAs.

**2. Draw the call chain.** From the entry point down to the module that actually failed, following function calls, compile logs, or stack frames. Mark where the information gets *more specific* — that's usually the layer worth investigating.

**3. Design distinguishing experiments for at least two hypotheses.** Example: H1 "the build environment is missing a header path" vs. H2 "the input data is malformed". Ask: what minimal change would prove H1 wrong? Run that. One variable per experiment.

**4. Keep the evidence table current.** After each experiment, mark each hypothesis CONFIRMED, REJECTED, or UNKNOWN with a pointer to the log that justifies the mark. An AI's confident tone is not evidence and cannot update this table.

## F. Copyable CodeX mission

```text
Here is my minimal reproducer, environment, and complete error log: [link or
paste]. Layer the call chain and separate observed facts from inferences.
Propose at least two refutable root-cause hypotheses. For each hypothesis,
define the minimal experiment, its expected result, and how the outcome would
confirm or reject it. After I run the experiments, update the evidence table.
Do not modify source code and do not declare a root cause until evidence
supports it.
```

Standalone file: [mission-03 prompt](../../prompts/en/mission-03-root-cause-analysis.md)

## G. Expected deliverable

A completed [RCA record](../../templates/en/rca.md): surface symptom, minimal reproducer link, verified call chain, the hypothesis table with experiment results, the confirmed root cause — and an honest list of what remains unverified.

## H. Acceptance criteria

Answer this question about your own RCA: **"If my root cause is right, which single experiment would convince a skeptical reviewer?"** If you have that experiment and its result, you pass. If you don't, keep investigating — do not open a PR on the strength of a plausible-sounding explanation.

## I. Common mistakes

- **Upgrading every dependency because an AI said "probably a version conflict."** That's acting on an untested hypothesis, and it destroys your known-good baseline.
- **Patching the upper layer to hide the failure** — catching the exception, skipping the feature. The lower-level fault survives and will resurface.
- **Collecting ten guesses and zero experiments.** Hypotheses only count when something could have disproven them.

## J. Navigation

[← Previous lesson](./02-reproduce-a-bug.md) · [Lesson index](./README.md) · [Next lesson →](./04-minimal-patch.md) · [简体中文版](../zh-CN/03-root-cause-analysis.md) · [RCA template](../../templates/en/rca.md) · [Mission 03 prompt](../../prompts/en/mission-03-root-cause-analysis.md)
