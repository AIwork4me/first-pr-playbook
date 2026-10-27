# 06｜第一次提交 PR：Fork、Branch、Commit、Push 怎么做？

> **本课只解决一个问题：怎样安全地把改动提交给上游审查？**
> 预计 45–75 分钟｜前置：[第 05 课](05-prove-the-fix.md)的补丁与验证证据，位于你在 [Git 速成](../../docs/zh-CN/git-quickstart.md)中创建的工作分支上｜成果：一个真实、可打开的 PR 链接

## A. 问题

你已经在自己的电脑上做出经过验证的修复，却不知道 GitHub 的 Fork/分支/提交/推送机制如何把它变成维护者可以审查的东西。把它想象成一个概念就通了：**你在自己的副本里工作，然后邀请官方项目来看。**

## B. Aha 时刻

**开 PR 永远不会直接修改官方项目。它只是*提议*一个变更并请求审阅。**

## C. 一个概念：贡献流水线

六个词，按顺序出现，这里一次性定义：

- **Fork**：仓库在你 GitHub 账号下的个人副本。
- **Clone**：把你的 Fork 下载到本地电脑。
- **Branch（分支）**：仓库内一条命名的开发线，让你的修复与其他一切隔离开。
- **Commit（提交）**：一组相关变更的已保存快照，附一段说明。
- **Push（推送）**：把本地分支上传到你 GitHub 上的 Fork。
- **Pull Request（PR）**：请求维护者审阅你的分支，并在接受时合并进官方代码。

Clone、分支、Commit 与 remote 在 [Git 速成](../../docs/zh-CN/git-quickstart.md)里已经动手练过；本课只新增 Fork 和 PR 本身，其余概念在此集中复述一遍。

[PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) 的 head 分支位于 Fork `AIwork4me/rocm-libraries`，base 是 `ROCm/rocm-libraries` 的 `develop`——完整规模的同一条流水线。

## D. 真实案例

每个仓库对目标分支有自己的规则。#13437 的目标是 `develop` 而不是 `main`，因为 ROCm 在发布前于该分支汇集变更。仓库的[贡献规范](https://github.com/ROCm/rocm-libraries/blob/develop/CONTRIBUTING.md)（以及任何项目的 `CONTRIBUTING.md`）写明目标分支、提交风格和必要的 Issue 关联。先读那份文件，决定了你的 PR 是被审阅，还是在一分钟内被关闭。

## E. 跟着做

**① 先读目标仓库的贡献规范。** 记下要求的 base 分支、提交信息风格、是否必须先关联 Issue。如果仓库提供 PR 模板，第 07 课会用到。

**② 把已验证的成果送上 GitHub。** 在上游仓库页面点击 **Fork**（一次点击，在你的账号下创建 `<YOUR_USER>/<REPO>`）。然后按你的工作所在位置选一条路径：

**路线 A——在现有工作克隆中继续（推荐；这正是 [Git 速成](../../docs/zh-CN/git-quickstart.md)在第 02 课之前搭建的环境）。** 你的修复已经提交在某条分支（例如 `investigate/issue-3956`）上，该克隆的 `origin` 指向官方仓库。把你的 Fork 挂为第二个远程，把分支推上去：

```bash
git status        # 确认：在"你的"分支上，没有意外改动
git remote -v     # origin = 你克隆时用的官方仓库
git remote add fork https://github.com/<YOUR_USER>/<REPO>.git
git push -u fork investigate/issue-<编号>
```

什么都不用搬、什么都不用重做——你在第 02–05 课建好的分支，原样成为 PR 分支。

**路线 B——从 Fork 的新克隆开始**（很多 `CONTRIBUTING.md` 描述的布局）。克隆你的 Fork，把官方仓库挂为 `upstream`，从正确的 base 建分支：

```bash
git clone https://github.com/<YOUR_USER>/<REPO>.git
cd <REPO>
git remote add upstream https://github.com/<UPSTREAM_OWNER>/<REPO>.git
git fetch upstream
# 用仓库实际的目标分支替换 <BASE_BRANCH>，例如 main 或 develop
git switch -c fix/<short-topic> upstream/<BASE_BRANCH>
```

如果你之前的工作在**另一个**克隆里，不要在克隆之间盲拷未提交的文件。最小补丁本来就小——在这里重新应用最终 diff 通常最快也最安全；若想正确地搬运提交，先让助手讲清 `git format-patch` / `git am` 再使用。

**③ 提交——或复查你已有的提交。** 路线 A 中，提交在第 04–05 课已经完成：复查即可（`git log --oneline -5`、`git diff <BASE>..<你的分支>`）。路线 B 中，暂存前先审阅，只添加 Patch Plan 覆盖的文件，然后推送：

```bash
git status
git diff
git add <CHANGED_FILE_1> <CHANGED_FILE_2>
git commit -m "fix: describe the specific problem"
git push -u origin fix/<short-topic>
```

**④ 在 GitHub 打开 PR。** 进入你 Fork 的分支页面，点击 **Compare & pull request**。最先核对两件事：**base** 是上游的正确分支，**head** 是你的修复分支。误把 base 指向自己 Fork 的 PR 什么也审阅不了。如果证据还在整理，可在支持该功能的仓库选择 **Draft PR**。

**⑤ 检查 Files changed 标签页。** 它必须与你的计划范围完全一致——没有实验日志、没有凭据或云实例信息、没有无关编辑。

## F. CodeX 提示词

> 帮我准备首次 Pull Request，但不要执行任何公开写入操作。先检查目标仓库的贡献指南和正确的 base 分支，再检查我本地的 git remote、当前分支、status、暂存改动与 diff。用一句话分别解释 fork、upstream、origin、commit 和 PR。列出你拟执行的命令、每条命令的作用与回滚方法。把可能导致推错仓库或泄露凭据的风险单独列出；每一步等我确认后再执行。

独立文件版：[Mission 06 提示词](../../prompts/zh-CN/mission-06-open-first-pr.md)

## G. 预期成果

任何人都能打开的 PR URL：base/head 正确、Files changed 与补丁计划一致、提交有意义、验证证据随时可贴（第 07 课打磨描述）。

## H. 验收标准

1. PR URL 可打开（公开仓库下退出登录也能看）。
2. base = 上游目标分支；head = 你的修复分支。
3. Files changed 只包含计划内改动。
4. diff 与描述中没有密钥或私有数据。

开 PR 的含义是*请求*审阅——不意味着批准，也不意味着合并。

## I. 常见误区

- 对着错误的 base 分支提交，让一个小修复变成两个分支之间所有差异的巨型误伤 diff。
- 在仓库根目录 `git add .`，把日志、模型文件、`.env`、云凭据一并扫进去。
- 为了「测试流程」在繁忙的上游仓库开练习 PR。先在自己的沙盒仓库演练，再做真实贡献。

## J. 导航

[← 上一课](./05-prove-the-fix.md) · [课程目录](./README.md) · [下一课 →](./07-write-pr-description.md) · [English version](../en/06-open-first-pr.md) · [PR 描述模板](../../templates/zh-CN/pr-description.md) · [Mission 06 提示词](../../prompts/zh-CN/mission-06-open-first-pr.md)
