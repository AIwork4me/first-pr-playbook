# CodeX 任务集 — 简体中文

**[English version](../en/README.md)**

十个可复制的任务提示词，每课一个（[课程目录](../../lessons/zh-CN/README.md)）。以 CodeX 为示范，方法适用于任何 AI 编程助手。每个任务是独立文件：

| # | 任务 | 对应课程 | 交付成果 |
|---|---|---|---|
| 01 | [筛选 Issue](mission-01-find-an-issue.md) | [01](../../lessons/zh-CN/01-find-an-issue.md) | Issue 选择卡 |
| 02 | [构建最小复现](mission-02-reproduce-a-bug.md) | [02](../../lessons/zh-CN/02-reproduce-a-bug.md) | 复现报告 |
| 03 | [根因分析](mission-03-root-cause-analysis.md) | [03](../../lessons/zh-CN/03-root-cause-analysis.md) | RCA 记录 |
| 04 | [最小补丁计划](mission-04-minimal-patch.md) | [04](../../lessons/zh-CN/04-minimal-patch.md) | Patch Plan + diff |
| 05 | [A/B 与回归验证](mission-05-prove-the-fix.md) | [05](../../lessons/zh-CN/05-prove-the-fix.md) | 验证矩阵 |
| 06 | [Git 与 PR 安全准备](mission-06-open-first-pr.md) | [06](../../lessons/zh-CN/06-open-first-pr.md) | 真实 PR 链接 |
| 07 | [可审查的 PR 描述](mission-07-write-pr-description.md) | [07](../../lessons/zh-CN/07-write-pr-description.md) | PR 描述草稿 |
| 08 | [Review 反馈闭环](mission-08-handle-review.md) | [08](../../lessons/zh-CN/08-handle-review.md) | Review 闭环表 |
| 09 |[CI 归因排查](mission-09-debug-ci.md) | [09](../../lessons/zh-CN/09-debug-ci.md) | CI 排查记录 |
| 10 | [Merge 导向收尾](mission-10-merge-and-handoff.md) | [10](../../lessons/zh-CN/10-merge-and-handoff.md) | 作品集记录 |

## 总指令 —— 每次新会话先粘贴

```text
你是我的开源工程队友，不是自动提交 PR 的机器人。
目标：围绕一个真实、允许参与的 GitHub Issue，交付最小、可复现、可审查的修复。
要求：
1. 先阅读上游 README、CONTRIBUTING.md、AGENTS.md、项目代码规范和最新 Issue/PR 讨论。
2. 每个结论都要区分「源代码/日志已经证实」和「等待验证的假设」。
3. 不编造执行命令、测试结果、时间、Commit SHA、Reviewer 意见和 CI 状态。
4. 所有环境与结果明确 OS、GPU、依赖版本和 Commit；Linux 不替代 Windows。
5. 修改只覆盖 Issue 的最小范围，不做无关重构。
6. 执行可能改写环境、删除数据、访问外部账号的命令前先解释副作用。
7. 创建分支/Commit/Push/PR/公开评论之前获得我逐项审阅和确认。
8. 在每个阶段输出：本阶段目标、实际操作、证据、局限、下一步。
9. 不记录密钥、私钥、访问令牌或私有文件到公开仓库。
10. 用清晰的中文教我原理；需要 GitHub 英文文案时另写简洁英文供我审阅。
```

## 使用方法

1. 在新的助手会话中先粘贴上面的总指令。
2. 打开当前课程对应的任务文件，替换 `[占位符]` 后粘贴。
3. 与助手一起执行任务；同时打开成果模板，证据一到就填写。

每个任务背后的十条 AI 工程原则：先理解再修改、先复现再修复、区分假设与事实、最小变更、尊重上游惯例、不编造结果、说明环境边界、不泄露凭据、不做垃圾贡献、人类负责到底。
