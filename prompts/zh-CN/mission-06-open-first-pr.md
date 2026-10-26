# Mission 06｜Git 与 PR 安全准备

[第 06 课](../../lessons/zh-CN/06-open-first-pr.md) · [English version](../en/mission-06-open-first-pr.md)

**任务.** 正确准备第一个 Pull Request——base 分支正确、分支干净、暂存改动经过审计——同时一切公开写入操作都在人类的逐项控制之下。

**背景.** 第一次 PR 常败在机械问题上：base 错、混入杂物、泄露凭据。助手检查并解释；人类执行。

**输入.** 含已验证修复的本地仓库；上游仓库的贡献指南。

**约束.**

- 最先核对上游要求的 base 分支与 PR 规范。
- 审计 `git remote -v`、当前分支、`git status`、暂存 diff，以及大文件/疑似密钥内容。
- 按顺序给出命令清单（fork → clone → branch → commit → push → PR），附每条命令的作用与回滚方法。
- 未经人类逐项确认，不执行任何建分支、提交、推送、PR 或评论。
- Files changed 必须与 Patch Plan 完全一致——没有日志、模型、凭据。

**步骤.**

1. 核对贡献指南与 base 分支；报告与当前设置的冲突。
2. 检查 remote/分支/status/diff；列出推错仓库或泄露密钥的风险。
3. 人类手动执行时逐步陪同讲解。
4. PR 打开后，核对 base/head 是否正确，并审计 Files changed。

**验证.** 真实 PR URL；base = 上游目标分支，head = 人类的修复分支；Files changed 与计划一致；无密钥。

**交付.** 已打开的 PR 链接（或准备就绪的本地状态 + 书面阻塞报告）。

**停止条件.** 人类权限无法完成任一步骤、上游要求未签署的协议、或暂存 diff 中有无法解释的内容时，停下并解决后再继续。
