# Contributing

[简体中文](CONTRIBUTING.zh-CN.md)

Thank you for improving this course! This is an educational Markdown repository, so the contributions that matter most are about **accuracy, clarity, and reproducibility**.

## Best-fit contributions

- Fixing a step that doesn't reproduce, with your environment and evidence attached.
- Improving a lesson's acceptance criteria or a beginner explanation that confused you.
- Repairing internal Markdown links, typos, or unsafe example defaults.
- Keeping case-study citations accurate — never widening a test conclusion beyond its evidence.
- Keeping the English and Chinese editions in structural parity (a content fix applies to both locales).

## Workflow

1. Search existing issues/PRs first; open an issue to discuss anything large.
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
