# CodeX Missions — English

**[简体中文版](../zh-CN/README.md)**

Ten copyable task prompts, one per [lesson](../../lessons/en/README.md). Written for CodeX; the method works with any capable AI coding assistant. Each mission is a self-contained file:

| # | Mission | Lesson | Deliverable |
|---|---|---|---|
| 01 | [Find an issue](mission-01-find-an-issue.md) | [01](../../lessons/en/01-find-an-issue.md) | Issue selection card |
| 02 | [Build a minimal reproducer](mission-02-reproduce-a-bug.md) | [02](../../lessons/en/02-reproduce-a-bug.md) | Reproduction report |
| 03 | [Root cause analysis](mission-03-root-cause-analysis.md) | [03](../../lessons/en/03-root-cause-analysis.md) | RCA record |
| 04 | [Minimal patch plan](mission-04-minimal-patch.md) | [04](../../lessons/en/04-minimal-patch.md) | Patch plan + diff |
| 05 | [A/B and regression validation](mission-05-prove-the-fix.md) | [05](../../lessons/en/05-prove-the-fix.md) | Validation matrix |
| 06 | [Git and PR safety prep](mission-06-open-first-pr.md) | [06](../../lessons/en/06-open-first-pr.md) | Real PR URL |
| 07 | [Reviewable PR description](mission-07-write-pr-description.md) | [07](../../lessons/en/07-write-pr-description.md) | PR description draft |
| 08 | [Review response loop](mission-08-handle-review.md) | [08](../../lessons/en/08-handle-review.md) | Review response table |
| 09 | [CI triage](mission-09-debug-ci.md) | [09](../../lessons/en/09-debug-ci.md) | CI triage record |
| 10 | [Merge-oriented closure](mission-10-merge-and-handoff.md) | [10](../../lessons/en/10-merge-and-handoff.md) | Portfolio record |

## Master instruction — paste this first in every new session

```text
You are my open-source engineering teammate, not an auto-submit PR bot.
Goal: deliver a minimal, reproducible, reviewable fix for one real,
participable GitHub issue.
Rules:
1. Read the upstream README, CONTRIBUTING.md, AGENTS.md, code conventions,
   and the latest issue/PR discussion before proposing anything.
2. Separate "verified from source/logs" from "hypothesis awaiting a test"
   in every conclusion you state.
3. Never invent command output, test results, timestamps, commit SHAs,
   reviewer statements, or CI status.
4. State OS, GPU, dependency versions, and commit for every environment
   and result. Linux does not substitute for Windows.
5. Keep changes to the minimal scope of the issue; no unrelated refactoring.
6. Explain side effects before any command that rewrites the environment,
   deletes data, or touches external accounts.
7. Creating branches/commits, pushing, opening PRs, or posting public
   comments requires my explicit review, item by item.
8. End each stage with: goal of this stage, what was actually done,
   evidence, limitations, next step.
9. Never record secrets, private keys, access tokens, or private files
   into any public repository.
10. Teach me the principles in clear English; when I need GitHub-facing
    English text, draft concise English for my review.
```

## How to use a mission

1. Paste the master instruction above into a fresh assistant session.
2. Open the mission file for your current lesson, replace the `[PLACEHOLDERS]`, and paste it.
3. Work the mission with the assistant; keep your deliverable template open and fill it as evidence arrives.

The ten AI-engineering principles behind every mission: understand before changing, reproduce before fixing, separate hypothesis from fact, minimal changes, respect upstream conventions, never invent results, state environment limits, never expose credentials, no spam contributions, the human stays accountable.
