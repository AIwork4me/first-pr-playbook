# Release Validation Report — 2026-10-27 Bilingual Launch

This report records what was actually executed before and after publication. Anything not executed is listed as NOT RUN. Publication status of the remote repository is recorded in section 5; this file never assumes success.

## 1. Local automated validation

Command: `node scripts/validate-docs.mjs` (Node v24.16.0 on Windows/Git Bash; identical script runs in CI on Node 22/ubuntu-latest).

**Result: PASS — 95 Markdown files scanned, 0 failures, 0 warnings.**

Checks actually performed by the script:

| Check | Result |
|---|---|
| UTF-8 decoding of all 95 `.md` files (fatal decoder) | PASS |
| Internal link targets resolve to existing files (fenced code blocks excluded; external http(s)/mailto skipped) | PASS |
| Anchor fragments matched against slugged headings (best-effort) | PASS (no warnings) |
| `lessons/en/` + `lessons/zh-CN/`: exactly the 10 expected filenames each | PASS |
| Every lesson contains sections `## A.`–`## J.` | PASS |
| Every lesson links prev/next lesson, lesson index, and cross-language counterpart | PASS |
| `prompts/en/` + `prompts/zh-CN/`: 10 mission files each with Mission/Context/Inputs/Constraints/Steps/Validation/Deliverables/Stop-conditions sections (localized) | PASS |
| `templates/en/` + `templates/zh-CN/`: identical 9 filenames | PASS |
| `docs/en/` + `docs/zh-CN/`: identical 6 filenames | PASS |
| Case studies + governance + license files present | PASS |
| README.md ↔ README.zh-CN.md language-switch links both present | PASS |

Two script bugs were found and fixed during validation (mission filename construction; non-Markdown file targets like `LICENSE` misreported) — the final run above is post-fix.

### What the script does NOT prove

- Translation semantic quality or EN/ZH equivalence of meaning (human editorial duty — see Pass C).
- External URL reachability (GitHub API verification for case-study evidence was done separately, below).
- Anchor correctness under GitHub's exact slugger for mixed CJK/emoji headings (best-effort only; no such anchors are load-bearing).

## 2. Evidence verification (executed 2026-10-27 via GitHub API, `gh api`)

All case-study claims were verified against live GitHub data — merged status and dates (+317/−21, 7 files, base `develop`, head `AIwork4me/rocm-libraries`), review IDs 5489844163 / 5502061602 / 5551696370, comments 6225886811 / 6225928183, MIOpen issue #3956, TheRock PR #9359, and the RCA evidence repository. Full table with results: [initial audit §3](initial-audit.md) and [case-studies/README.md](../../case-studies/README.md).

One accuracy improvement applied from this verification: review round 1 is now described as a maintainer-run automated first pass (its body says "First pass below is an automated AI review"), which the previous draft implied was hand-written.

NOT RUN: fetching the WeChat tutorial URL (`mp.weixin.qq.com/s/dOAIzJ2qsWPmBSH67q41aA`); it is cited as a reference in the cloud-lab docs, not as evidence of any technical claim.

## 3. Review passes

### Pass A — Beginner experience (completed 2026-10-27)

Read both language editions against the six beginner questions (what first, understandable concepts, safe commands, achievable exercise, verifiable success, findable navigation).

- **Finding A1 (fixed):** "upstream" (README, Lesson 06) and "baseline" (Lesson 05) had no glossary entries. Added both terms to `docs/en/glossary.md` and `docs/zh-CN/glossary.md`.
- **Finding A2 (verified OK):** every command block that a reader might copy either uses explicit placeholders (`<YOUR_USER>`, `<BASE_BRANCH>`, `<PORT>`) or is safe as-is; the placeholder convention is stated where first used (Lesson 06, cloud lab).
- **Finding A3 (verified OK):** each lesson's acceptance criteria are checkable without maintainer feedback; BLOCKED/NOT RUN outcomes are explicitly acceptable.
- Post-change validation re-run: PASS.

### Pass B — Senior engineering review (completed 2026-10-27)

- Git workflow (Lesson 06): `git switch -c fix/<topic> upstream/<BASE_BRANCH>` + `git push -u origin` sequence verified correct for fork-based contribution; wrong-base and `git add .` failure modes explicitly taught.
- CI semantics (Lesson 09): `action_required` vs `failed` vs pre-existing base failure distinctions match how the #13437 CI events actually unfolded (API-verified).
- Test-claim discipline: every PASS/NOT RUN statement in the course materials refers to the upstream case (linked) or to learner exercises; no unverified claim of local execution is made anywhere in the course content.
- Security: `.gitignore` excludes private artifacts; PR template requires a diff check for secrets; no credential examples anywhere (grep for token patterns in examples: only obvious placeholders).
- Workflow hygiene: `docs-quality.yml` uses `permissions: contents: read`, pinned major action versions, no downloads of third-party scripts.
- **Finding B1 (limitation, accepted):** the validation script cannot check semantic translation quality — recorded in CONTRIBUTING and editorial standards as a human duty.

### Pass C — Native-language editorial review (completed 2026-10-27)

- English editions were drafted natively (not machine-translated from the Chinese), with consistent terminology: reproducer, root cause, minimal patch, validation matrix, review round, triage.
- Chinese editions preserve the original native prose (v0.1) with structure upgrades; new Chinese sections match the original register and terminology (验证矩阵, 最小复现, 根因, 闭环表).
- Cross-language terminology mapping spot-checked across lessons, glossaries, and templates — consistent.
- **Limitation (recorded):** these passes were performed by an AI assistant at the direction of the repository owner. They are structured, evidence-linked reviews, but a human native-speaker pass of both editions remains a recommended follow-up, especially for readers' first impressions of the READMEs.

## 4. Delivery inventory (as validated locally)

- 95 Markdown files total.
- Lessons: 10 EN + 10 ZH (+2 locale indexes).
- CodeX missions: 10 EN + 10 ZH (+2 indexes).
- Templates: 9 EN + 9 ZH (+1 bilingual index).
- Case studies: 1 EN + 1 ZH + 1 evidence index.
- Learner docs: 6 EN + 6 ZH. Maintainer docs: 4 (audit, this report, publication plan, publish runbook).
- Governance: README.md + README.zh-CN.md, AGENTS.md, CONTRIBUTING ×2, CODE_OF_CONDUCT ×2, SECURITY ×2, CHANGELOG, ROADMAP, LICENSE, LICENSE-CONTENT.md, .gitignore, PR template, issue template, docs-quality.yml, validate-docs.mjs.

## 5. Publication record

Filled in during/after the publish step; see section 7.

## 6. Unresolved limitations

1. Semantic translation quality unproven by automation; AI-run editorial pass recorded instead of a human one (recommended follow-up).
2. External link reachability is not part of CI (rate limits); case-study evidence links were API-verified once on 2026-10-27.
3. GitHub anchor slugger is approximated; anchors in headings are warned, not failed.
4. The WeChat serialization URL is unverified (reference only).
