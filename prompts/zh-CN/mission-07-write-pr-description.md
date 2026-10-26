# Mission 07｜可审查的 PR 描述

[第 07 课](../../lessons/zh-CN/07-write-pr-description.md) · [模板：PR 描述](../../templates/zh-CN/pr-description.md) · [English version](../en/mission-07-write-pr-description.md)

**任务.** 只依据真实证据，起草简明、准确的英文 PR 描述；上游有模板则遵循——先交人类审阅，再发布。

**背景.** 描述决定维护者能否高效审阅。编造的断言毁掉信用；缺失的证据浪费维护者时间。

**输入.** Issue、RCA、Patch Plan、真实测试日志与验证矩阵、上游 PR 模板（如有）。

**约束.**

- 只使用提供的证据。每个技术结论都要指向日志或代码位置。
- 证据缺失处写 NOT RUN 或 Unknown——绝不发明 PASS、性能提升或通用兼容性。
- 上游有 PR 模板则遵循；否则用：Motivation / Reproduction / Root cause / Changes / Validation / Limitations / Related evidence。
- 输出是草稿；助手不向 GitHub 发布任何内容。

**步骤.**

1. 概述用户问题并链接 Issue。
2. 陈述根因、其证据与仍不确定的部分。
3. 逐文件描述改动；论证最小范围。
4. 用真实矩阵填验证表；最后写限制。
5. 把草稿交给人类；反复修改，直到未参与者能回答四个审阅问题。

**验证.** 没参与修复的人约 2 分钟能回答：为什么修、改了什么、怎么验证、还剩什么风险。

**交付.** PR 描述草稿（或已应用到真实 PR 的描述）。

**停止条件.** 若必需的证据（基线日志、回归测试结果）尚不存在，停下——描述无法诚实地完成；返回 Mission 05，而不是掩盖缺口。
