# Mission 08｜Review 反馈闭环

[第 08 课](../../lessons/zh-CN/08-handle-review.md) · [模板：Review 闭环表](../../templates/zh-CN/review-response.md) · [English version](../en/mission-08-handle-review.md)

**任务.** 把 PR 上的每条 Review 评论变成三选一：带证据的已验证修改、基于事实的讨论意见、或明确陈述的待解问题。

**背景.** Review 是协作。评论编码着项目约束；回复必须能追溯到真实 Commit 和真实测试。

**输入.** PR URL 及其公开 Review 线程；仓库惯例。

**约束.**

- 每条评论记录：原链接、维护者的真实要求、工程理由、建议的最小改动、风险与所需回归测试。
- 按规范/设计/测试/格式/澄清分类。不假设 Reviewer 永远正确——建议存在真实权衡时，同时起草礼貌、基于事实的讨论选项。
- 分类并经人类审阅后才改动；每轮保持小步。
- 回复只引用真实 Commit SHA 和真实测试日志，格式：Addressed in `<SHA>` / Change / Verified / Limitations。
- 未经人类批准不发布任何内容。

**步骤.**

1. 读取最新 Review 线程，填写分类表。
2. 与人类逐条确定回应方式（落实 / 讨论 / 澄清）。
3. 小步修改；在新 Commit 上重跑受影响的验证。
4. 起草简洁英文回复；人类审阅、人类发布。

**验证.** 每条评论都能追到 Commit + 验证，或带有明确状态；没有被悄悄遗漏的评论。

**交付.** 完整的 [Review 闭环表](../../templates/zh-CN/review-response.md) + 已发布回复。

**停止条件.** 评论需要人类无法获得的信息（私有日志、凭据）时停下，在线程中如实说明而不是近似代替；回应超出已商定范围时停下——那是新的 Patch Plan 讨论，不是一条回复。
