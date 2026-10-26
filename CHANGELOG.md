# Changelog

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
