# 01｜第一次参与国际开源项目，如何找到适合自己的 Issue？

> **本课只解决一个问题：我该从哪个真实问题开始？**
> 预计 30–45 分钟｜前置：GitHub 账号｜成果：[Issue 选择卡](../../templates/zh-CN/issue-selection.md)

## A. 问题

你第一次打开 PyTorch、vLLM、ROCm 等国际开源仓库，可能看到数百甚至数千条 Issue：有些只有标题，有些长篇讨论、有些需要多张 GPU。新手的本能是去挑「最厉害的 Bug」；正确的本能恰恰相反：**找一个你能理解、能复现、能验证的小问题。** 第一次贡献的目的是学会完整流程，不是证明自己是天才。

## B. Aha 时刻

**一个清楚的小问题，比一个模糊的大创意更值得新手做——「窄而可检查」本身就是价值。**

## C. 一个概念：仓库与 Issue

**仓库**（Repository）存放项目代码与公开协作记录；**Issue** 是描述问题或任务的公开工单。好 Issue 至少能回答三件事：用户想做什么、预期是什么、实际发生了什么。

GitHub 用标签帮助筛选。`good first issue` 提示任务*可能*适合新人——它是维护者给的线索，不是「零门槛」的保证。决定之前必须点开 Issue 读原文。

## D. 真实案例

[ROCm/MIOpen #3956](https://github.com/ROCm/MIOpen/issues/3956) 是一个报告规范的实例：Windows Radeon GPU 用户运行 `BatchNorm2d` 时出现 `miopenStatusUnknownError`，并附上环境信息、Python 示例和错误日志。修复这个底层 Bug 本身并不适合所有初学者，但它展示了好的起点长什么样：**可观察的用户问题，而非「我想随便改点什么」。** 它最终发展为 [ROCm PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437)——贯穿本课程的案例（详见[案例研究](../../case-studies/zh-CN/rocm-pr-13437.md)）。

## E. 跟着做

**① 从自己用过的软件选仓库。** 例如 Python 工具、编辑器插件、命令行应用、文档站。优先选你愿意每周花时间使用的项目。先看 README、`CONTRIBUTING.md`，以及近期维护者是否回应 Issue——被放弃的仓库无法审阅你的 PR。

**② 在 Issues 里搜索真实问题。** 从 GitHub 搜索框输入：

```text
is:issue is:open label:"good first issue"
```

也试试 `label:documentation`、`label:bug`，或在某个仓库中添加 `repo:owner/name`。不要直接信任 AI 转述的 Issue 编号（它可能编造）；点开核对原文、时间、是否已有 PR 或维护者认领。

**③ 用三个问题筛选：** 我是否理解这个现象？是否有条件复现（或文档类问题根本不需要环境）？预计 1–2 次短实践能否得到可检查的阶段成果？三个都是「否」，就换题。

**④ 选择 1 个主目标 + 1 个备选。** 如果原任务已被修复、维护者建议别的方向，就及时切换到备选。

## F. CodeX 提示词

> 我第一次参加开源。目标仓库：[URL]。请先阅读这个仓库的 README、CONTRIBUTING.md 和当前未关闭的 Issues，帮我筛选三个适合新手、真实存在的问题。对每个 Issue 给出：URL、用户预期与实际、复现所需环境、需要的知识、是否有人正在处理、我应向维护者核实的问题。不要修改、提交或推送代码；所有 Issue 必须能在 GitHub 找到原文并给我 URL 供我自己核对。

独立文件版：[Mission 01 提示词](../../prompts/zh-CN/mission-01-find-an-issue.md)

## G. 预期成果

为主目标（可含备选）填写完整的 [Issue 选择卡](../../templates/zh-CN/issue-selection.md)：URL、预期与实际行为、环境要求、以及这个问题为什么适合你。

## H. 验收标准

不看 Issue 页面，也能用自己的话回答：

1. **谁遇到了什么问题，他期望的结果是什么？**
2. **我在这个 Issue 上的第一个可验证行动是什么？**

选择卡有完整 URL、环境要求记录，且没有明显已解决/重复的迹象，即通过。本课不需要写代码。

## I. 常见误区

- 把 `good first issue` 当成一定简单：标签只是提示，技术范围和硬件条件才决定难度。
- 只看标题就开工：先检查讨论、关联 PR 与认领情况。
- 一开始就给大量项目群发「我想贡献」：先在一个项目做最小调查，再针对性沟通。

## J. 导航

[← 从这里开始](../../docs/zh-CN/start-here.md) · [课程目录](./README.md) · [下一课 →](./02-reproduce-a-bug.md) · [English version](../en/01-find-an-issue.md) · [Issue 选择卡](../../templates/zh-CN/issue-selection.md) · [Mission 01 提示词](../../prompts/zh-CN/mission-01-find-an-issue.md)
