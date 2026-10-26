# 09｜GitHub CI 失败了，怎样找到问题并修复？

> **本课只解决一个问题：怎样判断 PR 的 CI 为什么变红？**
> 预计 45–90 分钟｜前置：[第 08 课](08-handle-review.md)的 Review 状态和 PR URL｜成果：[CI 排查记录](../../templates/zh-CN/ci-triage.md)

## A. 问题

CI（Continuous Integration，持续集成）会在每个 PR 上自动运行格式检查、构建与测试。你的 PR 出现红色 ✗，助手立刻断言「我的 patch 错了」。也许吧。但红色 CI 的含义是「**一个需要解释的失败**」，不是「你的代码错了」。失败可能来自你的代码、你的格式、一道权限墙、一个抖动的运行器，或 base 分支上早已存在的问题。

## B. Aha 时刻

**永远不要凭 CI 总图标下结论。结论来自失败 Job 的日志和同条件的对照运行。**

## C. 一个概念：CI 失败的分类

每个红色检查都落进以下几类之一，每类的责任方不同：

| 类别 | 典型特征 | 该谁处理 |
|---|---|---|
| 代码/测试失败 | 日志里出现你的代码导致的测试或构建失败 | 你 |
| 格式/lint | clang-format、pre-commit 或 black 报风格问题 | 你（机械性） |
| 权限门槛 | 状态为 `action_required`——等待维护者批准 | 维护者 |
| 基础设施/抖动 | 网络超时、磁盘满、运行器被杀 | 无主——重试或报告 |
| base 已有失败 | base 分支上同样失败 | 上游的，不是你的 |

排查 = 读日志 → 归入一类 → 只做该类对应的动作。

## D. 真实案例

[PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) 的历程同时出现好几类：作者必须在代码中真正修复的 clang-format/pre-commit 格式问题；一些 GitHub Actions 停在 `action_required` 直到维护者批准（不是测试失败）；还有一次 TheRock 多架构 CI 异常，维护者指出上游 `develop` 在相应旧 TheRock 版本上同样失败——**base 已有失败**，不是回归。合并前，作者的 [CI 状态评论](https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225886811)报告了最终 HEAD 上七个主要工作流全部通过。各条证据见[案例研究](../../case-studies/zh-CN/rocm-pr-13437.md)。

## E. 跟着做

**① 打开 PR 的 Checks 标签页。** 确定确切的 Workflow、Job 和 Step；在日志里找*第一条有意义的*错误行（不是最后那行「job failed」），并保存该次运行的 GitHub URL。

**② 给失败归类。** 对照上表；检查 Job 的状态词：`failed`、`action_required`、`cancelled`、`pending` 含义各不相同，只有一部分归你修。

**③ 能本地复现就复现。** 格式问题用仓库固定版本的 pre-commit/clang-format 复现；GPU 测试需要匹配硬件——可选的[云端实验室](../../docs/zh-CN/cloud-gpu-lab.md)能覆盖部分 Linux GPU 测试，但不能假设覆盖 Windows 或 CI 专属硬件。

**④ 先对照，再行动。** 怀疑 base 已有失败？找到同条件下 base 分支（或维护者提供的参考运行）的同一检查。权限门槛？礼貌请维护者批准——不要反复点重跑。无论如何，只对已确认的类别采取行动。

## F. CodeX 提示词

> 分析我的 PR 当前 HEAD 的真实 CI 状态——不要相信总体红绿图标。对每个异常 Job 报告：Workflow/Job URL、失败 Step、关键日志行、HEAD SHA、来自可比 base 运行的证据，以及你的分类：代码 / 格式 / 测试 / 权限 / 基础设施 / base 已有 / 未知。每个 Job 只推荐最小下一步动作。绝不把 action_required 描述为测试失败，绝不把未完成的工作流写成绿色。任何重跑或评论由我决定。

独立文件版：[Mission 09 提示词](../../prompts/zh-CN/mission-09-debug-ci.md)

## G. 预期成果

一份 [CI 排查记录](../../templates/zh-CN/ci-triage.md)：PR URL + HEAD SHA、Workflow/Job URL、原始日志证据、对照结果、带证据的分类，以及已采取的行动。

## H. 验收标准

你能端到端解释**至少一个真实 CI 状态**：关键日志行、你的归类、该归类的证据、下一步（已做或已请求）。如果原因确实不明，记录写 UNKNOWN 并附你检查过什么——这是完全合法的产出。

## I. 常见误区

- 不读日志就连续点 Re-run。抖动不等于修复；如果错在你的代码，重跑多少次都没用。
- 用「我电脑上能过」推翻 CI。你的机器不是契约，CI 环境才是。
- 默认甩锅基础设施。这有时是真的，也永远最省事——宣称之前先用 base 对照验证。

## J. 导航

[← 上一课](./08-handle-review.md) · [课程目录](./README.md) · [下一课 →](./10-merge-and-handoff.md) · [English version](../en/09-debug-ci.md) · [CI 排查表](../../templates/zh-CN/ci-triage.md) · [Mission 09 提示词](../../prompts/zh-CN/mission-09-debug-ci.md)
