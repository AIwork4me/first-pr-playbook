# AGENTS.md — Instructions for AI Coding Assistants

This repository is an educational Markdown course. **Accuracy, beginner readability and linked evidence take precedence over volume.**

1. Never claim a PR, CI check or GPU validation passed unless supported by a public source or an actual execution log. Distinguish PASS, FAIL, SKIP and NOT RUN.
2. Never infer that Linux ROCm results prove Windows compatibility or that one GPU architecture covers all GPUs.
3. Keep one problem, one skill and one verifiable deliverable per lesson. Avoid long detours and generic motivational filler.
4. Reuse existing Markdown templates and relative links. The repository is English-first and bilingual: keep `en/` and `zh-CN/` counterparts in structural parity. When editing a lesson, check previous/next navigation, the cross-language link, README index and templates.
5. Respect upstream contributing rules, copyright and maintainer time. Do not encourage AI-generated spam PRs.
6. Do not execute destructive shell commands or submit/push/comment on GitHub without human review.
7. User credentials, SSH private keys, cloud tokens, private paths and logs must not be copied into examples.
8. Preserve the primary case-study links: ROCm/rocm-libraries#13437, ROCm/MIOpen#3956, TheRock#9359 and the evidence repository. Refer to actual reviewer feedback, not imagined quotes.
9. Prefer smallest necessary changes. PR description should include scope, exact changes, validation and limitations.
10. Before claiming done, run `node scripts/validate-docs.mjs`, and check Markdown links, all 10 English and 10 Chinese lesson files, templates and documentation consistency. Report any items not verified.
