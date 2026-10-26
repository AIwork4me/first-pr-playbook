# Course Map — Ten Steps Through One Complete PR

| # | Input | Learning action | Checkable output | Fall back to |
|---|---|---|---|---|
| 01 | Project interest + GitHub account | Choose a real issue | [Selection card](../../templates/en/issue-selection.md) | Pick a smaller/unclaimed problem |
| 02 | Target issue | Reproduce and record the environment | [Reproduction report](../../templates/en/bug-reproduction.md) | Re-check versions, deps, steps |
| 03 | Reproduction logs | Design hypotheses and experiments | [RCA](../../templates/en/rca.md) | Update the minimal reproducer; avoid speculation |
| 04 | Verified cause | Design the minimal patch | [Patch plan](../../templates/en/patch-plan.md) | Return to RCA |
| 05 | Change + baseline | Comparison and regression tests | [Validation matrix](../../templates/en/validation-matrix.md) | Fix tests/code; reopen RCA if needed |
| 06 | Full change + evidence | Fork/Branch/Commit/Push/PR | PR URL | Rehearse in your own repo first |
| 07 | PR + test evidence | Write the context/scope clearly | [PR description](../../templates/en/pr-description.md) | Supply missing evidence |
| 08 | Reviewer comments | Classify / change / reply | [Review table](../../templates/en/review-response.md) | Return to 04/05 to validate new changes |
| 09 | CI checks and logs | Find the real failure cause | [CI triage](../../templates/en/ci-triage.md) | Identify environment/permission/code issues |
| 10 | Review + CI + status | Close out, deliver, debrief | [Portfolio](../../templates/en/portfolio-handoff.md) | Even without merge, an honest retrospective |

## What "completing the course" means

Not a green badge on every lesson — a **reviewable piece of evidence** from each. Every output answers: what I did, how, what resulted, and what remains unverified.

## How the serialization differs from the course

Each lesson stands alone for sharing; serialized articles add a recap header and links to earlier articles, and never copy the previous nine into the tenth. See the maintainer notes for details. [简体中文版](../zh-CN/course-map.md)
