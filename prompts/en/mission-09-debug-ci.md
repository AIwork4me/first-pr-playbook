# Mission 09 — CI root-cause triage

[Lesson 09](../../lessons/en/09-debug-ci.md) · [Template: CI triage record](../../templates/en/ci-triage.md) · [中文版](../zh-CN/mission-09-debug-ci.md)

**Mission.** Attribute every abnormal CI job on the PR to the correct category — code / format / test / permission / infrastructure / pre-existing / unknown — from logs and comparisons, not from the red icon.

**Context.** Red CI means "a failure that needs explaining." Wrong attribution wastes maintainer time; right attribution earns trust.

**Inputs.** The PR URL and current HEAD SHA; access to the Checks tab and logs; optionally the base branch.

**Constraints.**

- Read the failing step's log; quote the first meaningful error line; save the run URL.
- Statuses mean different things: `failed`, `action_required`, `cancelled`, `pending`. `action_required` is a permission gate, never a test failure.
- Pre-existing claims require a comparable base-branch (or maintainer-cited) run as evidence.
- One minimal recommended action per job; re-runs and comments are the human's decisions.
- Never describe an unfinished workflow as green.

**Steps.**

1. Enumerate all abnormal jobs at current HEAD with URLs.
2. For each: failing step, key log lines, comparable-run evidence, category, minimal next action.
3. Where local reproduction is possible (format checks), reproduce with the repo's pinned tooling.
4. Fill the [CI triage record](../../templates/en/ci-triage.md) and propose the human's next actions.

**Validation.** At least one abnormal job explained end-to-end with evidence; category claims all carry their supporting log or comparison.

**Deliverables.** An evidence-backed CI triage record.

**Stop conditions.** Stop at UNKNOWN when the logs can't distinguish categories — record what was checked. Do not re-run jobs repeatedly without a hypothesis, and never treat "passed on retry" as proof the root cause is fixed.
