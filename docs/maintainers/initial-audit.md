# Initial Audit — first-pr-playbook

> Audit date: 2026-10-27 (UTC). Author: repository maintainer assistant, acting on the owner's instruction to convert this project into an English-first bilingual repository and publish it to `AIwork4me/first-pr-playbook`.
>
> Everything in this report was actually checked on the date above. Where something was *not* checked, it is listed as NOT RUN. Nothing here asserts that upstream CI, GPU validation, or publication passed; publication had not started when this audit was written.

## 1. Environment detection (verified by execution)

| Item | Result |
|---|---|
| OS | Windows 10.0.26200 x64, Git Bash (MINGW64) |
| Git | git version 2.56.0.windows.2 |
| GitHub CLI | gh 2.92.0, authenticated as `AIwork4me` (keyring; token scopes: `gist`, `read:org`, `repo`, `workflow`) |
| Node.js | v24.16.0 |
| Python | 3.13.13 |
| Local VCS state | Directory is **not** a git repository (no `.git`); clean init path, no history to preserve |
| Remote `AIwork4me/first-pr-playbook` | Does **not exist** (verified via `gh repo view` → "Could not resolve to a Repository"), so creating it will not overwrite anything |

## 2. Actual file inventory (verified by `find`)

40 Markdown files total — not the "approximately 41" from the mission briefing, and the layout differs from the briefing's assumptions:

| Area | Files | Language today |
|---|---|---|
| Root | `README.md`, `README.en.md`, `AGENTS.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `LICENSE.md`, `ROADMAP.md`, `SECURITY.md` (9) | Mixed: `README.md`, CoC, CONTRIBUTING, SECURITY, ROADMAP in Chinese; `README.en.md`, AGENTS, CHANGELOG in English |
| `lessons/` | 10 lessons `01-find-an-issue.md` … `10-merge-and-handoff.md` | Chinese |
| `prompts/` | `codex-missions.md` (single file, 10 missions + master instruction) | Chinese |
| `templates/` | `README.md` + 9 templates (issue-selection, bug-reproduction, rca, patch-plan, validation-matrix, pr-description, review-response, ci-triage, portfolio-handoff) | Mostly Chinese field labels |
| `case-studies/` | `rocm-pr-13437.md` | Chinese |
| `docs/` | `00-start-here.md`, `cloud-gpu-lab.md`, `course-map.md`, `editorial-standards.md`, `faq.md`, `glossary.md`, `publication-plan.md`, `publish-to-github.md` (8) | Chinese |
| `.github/` | `ISSUE_TEMPLATE/lesson-feedback.md`, `PULL_REQUEST_TEMPLATE.md` | Mixed |

No images, scripts, or workflow files exist. There is no CI today.

## 3. Evidence verification (executed against the GitHub API on 2026-10-27)

All primary case-study claims were checked against live GitHub data — every one matched:

| Claim in existing content | Verified fact |
|---|---|
| ROCm/rocm-libraries PR #13437 merged 2026-10-19 | `merged: true`, `merged_at: 2026-10-19T09:27:09Z`, title "MIOpen: make HIPRTC kernel includes self-contained without host STL", base `develop`, head `AIwork4me/rocm-libraries` |
| Final size 7 files, +317/−21 | `changed_files: 7`, `additions: 317`, `deletions: 21` |
| MIOpen issue #3956 is the user problem | Exists, closed, "Running BatchNorm2D causes miopenStatusUnknownError", created 2026-04-22 |
| TheRock #9359 integration merged 2026-10-20 | `merged: true`, `merged_at: 2026-10-20T23:15:52Z`, "Bump rocm-libraries from cb26189 to d875648" |
| Evidence repository exists | `AIwork4me/Ultralytics-Windows-ROCm-Training-RCA` is public |
| Review round 1 (review id 5489844163) | Exists, by `averinevg`, 2026-10-12. Body says "First pass below is an automated AI review." Inline comments confirm: copyright-holder correction (AMD work → AMD 2-line copyright), remove comments that only make sense with the author's external evidence repo, use existing gtest infrastructure instead of a standalone test |
| Review round 2 (review id 5502061602) | Exists, 2026-10-13. Inline comments confirm: merge freestanding headers into existing headers, drop `HIP < 7` support, simplify the test to a trivial inline kernel |
| Review round 3 approval (review id 5551696370) | Exists, `state: APPROVED`, 2026-10-16, "LGTM, thanks! Will merge once CI is green." |
| CI evidence comment (6225886811) | Exists, by `AIwork4me`, 2026-10-16, reports seven major CI workflows green on `d4b574ac` |
| Human-responsibility comment (6225928183) | Exists, by `AIwork4me`, 2026-10-16 |

Accuracy note for the rewrite: round 1 was explicitly labeled by the maintainer as an automated first pass. The bilingual case study should describe it as "maintainer-run automated first-pass review" rather than implying hand-written prose. The existing Chinese text's *substance* (copyright, existing tests, comment hygiene) matches the inline comments.

## 4. Gaps against the mission's target architecture

1. **Not bilingual.** Zero complete English pages beyond the short `README.en.md` overview. All lessons, prompts, templates, docs, and the case study are Chinese-only.
2. **Wrong default-language architecture.** Chinese `README.md` is the landing page; the mission requires English-first with `README.zh-CN.md` as the Chinese counterpart.
3. **No locale directories.** `lessons/`, `prompts/`, `templates/`, `case-studies/`, `docs/` lack `en/` + `zh-CN/` splits, so there is no parity to check and no cross-language navigation.
4. **Prompts are monolithic.** One `codex-missions.md` instead of one copyable file per mission per language with Mission/Context/Inputs/Constraints/Steps/Validation/Deliverables/Stop-conditions structure.
5. **Lesson structure is close but incomplete.** Lessons already contain problem, aha, real-evidence, steps, CodeX prompt, acceptance, mistakes, and prev/next navigation. Missing or implicit: a dedicated "one concept" section, an explicit deliverable statement, cross-language links, and template links in the footer.
6. **Licensing files non-standard.** A single `LICENSE.md` mixes CC BY 4.0 prose notice with the MIT text. Mission layout expects `LICENSE` (MIT) + `LICENSE-CONTENT.md` (content license), with unambiguous scope.
7. **Governance files are single-language** (CONTRIBUTING, CoC, SECURITY, ROADMAP) and need English versions with Chinese counterparts preserved.
8. **No quality gates.** No `.github/workflows/`, no validation script, no local check command.
9. **Navigation rot risk.** All internal links use the old flat layout (`../templates/...`, `../docs/...`); every one changes during migration and must be re-validated.
10. **Maintainer docs mixed with learner docs.** `publication-plan.md` (WeChat serialization) and `publish-to-github.md` (this repo's own publishing runbook) belong under `docs/maintainers/`, not in the learner path.

## 5. Strengths to preserve (verified by reading every file)

- The 10-lesson sequence is pedagogically sound: one skill per lesson, each output feeds the next lesson, honest boundaries throughout (no merge guarantees, SKIP ≠ PASS, Linux ≠ Windows).
- The case study is unusually rigorous: dates, SHAs, review links, and explicit "not claimed" lists already match upstream records (verified in §3).
- The master CodeX instruction embeds the ten responsible-AI-engineering principles the mission requires.
- Templates are already evidence-first (validation matrix with PASS/FAIL/SKIP/NOT RUN, review-loop table with real-SHA replies).
- AGENTS.md house rules (no fabricated PASS, preserve case-study links, smallest changes) align with the mission and will be kept.

## 6. Working plan (non-destructive)

1. Preserve all original content: existing Chinese text migrates to `zh-CN/` paths with adjusted links; nothing is deleted before its replacement exists.
2. Build the English layer first (README, lessons, prompts, templates, case study, docs), then complete the Chinese counterparts, then governance pairs.
3. Add `scripts/validate-docs.mjs` (zero-dependency Node) and `.github/workflows/docs-quality.yml`; run the local validation and record real output in `docs/maintainers/release-validation.md`.
4. Three review passes (beginner experience, senior engineering, native-language editorial), each recorded with findings and fixes.
5. Only after local gates pass: `git init` on `main`, single launch commit, `gh repo create … --push`, set description + topics, verify remote rendering and CI, then report G01–G17 status honestly.

## 7. Items NOT checked / out of scope

- External URL reachability beyond the GitHub API checks above (the WeChat tutorial link `https://mp.weixin.qq.com/s/dOAIzJ2qsWPmBSH67q41aA` was not fetched; it is cited as-is in existing content and kept as a reference).
- No GPU, build, or runtime testing — this is a Markdown-only project; none applies.
- Translation *semantic* quality cannot be proven by script; it is covered by the human-style editorial pass and recorded as a limitation.
