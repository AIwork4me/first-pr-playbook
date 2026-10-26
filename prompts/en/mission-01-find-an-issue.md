# Mission 01 — Find an issue

[Lesson 01](../../lessons/en/01-find-an-issue.md) · [Template: issue selection card](../../templates/en/issue-selection.md) · [中文版](../zh-CN/mission-01-find-an-issue.md)

**Mission.** Identify three real, beginner-suitable issues in one target repository and select one primary target plus one backup — without modifying anything.

**Context.** This is a first open-source contribution. The assistant acts as a research teammate; the human makes all selections and contacts.

**Inputs.** `[GITHUB_REPO_URL]` — a repository from software the human actually uses.

**Constraints.**

- Read-only: no file modifications, no commits, no posts.
- Every issue cited must be verifiable on GitHub by URL; never rely on recalled issue numbers.
- Respect the repository's CONTRIBUTING.md and any claims/assignment process.

**Steps.**

1. Read the repository's README, CONTRIBUTING.md, and open issues.
2. Propose three candidate issues. For each: URL; what the user expected vs. what happened; environment needed to reproduce; knowledge required; whether someone already works on it; what to ask maintainers first.
3. Rank the candidates: recommend the clearest, smallest-scope issue as primary, one as backup, with the reasoning stated as evidence.

**Validation.** Each issue URL opens on GitHub; expected/actual behavior matches the issue text; no duplicate PR or claimer found on a quick check.

**Deliverables.** A completed [issue selection card](../../templates/en/issue-selection.md) for the primary issue (optionally the backup).

**Stop conditions.** Stop and report if: the repository's CONTRIBUTING.md forbids drive-by contributions; all candidate issues lack enough detail to verify; or required environments (e.g. specific GPUs) are unavailable to the human — then propose an alternative repository instead.
