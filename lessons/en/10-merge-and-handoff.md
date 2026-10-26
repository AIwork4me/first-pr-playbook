# Lesson 10 — The last mile: merge, handoff, and what you keep

> **This lesson solves exactly one problem: how do I finish professionally, whatever the outcome?**
> Time: 30–60 minutes · Prerequisite: CI results and review records from [Lesson 09](./09-debug-ci.md) · Deliverable: a [contribution portfolio record](../../templates/en/portfolio-handoff.md)

## A. The problem

Reviews addressed, CI green — so now you post "please merge" every day? No. **Professional closing means the maintainer can see at a glance what's ready, what's still at risk, and what's left to do** — without pressure from you. And if the PR is *never* merged, you still walk away with the thing of lasting value: a documented engineering record.

## B. The Aha moment

**"Merged" is an outcome. The repeatable engineering evidence and collaboration record are the capability you keep building either way.**

## C. One concept: the four PR states

- **Open** — waiting; your job is responsiveness, not nagging.
- **Approved** — reviewers accept it; CI or release timing may still gate the merge.
- **Merged** — upstream accepted the change; it is now maintained by them.
- **Closed without merge** — not accepted (this time). Read the maintainer's explanation before doing anything; a same-content reopened PR is usually wrong.

Each state is a legitimate place for your portfolio record to stop. Only one is "Merged" — and reporting any other state as merged would be falsifying your own record.

## D. Real-world evidence

On 2026-10-16 the maintainer of [PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) approved it: ["LGTM, thanks! Will merge once CI is green."](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5551696370) The author then posted a factual [status comment](https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225886811) — seven major workflows green on a named HEAD — and waited. The PR merged **2026-10-19**; the next day the change rode into the TheRock integration ([#9359](https://github.com/ROCm/TheRock/pull/9359), merged 2026-10-20). Note the boundary taught in the [case study](../../case-studies/en/rocm-pr-13437.md): "merged into the development branch" does **not** mean every downstream release immediately contains the fix.

## E. Step-by-step exercise

**1. Run a final state audit.** Any unresolved substantive review comments? Is the PR description consistent with the final patch? Are required checks complete on the *current* HEAD (not an older one)? Anything you promised and didn't deliver?

**2. Write a short closing note** — two or three paragraphs: the key change, where the evidence lives, known limitations, and what (if anything) you need from maintainers. If you have nothing new to add, don't post "any update?" — maintainers merge when their release process allows.

**3. Record the outcome accurately.** Copy the PR's final state and dates into your portfolio record. If closed without merge, record the maintainer's reasons — that's free senior engineering feedback.

**4. Build the portfolio entry.** In your personal repository, collect: the issue, the PR, key logs, and the decisions **you personally made** (AI assistance is fine to note; ownership is the point). In an interview, "I directed an AI assistant through RCA, forced a baseline-fails/patch-passes comparison, and handled three review rounds" is a far stronger story than "I used AI tools."

## F. Copyable CodeX mission

```text
Perform a merge-oriented closure audit of my PR: verify current HEAD, PR
description consistency, open review threads, required CI states, test scope,
and unverified claims. Draft one polite, non-nagging closing comment for the
maintainers — do not post it. Then check the PR's real GitHub state (open /
approved / merged / closed-without-merge) and assemble my portfolio record:
user problem, reproduction, RCA, minimal design, validation, review
interactions, final status, open limitations, and the engineering decisions I
made personally. Never assume an unmerged PR has been merged.
```

Standalone file: [mission-10 prompt](../../prompts/en/mission-10-merge-and-handoff.md)

## G. Expected deliverable

A completed [portfolio record](../../templates/en/portfolio-handoff.md): real issue/PR links, checkable evidence, review interactions, your personal decisions, and the accurate final status.

## H. Acceptance criteria

A third party (a reviewer of *you* — hiring or otherwise) can verify every claim in the record from its links, and the PR status in the record matches GitHub today. Whether or not it merged, you have completed one full, honest engineering loop — that was the goal of this course.

## I. Common mistakes

- **Posting merge reminders on a cadence.** Noise doesn't accelerate release processes; it just costs goodwill.
- **Recording "merged" from memory or hope.** Check the page; write the date.
- **Ending the record at the PR URL.** The durable asset is the narrative: problem → evidence → decision → outcome.

## Course complete — what now?

You've walked the full path: **Issue → Reproduce → RCA → Minimal Patch → Validation → PR → Description → Review → CI → Handoff.** Keep your ten artifacts in your own repository; the next challenge is simply a harder issue. You didn't need to master everything first — you needed one real problem, evidence discipline, and respect for the people who maintain the code. Now you have all three.

## J. Navigation

[← Previous lesson](./09-debug-ci.md) · [Lesson index](./README.md) · [Course map](../../docs/en/course-map.md) · [简体中文版](../zh-CN/10-merge-and-handoff.md) · [Portfolio record](../../templates/en/portfolio-handoff.md) · [Mission 10 prompt](../../prompts/en/mission-10-merge-and-handoff.md)
