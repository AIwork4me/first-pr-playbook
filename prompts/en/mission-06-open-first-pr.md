# Mission 06 — Git and PR safety preparation

[Lesson 06](../../lessons/en/06-open-first-pr.md) · [中文版](../zh-CN/mission-06-open-first-pr.md)

**Mission.** Prepare the first pull request correctly — right base branch, clean branch, audited staged changes — while every public write action stays under the human's explicit control.

**Context.** First PRs fail on mechanics: wrong base, junk files, leaked credentials. The assistant checks and explains; the human executes.

**Inputs.** The local repository with the verified fix; the upstream repository's contribution guide.

**Constraints.**

- Verify the upstream's required base branch and PR conventions before anything else.
- Audit `git remote -v`, current branch, `git status`, staged diff, and any large files / secret-looking content.
- Present the ordered command list (fork → clone → branch → commit → push → PR) with each command's effect and rollback.
- No branch creation, commit, push, PR, or comment executes without item-by-item human confirmation.
- `Files changed` must match the patch plan exactly — no logs, models, or credentials.

**Steps.**

1. Check contribution guide + base branch; report conflicts with the current setup.
2. Inspect remotes/branch/status/diff; list risks of pushing to the wrong repo or leaking secrets.
3. Walk the human through the commands as they execute them manually.
4. After the PR opens, verify base/head correctness and audit Files changed.

**Validation.** A real PR URL; base = upstream target branch, head = the human's fix branch; Files changed matches plan; no secrets.

**Deliverables.** The opened PR link (or a fully prepared local state with a written blocker report).

**Stop conditions.** Stop if the human's permissions can't complete any step, if the upstream requires an agreement the human hasn't signed, or if the staged diff contains anything unexplained — resolve before proceeding.
