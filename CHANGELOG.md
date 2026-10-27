# Changelog

## Unreleased — P0 beginner onboarding hardening

- Added a Starter Lab designed for about 15 minutes (`labs/first-fix/`, English + Chinese): a self-contained red → green exercise — run a real failing `unittest` case, apply a minimal fix to `normalize_title()`, rerun the same tests to green. Python standard library only; no GPU, account, network, or dependencies. Acquired via GitHub's Code → Download ZIP — no Git knowledge or account needed.
- Lab safety design: the intentionally buggy `buggy.py` baseline is validated, not "fixed"; the test file is named `run_tests.py` so pytest / `unittest discover` patterns never auto-discover the intentional failure; `verify_lab.py` proves in a temp directory that the baseline fails with exactly the expected assertion, the reference solution passes the same tests, and corrupted states are rejected (`--self-test`).
- Added `docs/en/git-quickstart.md` + `docs/zh-CN/git-quickstart.md`: local Git (repo/clone/branch, `status`, `diff`, `remote -v`, branch-before-editing, why upstream is not a playground) positioned between Lesson 01 and Lesson 02, cross-platform (Windows PowerShell / macOS / Linux), no GitHub login required.
- Integrated onboarding into navigation: both READMEs gained a first-screen beginner entry; start-here pages show the new sequence (Lab → 01 → Git Quickstart → 02–05 → 06); Lessons 01/02/04/05/06 gained short prerequisite links; Lesson 06 now continues from the Git-Quickstart working branch (Option A) instead of assuming a fresh fork clone; course map and lesson indexes updated.
- Extended `scripts/validate-docs.mjs` with lab structure/parity checks and git-quickstart parity; extended the Docs Quality workflow with a starter-lab job (`python labs/first-fix/verify_lab.py --self-test`) on ubuntu/windows/macos.
- Review hardening (beginner-safety pass): Git Quickstart no longer assumes the default branch is `master` (`git branch` discovery works with `main` or `master`); the Starter Lab explains Code → Download ZIP acquisition (no Git or account needed); sandbox cleanup now follows an inspect-first, never-blind-delete pattern; beginner-success and completion-time claims qualified as design goals rather than guarantees, in both languages.

## 2026-10-27 — English-first bilingual release

- Made English the default language: new English `README.md` landing page; the previous Chinese README moved to `README.zh-CN.md` with language navigation in both.
- Restructured content into locale directories: `lessons/en/` + `lessons/zh-CN/` (10 lessons each), `prompts/en/` + `prompts/zh-CN/` (one file per mission per language plus indexes), `templates/en/` + `templates/zh-CN/`, `case-studies/en/` + `case-studies/zh-CN/`, `docs/en/` + `docs/zh-CN/` + `docs/maintainers/`.
- Wrote complete English lessons (not placeholders) and upgraded both language editions to a consistent lesson structure: problem → aha → concept → real-world evidence → exercise → CodeX mission → deliverable → acceptance criteria → common mistakes → navigation with cross-language links.
- Added a bilingual evidence index for the ROCm PR #13437 case study; every factual claim re-verified against the GitHub API on 2026-10-27.
- Split licensing into `LICENSE` (MIT, for original code/commands/templates) and `LICENSE-CONTENT.md` (CC BY 4.0, for original prose); removed the combined `LICENSE.md`.
- Added `scripts/validate-docs.mjs` (zero-dependency Markdown/link/parity checks) and `.github/workflows/docs-quality.yml`.
- Added English editions of CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, ROADMAP, issue and PR templates, keeping Chinese counterparts.

## 2026-10-26 — Documentation-first initial draft

- Created the ten-lesson Chinese First PR Playbook with one problem, one method and one verifiable deliverable per lesson.
- Added the ROCm PR #13437 evidence-based case study and cloud GPU environment-matching guidance.
- Added CodeX missions, reproducibility and contribution templates, editorial/publication guidelines, and beginner-friendly navigation.

> The 2026-10-26 entry documents local content creation; the remote GitHub repository did not exist yet at that point. Remote publication status for this release is recorded in `docs/maintainers/release-validation.md`, not inferred here.
