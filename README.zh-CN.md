# 跟我学：从零开始，向国际顶级开源项目提交你的第一个 PR！

[English](README.md) | **简体中文**

> **First PR Playbook｜零基础友好的开源贡献实战课程**
> 从一个真实 Issue 开始，借助 AI 编程工具完成复现、根因定位、最小修复、验证、PR、Review 与 CI。
> **10 篇教程 · 10 个可检查的成果 · 1 次完整的工程训练。**

**你不需要先成为高手才能参与开源。先从一个自己能理解、能复现、能验证的小问题开始。**

**第一次参与开源？[花大约 15 分钟，亲手修复一个 Bug](labs/first-fix/README.zh-CN.md)。** 运行一个真实的失败测试、做出最小修复、亲眼看到它通过。完全独立、可离线完成：只需 Python——不要 GPU、不要账号、不要安装任何依赖。

[🧪 入门实验（约 15 分钟）](labs/first-fix/README.zh-CN.md) · [🚀 开始第一课](lessons/zh-CN/01-find-an-issue.md) · [📚 课程导览](docs/zh-CN/start-here.md) · [🌱 Git 速成](docs/zh-CN/git-quickstart.md) · [🤖 CodeX 提示词](prompts/zh-CN/README.md) · [🧰 模板清单](templates/README.md) · [🔍 真实案例](case-studies/zh-CN/rocm-pr-13437.md)

## 这是一套怎样的教程？

我们不教你靠 AI 一键提交大量 PR，更不承诺「照着做一定 Merge」。本课程教你：把**真实用户问题**转化为**可复现实验**，将 AI 输出变成**有审阅和测试证据的工程贡献**，再学会与开源社区协作。

贯穿案例是已合并的 [ROCm/rocm-libraries PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437)，它解决了部分 Windows ROCm 运行环境下 MIOpen HIPRTC 无法访问宿主 C++ 标准库头文件导致的训练故障。案例的环境结论有边界，**不意味着所有 AMD GPU/Windows 配置均已验证**。

### 适合谁

- 第一次使用 GitHub 参与真实项目的学生、转行开发者和软件爱好者。
- 已经在使用 CodeX、Claude Code 等 AI 编程工具，但不知道如何保证代码质量的人。
- 有 GPU/AI 方向兴趣，希望学会真实复现与回归测试的开发者。

### 你需要准备什么？

GitHub 账号、能运行终端的电脑、任选一种 AI 编程助手，以及每课约 30–90 分钟的动手时间。**GPU 不是必需前提**；遇到 GPU 相关问题时可选用 [AMD Radeon Cloud 云端实验室](docs/zh-CN/cloud-gpu-lab.md)，并先检查云环境是否与目标 Bug 条件一致。

## 课程目录

| 课次 | 这节课解决的问题 | 交付成果 |
|---|---|---|
| [01｜找 Issue](lessons/zh-CN/01-find-an-issue.md) | 我该帮助哪个项目解决什么问题？ | Issue 选择卡 |
| [02｜复现 Bug](lessons/zh-CN/02-reproduce-a-bug.md) | 怎样证明问题真实存在？ | 最小复现与环境记录 |
| [03｜根因分析](lessons/zh-CN/03-root-cause-analysis.md) | 报错背后真正坏在哪里？ | RCA 记录 |
| [04｜最小修复](lessons/zh-CN/04-minimal-patch.md) | 怎样修改最少的必要代码？ | Patch Plan 与最小改动 |
| [05｜验证修复](lessons/zh-CN/05-prove-the-fix.md) | 怎样证明修复真的有效？ | A/B + 回归测试证据 |
| [06｜首次 PR](lessons/zh-CN/06-open-first-pr.md) | 怎样把改动提交给上游？ | 第一个 PR 链接 |
| [07｜PR 描述](lessons/zh-CN/07-write-pr-description.md) | 怎样让维护者快速理解修改？ | 可审查的 PR 描述 |
| [08｜处理 Review](lessons/zh-CN/08-handle-review.md) | 怎样回复并落实反馈？ | Review 反馈处理表 |
| [09｜处理 CI](lessons/zh-CN/09-debug-ci.md) | CI 失败是谁的问题？ | CI 故障归因记录 |
| [10｜Merge 与交付](lessons/zh-CN/10-merge-and-handoff.md) | 怎样完成最后一公里？ | 开源贡献作品集 |

> **学习方式**：按照顺序完成一项真实问题的完整工作流。每篇也可独立阅读；开头提供前置材料，结尾有「一个练习 + 一个验收标准 + 下一课」。全部课程也有[英文版](lessons/en/README.md)。

## 最快上手（约 15 分钟）

完全零基础？先用[入门实验](labs/first-fix/README.zh-CN.md)热身——约 15 分钟亲手修一个 Bug，再继续下面的正式课程。

1. 阅读[从这里开始](docs/zh-CN/start-here.md)，选一个最近正在使用的开源工具。
2. 打开[第 01 课](lessons/zh-CN/01-find-an-issue.md)，使用 GitHub 的 `good first issue` / `documentation` / `bug` 筛选问题。
3. 用 [Issue 选择卡](templates/zh-CN/issue-selection.md)记录目标 Issue、预期结果和为什么适合自己。
4. 将 [Mission 01 提示词](prompts/zh-CN/mission-01-find-an-issue.md)交给 AI，要求**先理解、不修改**。

## 一套可审查的成果，而不是一枚碰运气的 Merged 徽章

```text
真实 Issue → 最小复现 → RCA → 最小补丁 → A/B + 回归测试
                                              ↓
作品/成长记录 ← Merge 或未合并复盘 ← CI + Review ← 高质量 PR
```

## 与 AI 编程助手的协作方式

课程对任何 AI 编程助手采用同一纪律：**人类负责目标与验收，AI 协助阅读、实施、验证。**

1. 先理解用户问题，再修改代码。
2. 先复现故障，再提出修复。
3. 区分已证实的事实与待验证的假设。
4. 只做最小必要修改。
5. 未执行的测试不得写成 PASS。
6. 日志与示例中不得出现凭据、令牌或私有路径。
7. 一切提交内容由人类审阅并负责。

[CodeX 提示词集](prompts/zh-CN/README.md)以 CodeX 为示范助手，方法同样适用于其他编程助手。

## 真实案例：ROCm PR #13437

贯穿案例 [ROCm/rocm-libraries PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437)「MIOpen: make HIPRTC kernel includes self-contained without host STL」源于 Windows 用户的 BatchNorm 故障（[MIOpen Issue #3956](https://github.com/ROCm/MIOpen/issues/3956)），经历三轮实质性维护者 Review，于 2026-10-19 合并。[完整案例](case-studies/zh-CN/rocm-pr-13437.md)中的每个结论都链接到 GitHub 原始记录，包括**未验证的部分**。

## 可选实验室：AMD Radeon Cloud GPU

部分 Issue 确实需要 GPU。[云端 GPU 实验室](docs/zh-CN/cloud-gpu-lab.md)说明何时需要云实例、如何从笔记本连接、如何检查 ROCm/PyTorch 环境、如何保存证据且不泄露凭据。边界先说清楚：**Linux 云实例不能自动复现 Windows 特有的问题。**

## 如何参与贡献本仓库

这是一个教育仓库，最有价值的贡献是修正课程本身的准确性、清晰度与可复现性。流程见[贡献指南](CONTRIBUTING.zh-CN.md)：小而聚焦的 PR、为声称的结果提供证据、保持两种语言的内容一致。请遵守[行为准则](CODE_OF_CONDUCT.zh-CN.md)。

## 边界与限制

- 本课程是独立社区教育内容，**不是** AMD、ROCm、GitHub 或任何上游项目的官方资料，也不暗示任何背书。
- 案例结论有明确平台边界（例如 Windows 11 / gfx1151）。一个测试过的 GPU 架构不代表所有 GPU；Linux 结果不能证明 Windows 行为。
- 跟随本课程不保证 PR 一定被合并；AI 生成内容永远不能替代证据。

## 许可与致谢

- 原创教程文字：[CC BY 4.0](LICENSE-CONTENT.md)。
- 原创可复用脚本、命令示例与 Markdown 模板：[MIT](LICENSE)。
- 第三方代码、截图与商标仍归其权利人所有。

感谢 ROCm/MIOpen 维护者在 [PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) 中提出的严谨工程审阅意见，以及原始 Issue 的报告者。
