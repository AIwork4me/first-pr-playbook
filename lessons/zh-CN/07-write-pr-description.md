# 07｜如何写 PR 描述，让国际开源维护者愿意 Review？

> **本课只解决一个问题：怎样写一份可审查的 PR 描述？**
> 预计 30–60 分钟｜前置：[第 06 课](06-open-first-pr.md)的 PR + [第 05 课](05-prove-the-fix.md)的证据｜成果：按 [PR 模板](../../templates/zh-CN/pr-description.md)完成的描述

## A. 问题

你开了 PR，正文只有一句「Fixed bug, please merge」。现在维护者得自己猜：用户遇到了什么？改动安全吗？证据在哪？——然后才决定要不要为你花一个小时。**好的 PR 描述是对维护者时间的尊重**，也是你能做的、提升 PR 命中率成本最低的事。

## B. Aha 时刻

**PR 描述不是叙述「我做了什么」，而是回答「你凭什么相信这份修改」。**

## C. 一个概念：审阅路径

Reviewer 的阅读顺序是固定的：*问题为什么存在 → 它真实存在的证明在哪 → 具体改了什么 → 什么证明修复有效 → 还有什么没测*。按这个顺序组织描述，维护者就能边读边验证，而不是反向破译。英文简明即可；准确胜过辞藻。

## D. 真实案例

已合并的 [ROCm #13437](https://github.com/ROCm/rocm-libraries/pull/13437) 描述包含 Motivation、Root cause、Minimal implementation、Regression test、Validation、Scope、Related issue 与 Review updates——读者不离开页面，就能从用户问题走到具体修改再到实验证据。审阅期间作者持续更新描述并补充证据评论（如 [CI 状态评论](https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225886811)），让晚到的维护者也能自助理解这个 PR。

## E. 跟着做：用六个问题写正文

1. **Motivation / Why**：谁遇到了什么问题？给 Issue 链接和关键报错。
2. **Reproduce**：什么 OS、版本、输入条件下可复现？最小命令是什么？
3. **Root cause**：依据什么日志与实验定位？哪个部分仍是假设？
4. **Changes**：改了哪些文件？为什么这是最小必要范围？
5. **Validation**：用小表格列出环境、测试、PASS/FAIL/SKIP 与日志链接，给出 baseline 与 patched 的对照结果。
6. **Limitations**：什么没有验证、什么明确不在范围内。

精简骨架：

```markdown
## Motivation
Fix a reproducible failure reported in #<ISSUE_NUMBER>.

## Changes
Use the smallest change required for <SPECIFIC_ROOT_CAUSE>.

## Validation
- Baseline: EXPECTED_FAIL — original error reproduced.
- Patched: PASS — regression test executed.
- Not tested: <PLATFORM_OR_WORKLOAD>.
```

**上面的 PASS 只是占位示例，不是你的测试结论。** 必须替换为真实输出——事后被发现的编造 PASS，会让你在那个社区损失全部信用。术语不确定时查[术语表](../../docs/zh-CN/glossary.md)。

## F. CodeX 提示词

> 只根据我提供的 Issue、RCA、Patch Plan 和真实测试日志，用简明英文起草 PR 描述；如上游有 PR 模板则遵循它。结构：Motivation、Reproduction、Root Cause、Changes、Validation、Limitations、Related evidence。每个技术结论都要能对应日志或代码位置；证据缺失处写 NOT RUN 或 Unknown——不要发明 PASS、性能提升或通用兼容性。输出发我校对，不要发布到 GitHub。

独立文件版：[Mission 07 提示词](../../prompts/zh-CN/mission-07-write-pr-description.md)

## G. 预期成果

应用到真实 PR（或待粘贴）的描述；上游有模板时遵循上游模板，否则用 [PR 模板](../../templates/zh-CN/pr-description.md)结构。

## H. 验收标准

把描述交给一位**没有**参与修复的人。约两分钟内，他能回答：**为什么修、改了什么、怎么验证的、还剩什么风险？** 答不上来，就删背景、补证据链接，直到能。

## I. 常见误区

- 营销式措辞——「全面支持所有环境！」Reviewer 的解读是「作者没测过边界」。
- 把整篇 RCA 粘进正文。细节放链接里，正文保持可导航的摘要。
- 英文用力过猛。非母语者的简单准确句完全专业；错误的结论才不专业。

## J. 导航

[← 上一课](./06-open-first-pr.md) · [课程目录](./README.md) · [下一课 →](./08-handle-review.md) · [English version](../en/07-write-pr-description.md) · [PR 描述模板](../../templates/zh-CN/pr-description.md) · [Mission 07 提示词](../../prompts/zh-CN/mission-07-write-pr-description.md)
