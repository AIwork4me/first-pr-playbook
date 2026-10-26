# Lesson 06 — Your first pull request: fork, branch, commit, push

> **This lesson solves exactly one problem: how do I submit my change for upstream review without breaking anything?**
> Time: 45–75 minutes · Prerequisite: the patch and evidence from [Lesson 05](./05-prove-the-fix.md) · Deliverable: a real, openable PR URL

## A. The problem

You have a verified fix on your machine — and no idea how GitHub's fork/branch/commit/push machinery turns that into something a maintainer can review. It clicks once you see it as one idea: **you work in your own copy, then invite the official project to look.**

## B. The Aha moment

**Opening a PR never modifies the official project. It *proposes* a change and requests review.**

## C. One concept: the contribution pipeline

Six words, in order — each defined here once:

- **Fork** — your personal copy of the repository, under your GitHub account.
- **Clone** — download your fork to your computer.
- **Branch** — a named line of development inside the repo, so your fix is isolated from everything else.
- **Commit** — a saved snapshot of related changes, with a message explaining them.
- **Push** — upload your branch from your computer to your fork on GitHub.
- **Pull request (PR)** — the request for maintainers to review your branch and, if they accept it, merge it into the official code.

In [PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437), the head branch lived in the fork `AIwork4me/rocm-libraries` and the base was `ROCm/rocm-libraries`'s `develop` branch — exactly this pipeline, at full scale.

## D. Real-world evidence

Every repository has its own rules about which branch to target. The #13437 PR targeted `develop`, not `main`, because that is where ROCm accumulates changes before release. The [repository's contribution rules](https://github.com/ROCm/rocm-libraries/blob/develop/CONTRIBUTING.md) (and every project's `CONTRIBUTING.md`) state the target branch, commit style, and any required issue linkage. Reading that file first is the difference between a PR that gets reviewed and one that gets closed in a minute.

## E. Step-by-step exercise

**1. Read the target repository's contribution rules.** Note the required base branch, commit message style, and whether an issue must be linked first. If the repository provides a PR template, you will use it in Lesson 07.

**2. Fork on GitHub, then clone your fork** and wire up the official repo as `upstream`:

```bash
git clone https://github.com/<YOUR_USER>/<REPO>.git
cd <REPO>
git remote add upstream https://github.com/<UPSTREAM_OWNER>/<REPO>.git
git fetch upstream
# replace <BASE_BRANCH> with the repository's actual target branch, e.g. main or develop
git switch -c fix/<short-topic> upstream/<BASE_BRANCH>
```

**3. Bring your verified fix into the branch.** Review before staging — stage only the files your patch plan covers:

```bash
git status
git diff
git add <CHANGED_FILE_1> <CHANGED_FILE_2>
git commit -m "fix: describe the specific problem"
git push -u origin fix/<short-topic>
```

**4. Open the PR on GitHub.** On your fork's branch page, click **Compare & pull request**. Check two things before anything else: the **base** is the upstream's correct branch, and the **head** is your fix branch. A PR accidentally based against your own fork reviews no one. If your evidence is still being assembled, open a **Draft PR** where the project supports it.

**5. Audit the Files changed tab.** It must contain exactly your planned scope — no experiment logs, no credentials or cloud instance details, no unrelated edits.

## F. Copyable CodeX mission

```text
Help me prepare my first pull request, but execute no public write action.
Check the target repository's contribution guide and the correct base branch,
then review my local git remotes, current branch, status, staged changes, and
diff. Explain fork, upstream, origin, commit, and PR in one line each. List
the exact commands you propose, what each does, and how to roll it back.
Flag separately anything that could push to the wrong repository or leak
credentials. I will confirm each step before it runs.
```

Standalone file: [mission-06 prompt](../../prompts/en/mission-06-open-first-pr.md)

## G. Expected deliverable

A PR URL anyone can open, with correct base and head, a Files changed tab matching your patch plan, meaningful commits, and your validation evidence ready to paste (Lesson 07 polishes the description).

## H. Acceptance criteria

1. The PR URL opens (logged-out view works if the repo is public).
2. Base = upstream's intended branch; head = your fix branch.
3. Files changed contains *only* planned changes.
4. No secrets or private data in the diff or description.

Opening a PR means *requesting* review — it implies no approval and no merge.

## I. Common mistakes

- **Targeting the wrong base branch**, which turns your small fix into a giant accidental diff of everything between branches.
- **`git add .` from the repo root**, sweeping in logs, model files, `.env` files, and cloud credentials.
- **Opening practice PRs on busy upstream repos** to "test the workflow." Rehearse in your own sandbox repository first, then contribute for real.

## J. Navigation

[← Previous lesson](./05-prove-the-fix.md) · [Lesson index](./README.md) · [Next lesson →](./07-write-pr-description.md) · [简体中文版](../zh-CN/06-open-first-pr.md) · [PR description template](../../templates/en/pr-description.md) · [Mission 06 prompt](../../prompts/en/mission-06-open-first-pr.md)
