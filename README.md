# First PR Playbook — From Your First Issue to Your First Open-Source Contribution

**English | [简体中文](README.zh-CN.md)**

> A beginner-friendly, evidence-driven course for taking one real open-source issue all the way through reproduction, root-cause analysis, a minimal patch, validation, a pull request, code review, and CI.
>
> **10 lessons · 10 verifiable deliverables · 1 complete engineering workflow.**

**New to open source? [Start with a hands-on bug fix, designed for about 15 minutes](labs/first-fix/README.md)** — run a real failing test, apply a minimal fix, and watch it pass. Self-contained and offline-capable: Python only, no GPU, no account, no dependencies.

You do not need to be an expert to contribute to open source. You need one small problem you can understand, reproduce, and verify — and a repeatable way of working that maintainers can trust.

## What this course gives you

Most "how to contribute" tutorials stop at *how to click the PR button*. This course teaches the harder skill that sits underneath: turning a real user problem into a reproducible experiment, using an AI coding assistant without letting it invent results, and submitting a change that reviewers can check, trust, and maintain.

- **[Starter Lab (about 15 minutes)](labs/first-fix/README.md)** — a self-contained red → green bug fix, before any lesson.
- **[Start here](docs/en/start-here.md)** — a 10-minute orientation before Lesson 01.
- **[Git Quickstart](docs/en/git-quickstart.md)** — the minimum local Git you need from Lesson 02 onward.
- **[Lesson index](lessons/en/README.md)** — all ten English lessons.
- **[CodeX missions](prompts/en/README.md)** — copyable AI-assistant task prompts for every lesson.
- **[Templates](templates/README.md)** — fill-in deliverable templates (English and Chinese).
- **[Real case study](case-studies/en/rocm-pr-13437.md)** — the merged ROCm PR that runs through the whole course.

## Who this is for

- Students, career changers, and hobbyists opening a real GitHub project for the first time.
- Developers already using AI coding assistants (CodeX, Claude Code, Copilot, and others) who want quality control around AI-generated changes.
- Engineers interested in GPU/AI stacks who want to learn real reproduction and regression-testing discipline.
- Chinese-speaking developers who prefer learning in Simplified Chinese — every lesson, prompt, and template exists in [简体中文](README.zh-CN.md).

You need: a GitHub account, a computer with a terminal, and any one AI coding assistant (optional — every exercise also works by hand). **A GPU is not required.** For issues that genuinely need one, there is an optional [cloud GPU lab](docs/en/cloud-gpu-lab.md).

## What you will accomplish

By the end of the ten lessons you will have practiced, on a real issue of your own choosing:

finding a suitable issue → reproducing it → finding the root cause → designing a minimal patch → proving the fix → opening a PR → writing a reviewer-friendly description → responding to review → diagnosing CI → closing out and building a portfolio record.

Whether your PR is merged is always the maintainers' decision — this course does not promise otherwise. What you keep either way is a documented, checkable engineering record you can show anyone.

## The 10-lesson learning path

| # | Lesson | The question it answers | Deliverable |
|---|---|---|---|
| 01 | [Find an issue](lessons/en/01-find-an-issue.md) | Which real problem should I start with? | Issue selection card |
| 02 | [Reproduce a bug](lessons/en/02-reproduce-a-bug.md) | How do I prove the problem exists? | Minimal reproducer + environment record |
| 03 | [Root-cause analysis](lessons/en/03-root-cause-analysis.md) | What is actually broken behind the error? | RCA record |
| 04 | [Minimal patch](lessons/en/04-minimal-patch.md) | How few changes solve the problem? | Patch plan + minimal diff |
| 05 | [Prove the fix](lessons/en/05-prove-the-fix.md) | What evidence shows the fix works? | A/B + regression test evidence |
| 06 | [Open your first PR](lessons/en/06-open-first-pr.md) | How do I submit changes upstream safely? | A real PR link |
| 07 | [Write the PR description](lessons/en/07-write-pr-description.md) | How do maintainers review it quickly? | A reviewable PR description |
| 08 | [Handle code review](lessons/en/08-handle-review.md) | How do I respond to feedback? | Review response table |
| 09 | [Debug CI](lessons/en/09-debug-ci.md) | Why is CI red — and whose fault is it? | CI triage record |
| 10 | [Merge and handoff](lessons/en/10-merge-and-handoff.md) | How do I finish professionally? | Open-source contribution portfolio |

Every lesson is readable on its own, and each lesson's output becomes the next lesson's input.

## Quick start (about 15 minutes)

Completely new to this? Warm up with the [Starter Lab](labs/first-fix/README.md) first — a short hands-on bug fix, designed for about 15 minutes — then continue below. The steps below start the full course.

1. Read [Start here](docs/en/start-here.md) and pick an open-source tool you actually use.
2. Open [Lesson 01](lessons/en/01-find-an-issue.md) and search GitHub with `is:issue is:open label:"good first issue"`.
3. Record your candidate in the [issue selection card](templates/en/issue-selection.md).
4. Give the [Mission 01 prompt](prompts/en/mission-01-find-an-issue.md) to your AI assistant — it instructs the assistant to *investigate first, change nothing*.

## The AI coding assistant workflow

This course uses one discipline with every AI assistant, in every lesson: **the human owns the goal and the verdict; the AI helps read, implement, and verify.** Concretely, that means:

1. Understand the user problem before touching code.
2. Reproduce the failure before proposing a fix.
3. Separate verified facts from hypotheses.
4. Make the minimum necessary change.
5. Never present an unexecuted test as PASS.
6. No credentials, tokens, or private paths in logs or examples.
7. The human reviews and answers for everything that gets submitted.

The [CodeX missions](prompts/en/README.md) are written for CodeX but work with any capable assistant. CodeX is the illustrated assistant, not the only supported one.

## A real upstream example: ROCm PR #13437

The course's running example is [ROCm/rocm-libraries PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) — "MIOpen: make HIPRTC kernel includes self-contained without host STL". It started from a Windows user's BatchNorm failure ([MIOpen issue #3956](https://github.com/ROCm/MIOpen/issues/3956)), went through three substantive rounds of maintainer review, and was merged on 2026-10-19. The [case study](case-studies/en/rocm-pr-13437.md) links every claim to the actual GitHub record — including what was *not* validated.

## Optional lab: AMD Radeon Cloud GPU

Some issues genuinely need a GPU. The [cloud GPU lab](docs/en/cloud-gpu-lab.md) explains when a cloud instance helps, how to connect from your laptop, how to check the ROCm/PyTorch environment, and how to record evidence without leaking credentials. One boundary stated up front: **a Linux cloud instance cannot automatically reproduce a Windows-specific issue.**

## How to contribute

This is an educational repository — the best contributions are fixes to accuracy, clarity, and reproducibility of the lessons themselves. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow (small, focused PRs; evidence for claimed results; both languages kept in parity). Please follow the [code of conduct](CODE_OF_CONDUCT.md).

## Boundaries and limitations

- This course is independent community education. It is **not** an official resource of AMD, ROCm, GitHub, or any upstream project, and implies no endorsement.
- Case-study conclusions have explicit platform limits (e.g. Windows 11 / gfx1151). One tested GPU architecture does not cover all GPUs; Linux results do not prove Windows behavior.
- Following the course does not guarantee a merged PR, and AI-generated output is never a substitute for evidence.

## License and attribution

- Original educational prose: [CC BY 4.0](LICENSE-CONTENT.md).
- Original reusable scripts, commands, and Markdown templates: [MIT](LICENSE).
- Third-party code, screenshots, and trademarks remain with their rights holders.

Thanks to the ROCm/MIOpen maintainers whose real review feedback ([PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437)) is the backbone of the case study, and to the original issue reporter.
