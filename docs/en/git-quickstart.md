# Git Quickstart — The Minimum Git You Need Before Lesson 02

**[简体中文版](../zh-CN/git-quickstart.md)**

> **Position in the course:** after [Lesson 01](../../lessons/en/01-find-an-issue.md), before [Lesson 02](../../lessons/en/02-reproduce-a-bug.md) · Time: about 20 minutes · Prerequisite: [Git installed](https://git-scm.com/downloads) · **No GitHub login, SSH key, or account access is needed for anything on this page.**

## Why this page exists

From Lesson 02 onward, the course asks you to get a project's code onto your machine, run it at a known state, and record exactly what changed. That means using Git — but the full fork → push → pull-request workflow is only taught in [Lesson 06](../../lessons/en/06-open-first-pr.md). This page covers the small, local slice of Git you need *now*, so Lessons 02–05 never surprise you.

The good news: **everything on this page happens on your own computer.** You cannot break any public project with it.

## The four ideas

- **Git** — a version-control program that records snapshots ("commits") of a folder's files, so any change can be inspected, compared, and undone.
- **Repository ("repo")** — a folder whose history Git records. The copy on your computer is just as much a repository as the one on GitHub.
- **Clone** — a local copy of a remote repository, downloaded with its full history. `git clone` on a public repository needs no account and no login.
- **Branch** — a named, independent line of changes inside a repository. Working on your own branch is what keeps your experiments separate from everyone else's work.

## A five-minute sandbox: make your own repository

You will break nothing here — this repository is yours alone. Run the commands for your system (Windows: PowerShell; macOS: Terminal; Linux: any shell). Git commands are identical on all three; only `cd` spelling differs.

```bash
# 1. Create a practice folder and turn it into a Git repository
cd ~                    # Windows PowerShell: cd ~ works too
mkdir git-practice
cd git-practice         # then: git init
git init
```

```text
Initialized empty Git repository in .../git-practice/.git/
```

> **If `mkdir` reports the folder already exists**: do not `cd` into it — an existing `git-practice` may hold someone's real files. Choose a fresh name (e.g. `git-practice-2`) and use that name in every command below. The failed `mkdir` created nothing, so nothing was harmed — just continue with the new name.

```bash
# 2. Create a file: use ANY text editor (Notepad, VS Code, TextEdit, gedit)
#    to save a file named notes.txt in the git-practice folder, containing:
#    "my first note"
git status
```

```text
Untracked files:
  notes.txt
```

`git status` is your "where am I?" command — run it whenever you feel lost. It currently says Git sees a new file that is not yet recorded.

```bash
# 3. Record a first snapshot (a "commit")
git add notes.txt
git commit -m "add first note"
```

> **If `git commit` says "Please tell me who you are"**: Git wants a name and email to stamp on every commit, and none is configured yet. Set them *for this sandbox only* (no global settings are touched, nothing is published):
>
> ```bash
> git config user.name "Your Name"
> git config user.email "you@example.com"
> ```
>
> Then rerun the `git commit` line. You only do this once per repository. On Windows you may also see a warning like `LF will be replaced by CRLF` — that is Git normalizing line endings; harmless here, ignore it.

```bash
# 4. Make a change and inspect it BEFORE recording it
#    (edit notes.txt in your editor: append a second line "my second note")
git diff
```

```diff
+my second note
```

`git diff` shows line-by-line what changed since the last commit. Reading this output — not trusting memory or an AI summary — is the habit Lessons 04 and 05 are built on. Once you have read it, record the change exactly as before:

```bash
git add notes.txt
git commit -m "add second note"
```

```bash
# 5. Now try branches — the point of this whole page
git switch -c experiment/new-note      # create and move to a new branch
# (edit notes.txt again: append "experimental line")
git add notes.txt                      # record the change on THIS branch
git commit -m "add experimental line"
git status                             # shows: On branch experiment/new-note
git branch                             # lists your branches; * marks the current one
git switch -                           # return to the branch you were on before
                                       # (works whatever the default is named)
```

`git switch -` (a single dash) takes you back to the branch you were on *before* the current one — in this sequence, the default branch your `git init` created, whether Git named it `main` or `master`. No name to look up, nothing to guess. The `git branch` line above still lists every branch and marks the current one with `*` — use it whenever you genuinely need a name. (Older Git: `git checkout -` does the same.)

Open `notes.txt` after switching back: your "experimental line" is gone — not deleted, just stored safely on the other branch (this works because you *committed* it there first; uncommitted edits travel with you between branches). Switch again with `git switch experiment/new-note` and it reappears. **That is the mental model: a branch is a desk you can walk away from, and the file on disk always reflects the branch you are standing on.**

### Cleaning up the sandbox (optional — and how to delete safely)

You never *have* to delete anything: the sandbox is one tiny folder, and keeping it costs nothing. Real open-source work will ask you to run delete commands eventually, so this is the safe pattern to learn now — **inspect first, delete second, and only ever name a folder you just listed**:

```bash
cd ~                    # go to your home folder
pwd                     # double-check where you are: prints your home path
ls -A git-practice      # INSPECT: must show only notes.txt and .git
                        # (-A includes hidden entries like .git)
rm -r git-practice      # only now delete (macOS / Linux)
```

PowerShell equivalent, same inspect-first rule:

```powershell
cd ~
pwd
dir git-practice -Force   # INSPECT: must show only notes.txt and .git
                          # (-Force includes hidden entries like .git)
Remove-Item -Recurse -Force git-practice
```

- If the inspect step shows **anything you don't recognize** — extra files, other folders — **stop**. That folder is not this sandbox, and deleting it was never part of the exercise.
- Prefer visual certainty? Delete the folder in File Explorer / Finder — you see exactly what disappears.
- Never run a delete command — including these — against a folder you haven't listed first. `rm -r` and `Remove-Item -Recurse` remove *everything inside* the named folder.

## Reading a real repository safely

These commands only *look* — none of them modify anything:

```bash
git clone https://github.com/<OWNER>/<REPO>.git   # anonymous, no login, public repos
cd <REPO>
git remote -v        # WHERE this copy came from / would send changes to
git branch -a        # every branch, local and on the remote
git status           # what branch you are on; what is modified
git diff             # unstaged changes, line by line
git diff --stat      # same, as a one-line-per-file summary
```

`git remote -v` prints one or two named URLs, usually:

```text
origin   https://github.com/<OWNER>/<REPO>.git (fetch)
origin   https://github.com/<OWNER>/<REPO>.git (push)
```

`origin` simply means "the copy I cloned from." In [Lesson 06](../../lessons/en/06-open-first-pr.md) you will meet `upstream` — a second remote pointing at the official project — but nothing on this page needs it.

## Before you edit code for a real issue

When Lesson 02 sends you into a real project, follow this order **before changing any file**:

1. **Clone the project** (the command above) — not "download ZIP": the history is part of the evidence you will record.
2. **Read `CONTRIBUTING.md`** at the repository root (if present). It states the target branch for pull requests, commit style, and anything else maintainers expect. **Do not assume the default branch is `main`** — for example, the case study of this course, [ROCm PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437), targeted the `develop` branch. `git branch -a` shows which branches actually exist.
3. **Create your working branch first, then edit:**

```bash
git switch -c investigate/issue-<NUMBER>     # e.g. investigate/issue-3956
# ...now edit files, run tests, take notes...
git status        # anytime: confirm you are still on YOUR branch
```

Naming the branch after the issue keeps your work self-explanatory. Creating the branch *before* editing means every later step — diffs in Lesson 04, commit comparisons in Lesson 05, the PR in Lesson 06 — has a clean, isolated home. Lesson 06 will pick up exactly this branch; you will not be asked to move your work anywhere.

## How to avoid editing the wrong branch

- **Run `git status` before you start each session.** It answers "which branch am I on?" in one line. Make it a reflex, like checking a mirror before changing lanes.
- **Commit early, commit small.** Uncommitted changes travel with you when you switch branches — a frequent way beginners accidentally mix work. Small, frequent commits keep each branch's story clean.
- **Treat the default branch (`main`/`master`/`develop`) as the lobby, not your desk.** Do your work on your own branch; on the default branch, only ever *read* code.

## Why the upstream repository is not a practice playground

Everything you did on this page lives on your machine. The public project cannot see your branches, your commits, or your sandbox — until Lesson 06, where *you* deliberately propose a change through a pull request. Three rules follow from that:

1. **Never open "test" or "hello world" PRs on a busy upstream repository** to practice the workflow. Maintainers' review time is a shared resource; rehearse in your own sandbox instead (like the one above).
2. **Don't commit experiments to the default branch** even locally — it is where you synchronize with the project, and mixing in private edits creates confusing diffs later.
3. **Pushing is a later, deliberate step.** Nothing in Lessons 02–05 requires a GitHub login or write access anywhere. If a tutorial tells you to push before you understand what changed, stop and re-read your `git diff`.

## Command cheat sheet

| Command | What it does | Modifies anything? |
|---|---|---|
| `git clone <URL>` | Downloads a repository copy with full history | Only creates a local folder |
| `git status` | Shows current branch + pending changes | No (read-only) |
| `git diff` / `git diff --stat` | Shows changes line by line / per file | No (read-only) |
| `git switch -c <name>` | Creates and switches to a new branch | Local only |
| `git switch <name>` | Moves between existing branches | Local only |
| `git branch` | Lists local branches; `*` marks the current one | No (read-only) |
| `git switch -` | Returns to the previously checked-out branch — no name needed | Local only |
| `git add <file>` | Stages a change for the next commit | Local only |
| `git commit -m "message"` | Records a snapshot | Local only |
| `git remote -v` | Lists the URLs this copy talks to | No (read-only) |
| `git branch -a` | Lists all branches, including remote ones | No (read-only) |

`git switch` needs Git 2.23+ (2019) — check with `git --version`. On older Git, `git checkout -b <name>` creates a branch, `git checkout <name>` switches, and `git checkout -` returns to the previous branch.

## Windows / macOS / Linux differences

| Topic | Windows (PowerShell) | macOS / Linux |
|---|---|---|
| Git commands | Identical everywhere | Identical everywhere |
| Folder paths | `cd labs\first-fix` (backslash; PowerShell also accepts `/`) | `cd labs/first-fix` |
| Home folder | `cd ~` | `cd ~` |
| Default editor | Notepad preinstalled | TextEdit (macOS) / gedit or any editor |
| Deleting the sandbox | Optional — follow the inspect-first steps in **Cleaning up the sandbox** above; never paste a delete command you haven't read | Identical on all platforms |

This course never assumes Bash-only syntax works in PowerShell — wherever a command differs between systems, the lessons show both.

## What you deliberately did NOT need

No GitHub login, no SSH keys, no fork, no push, no pull request. Cloning a public repository is anonymous. Everything that touches the public world arrives, explained, in [Lesson 06](../../lessons/en/06-open-first-pr.md).

---

[← Lesson 01](../../lessons/en/01-find-an-issue.md) · [Start here](start-here.md) · [Next: Lesson 02 →](../../lessons/en/02-reproduce-a-bug.md) · [简体中文版](../zh-CN/git-quickstart.md)
