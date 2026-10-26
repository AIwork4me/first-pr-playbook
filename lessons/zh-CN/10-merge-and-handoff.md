# 10｜从提交 PR 到 Merge，如何完成最后一公里？

> **本课只解决一个问题：无论结果如何，怎样专业地收尾？**
> 预计 30–60 分钟｜前置：[第 09 课](09-debug-ci.md)的 CI 结果 + Review 反馈记录｜成果：[开源贡献作品集记录](../../templates/zh-CN/portfolio-handoff.md)

## A. 问题

Review 处理完、CI 变绿——于是每天催一次「请 Merge」？不。**专业的收尾，是让维护者一眼看清哪些合并条件已具备、哪些风险仍在**——而不需要你施压。而且即使 PR 最终*没有*被合并，你带走的也是真正长期有价值的东西：一份完整的工程记录。

## B. Aha 时刻

**Merged 是一个结果；可重复的工程证据与协作记录，才是你无论输赢都在积累的能力。**

## C. 一个概念：PR 的四种状态

- **Open**：等待中；你的职责是响应，不是催促。
- **Approved**：审阅者已认可；合并可能仍受 CI 或发布节奏约束。
- **Merged**：上游接受了变更；从此由他们维护。
- **Closed without merge**：未被接受（这一次）。先读维护者的解释再行动；原样重开的 PR 几乎总是错的。

每种状态都是作品集记录可以停下的合法位置。只有一种叫 Merged——把其他任何状态写成 merged，都是在伪造自己的记录。

## D. 真实案例

2026-10-16，[PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) 的维护者批准：[「LGTM, thanks! Will merge once CI is green.」](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5551696370) 作者随后发布一条基于事实的[状态评论](https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225886811)——最终 HEAD 上七个主要工作流全部通过——然后等待。PR 于 **2026-10-19** 合并；次日，该变更随依赖更新进入 TheRock 集成（[#9359](https://github.com/ROCm/TheRock/pull/9359)，2026-10-20 合并）。注意[案例研究](../../case-studies/zh-CN/rocm-pr-13437.md)强调的边界：「已合并进开发分支」**不代表**所有下游发行版已立即包含该修复。

## E. 跟着做

**① 做最后一遍状态审计。** 还有未解决的实质性 Review 评论吗？PR 描述与最终补丁一致吗？必需检查在*当前* HEAD（不是旧的）上完成了吗？有承诺过但没做的事吗？

**② 写简洁的收尾说明。** 两三段：关键修改、证据位置、已知局限、需要维护者做什么（如果有的话）。没有新信息就不发「any update?」——维护者在发布流程允许时会合并。

**③ 准确记录结果。** 把 PR 的最终状态和日期抄进作品集记录。若被关闭未合并，记下维护者的理由——那是免费的高级工程反馈。

**④ 沉淀作品集条目。** 在你的个人仓库里收集：Issue、PR、关键日志，以及**你亲自做出的**决策（注明 AI 协助没有问题；重点是所有权）。面试里「我指挥 AI 完成 RCA、强制基线失败/修复通过的对照、并处理三轮 Review」远比「我用了某 AI 工具」有力。

## F. CodeX 提示词

> 对我的 PR 做一次 merge-oriented closure 审计：核对当前 HEAD、PR 描述一致性、未关闭的 Review 线程、必需 CI 状态、测试范围与未验证声明。起草一条礼貌、不催促的维护者收尾评论——不要发布。然后查看 PR 在 GitHub 的真实状态（open / approved / merged / closed-without-merge），并整理我的作品集记录：用户问题、复现、RCA、最小设计、验证、协作、最终状态、仍未验证的内容，以及我亲自做出的工程决策。绝不假设未合并的 PR 已 Merge。

独立文件版：[Mission 10 提示词](../../prompts/zh-CN/mission-10-merge-and-handoff.md)

## G. 预期成果

填写完整的[作品集记录](../../templates/zh-CN/portfolio-handoff.md)：真实 Issue/PR 链接、可查的证据、Review 互动、你的个人决策、准确的最终状态。

## H. 验收标准

第三方（面试官或其他审阅*你*的人）能凭记录里的链接核实每一条主张，且记录中的 PR 状态与 GitHub 当前一致。无论是否合并，你都完成了一次完整、诚实的工程循环——这正是本课程的目标。

## I. 常见误区

- 按固定节奏发合并提醒。噪音不会加速发布流程，只会消耗好感。
- 凭记忆或愿望记录「已合并」。查页面，写日期。
- 作品集停在 PR 链接。耐用的资产是叙事：问题 → 证据 → 决策 → 结果。

## 课程完成——然后呢？

你已经走完完整路径：**Issue → 复现 → RCA → 最小补丁 → 验证 → PR → 描述 → Review → CI → 交付。** 把十份成果保存在自己的仓库里；下一次挑战只是一个更难的问题。你不需要先学会一切——你需要一个真实问题、证据纪律，和对维护代码的人的尊重。现在你都有了。

## J. 导航

[← 上一课](./09-debug-ci.md) · [课程目录](./README.md) · [课程地图](../../docs/zh-CN/course-map.md) · [English version](../en/10-merge-and-handoff.md) · [作品集模板](../../templates/zh-CN/portfolio-handoff.md) · [Mission 10 提示词](../../prompts/zh-CN/mission-10-merge-and-handoff.md)
