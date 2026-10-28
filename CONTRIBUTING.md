# Contributing

[简体中文](CONTRIBUTING.zh-CN.md)

Thank you for improving this course! This is an educational Markdown repository, so the contributions that matter most are about **accuracy, clarity, and reproducibility**.

## Best-fit contributions

- Fixing a step that doesn't reproduce, with your environment and evidence attached.
- Improving a lesson's acceptance criteria or a beginner explanation that confused you.
- Repairing internal Markdown links, typos, or unsafe example defaults.
- Keeping case-study citations accurate — never widening a test conclusion beyond its evidence.
- Keeping the English and Chinese editions in structural parity (a content fix applies to both locales).

## Issue Reporter First: invite, support, recognize

**Our default:** When a reported problem is actionable and suitable for a focused PR, maintainers should **invite the original issue reporter to contribute the fix first**. Reporting a problem is already a valuable contribution; writing a PR is **always optional**. An invitation is not a promise of exclusive ownership, review timing, or merge.

### What maintainers do

1. **Acknowledge and verify.** Thank the reporter, review their steps and evidence, request only the missing details needed to reproduce, and check for duplicates, related PRs, or a fix already on the default branch.
2. **Offer a meaningful first opportunity.** If work is still needed, explain a small, concrete scope and acceptance criteria, then ask: *"Would you like to take the first pass at a PR? No pressure — we can help you get started."* Do not assign work without agreement.
3. **Help the contributor succeed.** Point to the relevant files, conventions, tests, and this guide; provide constructive review and explain the reasoning behind requested changes. The reporter may begin in English or Chinese; coordinate bilingual updates so language is not a barrier.
4. **Avoid duplicate or unnecessary work.** If the core issue is already fixed, link the fixing commit/PR and explain what remains. Invite the reporter to improve remaining details only if they are genuinely useful; never ask them to redo a merged fix.
5. **Keep the project moving fairly.** If the reporter declines, cannot take it on, does not respond within a reasonable period, or an urgent/security-sensitive issue requires action, maintainers may fix it or invite other contributors. Coordinate with any existing assignee or PR author; do not indefinitely reserve issues or displace work already underway.
6. **Close the loop with credit.** Link the validating PR/commit when resolving an issue, recognize the issue reporter and the PR contributor for their respective work, and explain any decision not to merge. Apply the same evidence, safety, and quality standards to every PR.

### If you reported an issue

You are welcome to stop at the issue report — **you do not owe us a PR**. If you would like to help implement the solution, reply in the issue thread so we can agree on scope and avoid duplicate efforts. A maintainer can offer guidance, but a contribution still goes through the normal tests and review, and merge is never guaranteed. For vulnerabilities or private information, follow [SECURITY.md](SECURITY.md) rather than posting sensitive details in a public issue.

## Workflow

1. Search existing issues/PRs first; coordinate in the issue thread before working on someone else's report, and discuss anything large before coding.
2. Fork, then create a topic branch for one focused change.
3. Change only the files your problem requires; don't rewrite multiple lessons at once.
4. Check the lesson indexes, previous/next navigation, and cross-language links around your change; keep example prerequisites and sanitization intact.
5. Run `node scripts/validate-docs.mjs` and include the result in your PR.
6. Describe your PR with Problem / Change / Validation / Scope (the [PR template](.github/PULL_REQUEST_TEMPLATE.md) guides you).

Please follow the [code of conduct](CODE_OF_CONDUCT.md).

## Do not submit

Other people's private code, real access tokens, SSH private keys, unlicensed images, unverified AI-generated conclusions, or mass-produced PRs.

## Licensing

Original prose is CC BY 4.0; original code, commands, and templates are MIT — see [LICENSE](LICENSE) and [LICENSE-CONTENT.md](LICENSE-CONTENT.md). By contributing original content you agree it is licensed the same way.
