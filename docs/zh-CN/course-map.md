# 课程地图：十步走完一次完整 PR

课程两侧各有一个前置模块：[入门实验](../../labs/first-fix/README.zh-CN.md)（第 01 课之前——一次独立完整的首次修复体验，设计目标约 15 分钟）和 [Git 速成](git-quickstart.md)（第 01 与第 02 课之间——下表默认你已掌握的本地 Git）。两者都不改变十节课的编号。

| 课 | 前置输入 | 学习动作 | 可检查产物 | 不满足时如何回退 |
|---|---|---|---|---|
| 01 | 项目兴趣与 GitHub 账号 | 选择真实 Issue | [选择卡](../../templates/zh-CN/issue-selection.md) | 换更小或未被占用的问题 |
| 02 | 目标 Issue | 复现并记录环境 | [复现报告](../../templates/zh-CN/bug-reproduction.md) | 再核对版本、依赖和步骤 |
| 03 | 复现日志 | 设计假设与实验 | [RCA](../../templates/zh-CN/rca.md) | 更新最小复现，避免臆测 |
| 04 | 已验证原因 | 最小补丁设计 | [Patch Plan](../../templates/zh-CN/patch-plan.md) | 回到 RCA 重新定位 |
| 05 | 改动与基线 | 对照与回归测试 | [验证矩阵](../../templates/zh-CN/validation-matrix.md) | 修复测试/代码，必要时重开 RCA |
| 06 | 完整改动与证据 | Fork/Branch/Commit/Push/PR | PR URL | 先在自己仓库演练 |
| 07 | PR 与测试证据 | 写清修改背景/范围 | [PR 模板](../../templates/zh-CN/pr-description.md) | 补充缺失证据 |
| 08 | Reviewer 评论 | 分类/修改/回复 | [Review 记录](../../templates/zh-CN/review-response.md) | 回到 04/05 验证新改动 |
| 09 | CI 检查与日志 | 找出真正失败原因 | [CI 排查](../../templates/zh-CN/ci-triage.md) | 识别环境/权限/代码问题 |
| 10 | Review + CI + 状态 | 收尾、交付、复盘 | [作品集](../../templates/zh-CN/portfolio-handoff.md) | 不合并也形成诚实复盘 |

## 何为通关？

不是每一篇都拿到绿色徽章，而是每一篇都产生**可复查的证据**。每个成果要能回答：做了什么、如何做、得到什么、什么还没验证。

## 连载和课程结构为何不同？

每课可单独分享；连载文章在文首放一段前情提要、文末给前面文章入口。**不复制前 9 篇内容到第 10 篇**。这避免手机端阅读累赘。详见维护者说明。[English version](../en/course-map.md)
