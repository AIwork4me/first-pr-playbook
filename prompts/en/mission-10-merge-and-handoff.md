# Mission 10 — Merge-oriented closure and portfolio

[Lesson 10](../../lessons/en/10-merge-and-handoff.md) · [Template: portfolio record](../../templates/en/portfolio-handoff.md) · [中文版](../zh-CN/mission-10-merge-and-handoff.md)

**Mission.** Audit the PR's true readiness, draft one polite non-nagging closing note, and build an evidence-complete portfolio record of the whole contribution — with the real GitHub state, whatever it is.

**Context.** Professional closing means maintainers see what's ready and what's at risk, without pressure. The durable asset is the record, merged or not.

**Inputs.** The PR URL; its review threads, checks, and description; the artifacts from Missions 01–09.

**Constraints.**

- Verify current HEAD, description consistency, unresolved substantive comments, and required checks on that HEAD.
- Read the PR's real state from GitHub: open / approved / merged / closed without merge. Never assume an unmerged PR is merged.
- The closing-comment draft stays a draft; the human posts (or doesn't).
- The portfolio records unverified items and the engineering decisions the human made personally; AI assistance is noted, ownership is the point.

**Steps.**

1. Run the readiness audit; list gaps honestly.
2. Draft the two-to-three-paragraph closing note (key change, evidence locations, limitations, any ask).
3. Check and record the PR's actual state and dates.
4. Assemble the [portfolio record](../../templates/en/portfolio-handoff.md): problem, reproduction, RCA, minimal design, validation, review interactions, outcome, limitations, personal decisions.

**Validation.** A third party can verify every portfolio claim from its links; the recorded PR status matches GitHub on the record date.

**Deliverables.** Portfolio record + closing-note draft.

**Stop conditions.** Stop if required checks are still running (report PENDING rather than guessing); if the PR is closed without merge, record the maintainers' reasons and stop — do not draft a reopen or a same-content replacement PR.
