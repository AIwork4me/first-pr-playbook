# FAQ

**Q: Can I contribute to international open source without knowing C++?** Yes. Start with documentation, reproduction examples, test cases, or simple Python fixes in software you use. Documentation changes still follow the project's rules.

**Q: Must I use CodeX?** No. The missions work with any AI coding assistant, or by hand. You always own understanding, review, verification, and submission.

**Q: Do I need a GPU?** No. Only GPU-related issues might need one. If you use a cloud GPU, first confirm the issue's OS, GPU architecture, and dependency versions match. See the [cloud GPU lab](cloud-gpu-lab.md).

**Q: Why can't I reproduce the bug?** Check software versions, OS, inputs, precision, GPU model, caches, and whether the failing code path actually executed. Record "not reproduced" honestly — never invent a failure.

**Q: Can one PR fix five issues?** Not recommended for beginners. One independently explainable, independently testable fix per PR reviews much faster.

**Q: Nobody answered my issue comment — may I just open a PR?** Check the contribution guide and duplicate PRs first. Discuss designs before implementing if the change is complex; small unambiguous fixes can usually follow the project's conventions directly. Don't ping repeatedly.

**Q: I disagree with a review comment. Now what?** Argue with facts: reasons, trade-offs, and verification evidence, politely. Don't comply blindly for a green checkmark, and don't treat disagreement as personal conflict.

**Q: Red CI means my code is wrong?** Not necessarily. Determine whether the failure is source code, tests, infrastructure, permissions, or a pre-existing base failure — with evidence. See [Lesson 09](../../lessons/en/09-debug-ci.md).

**Q: Will following this course get my PR merged?** No guarantee. Merging is the maintainers' decision. Even unmerged, a disciplined record of issue/RCA/PR/review remains valuable proof of ability.

[简体中文版](../zh-CN/faq.md)
