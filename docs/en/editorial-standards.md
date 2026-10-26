# Content and Engineering Quality Standards

For contributors improving this course. [简体中文版](../zh-CN/editorial-standards.md)

## Principles

**Beginner-first**: explain every term on first use; problem, then method, then detail.
**One lesson, one goal**: exactly one core skill and one checkable output per lesson.
**Real evidence**: PRs, issues, and reviewer statements carry original links; quotes never lose context.
**Honest scope**: distinguish PASS / FAIL / SKIP / NOT RUN; results on different OS/GPU/precision never substitute for each other.
**Humans own quality**: AI may suggest, analyze, and draft; users review and decide what ships.
**Respect maintainers**: read the contribution rules first; no mass AI PRs, no comment spam, no merge-nagging.

## Per-lesson acceptance checklist

- [ ] Opens with a concrete beginner-felt problem.
- [ ] States exactly what the learner will be able to do.
- [ ] Anchors to a real case (not just a success story).
- [ ] Contains short action steps and one copyable AI prompt.
- [ ] Provides a template-based deliverable.
- [ ] States prerequisites and non-inferable conclusions.
- [ ] Ends with navigation: previous / next / index / other language.

## Markdown and link rules

Use relative links inside the repository; external links must be real public URLs. Example hosts, SSH endpoints, and tokens use obvious placeholders; never demonstrate pasting credentials. Commands state their platform; readers should be able to judge effects before copying.

## Bilingual parity

English and Chinese editions are structural peers: same lessons, same deliverables, same evidence links, same boundaries. Content fixes apply to both locales in the same change. Run `node scripts/validate-docs.mjs` before submitting; it checks file parity, structure, and internal links — semantic translation quality remains a human review duty.
