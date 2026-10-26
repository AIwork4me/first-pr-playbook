# 08｜Reviewer 不认可你的代码，应该怎么办？

> **本课只解决一个问题：怎样理解并落实代码 Review？**
> 预计 45–75 分钟｜前置：[第 07 课](07-write-pr-description.md)的可审查 PR｜成果：完整的 [Review 闭环表](../../templates/zh-CN/review-response.md)

## A. 问题

国际维护者的第一条评论落下，你心里一沉：「是不是我的代码很差？」不是——**Review 是协作，不是考试打分。** 评论描述的是你的改动与「项目可长期维护状态」之间的距离；你要学的技能，是把每条评论变成一次可验证的改进。

## B. Aha 时刻

**Review 不只是改代码——它是在降低整个社区的维护成本。**

## C. 一个概念：评论背后的工程理由

看似随意的要求（「用现有测试文件」「保持原有格式」）通常编码着项目约束：统一的版权归属、单一测试框架、最小 diff、统一的风格工具。当你按*底层理由*给每条评论分类——规范/设计/测试证据/格式——正确的回应常常自己浮现。而当你不同意时，同样的分类让你能用事实讨论，而不是用情绪。

## D. 真实案例

[ROCm #13437](https://github.com/ROCm/rocm-libraries/pull/13437) 经历了三轮实质性审阅——全部公开、全部有教学价值：

- **第一轮：项目规范。** [首次 Review](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5489844163)（维护者运行的自动化初审，2026-10-12）：AMD 职务成果必须使用正确的 AMD 版权而非个人署名；使用现有 gtest 基础设施而非独立测试；删除只有作者私人实验日志才能看懂的注释。
- **第二轮：方案简化。** [第二次 Review](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5502061602)：把独立的 freestanding 头文件合并进现有头文件；删除 `HIP < 7` 旧兼容判断；把测试缩小为平凡 inline kernel。
- **第三轮：diff 卫生，随后批准。** 恢复未触碰代码的定义顺序与 `typedef` 风格、精简注释、运行项目的 clang-format/pre-commit。然后是：[「LGTM, thanks! Will merge once CI is green.」](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5551696370)

带链接的完整对照表见[案例研究](../../case-studies/zh-CN/rocm-pr-13437.md)。

## E. 跟着做

**① 别急着回复。** 把每条评论复制进 [Review 闭环表](../../templates/zh-CN/review-response.md)并打标签：规范 / 设计 / 测试证据 / 格式 / 需澄清。用表格而不是用收件箱管理工作。

**② 先理解「为什么」，再决定怎么做。** 看不懂的地方，让助手找已有类似实现、解释项目惯例。不是每条意见都必须照做——但不同意需要有理有据、礼貌表达。

**③ 小步修改，每次重新验证。** 改动一旦触碰测试或依赖，此前的 PASS 全部作废——必须在新 Commit 上重跑相关验证。

**④ 用固定格式、带证据回复。** 每个线程：`Addressed in <SHA>` → 改了什么 → 在新 Commit 上如何验证。「Done」或没有证据的「tests pass」，正是谨慎的维护者最无法使用的回复。

## F. CodeX 提示词

> 阅读我的 PR 上所有公开 Review 线程。对每条评论输出：原评论 URL、维护者的真实要求、背后的工程理由、建议的最小改动、风险与所需回归测试。按规范/设计/测试/格式/澄清分类。不要假设 Reviewer 永远正确——如果建议存在真实权衡，同时起草一份礼貌、基于事实的讨论选项。修改完成后，仅依据真实 Commit 和真实测试日志，按 Addressed in <SHA> / Change / Verified 的格式起草简洁英文回复。发布前须经我审核。

独立文件版：[Mission 08 提示词](../../prompts/zh-CN/mission-08-handle-review.md)

## G. 预期成果

填写完整的 [Review 闭环表](../../templates/zh-CN/review-response.md)：每条评论都有状态——已处理（附 Commit + 证据）、讨论中、或待澄清——且回复均按证据格式起草。

## H. 验收标准

可追溯：**每条 Review 评论都能追到真实 Commit + 验证，或一个明确陈述的待解问题。** 没有被悄悄遗漏的评论。注意：线程已解决不等于已批准，后面可能还有新一轮。

## I. 常见误区

- 回复「Done」却不给 SHA 和验证——维护者只好手动核查你的工作，而这正是回复本该省掉的事。
- 借修复评论之机夹带重构，迫使全部内容重新审阅。让每一轮都保持小。
- 让 AI 写一篇热情洋溢、却绕开技术要点的长回复。礼貌只需一句话，载荷是证据。

## J. 导航

[← 上一课](./07-write-pr-description.md) · [课程目录](./README.md) · [下一课 →](./09-debug-ci.md) · [English version](../en/08-handle-review.md) · [Review 闭环表](../../templates/zh-CN/review-response.md) · [Mission 08 提示词](../../prompts/zh-CN/mission-08-handle-review.md)
