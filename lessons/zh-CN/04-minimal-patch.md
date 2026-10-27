# 04｜如何指挥 AI 修复 Bug，而不是制造更多 Bug？

> **本课只解决一个问题：怎样设计最小必要补丁？**
> 预计 45–90 分钟｜前置：[第 03 课](03-root-cause-analysis.md)有证据支持的 RCA，且在自己的工作分支上进行（见 [Git 速成](../../docs/zh-CN/git-quickstart.md)）｜成果：[Patch Plan](../../templates/zh-CN/patch-plan.md) 与最小 diff

## A. 问题

根因已确认。你把它丢给 AI 助手，九十秒后它交回几百行代码：一个新辅助文件、一段周边重构、顺手「优化」的无关函数。看起来很强？对开源 Reviewer 来说，这看起来像**风险**：每一行多余的代码，都是他们要理解、测试、维护多年的东西。

## B. Aha 时刻

**高品质 PR 的第一原则不是「多做」，而是「少做且够用」。**

## C. 一个概念：最小必要变更

最小补丁只修改**已确认根因所要求**的内容——不顺手重构、不清理没碰过的代码风格、不「为未来」引入新抽象。最小*不等于*省略测试：旧代码失败、新代码通过的回归测试是修复的一部分，不是装饰。

判断标准很简单：对 `git diff` 里的每个改动块（如何读 diff 见 [Git 速成](../../docs/zh-CN/git-quickstart.md)），你都能回答「根因的哪一条要求了这个改动？」答不上来的改动块，删掉。

## D. 真实案例

[ROCm #13437](https://github.com/ROCm/rocm-libraries/pull/13437) 的第一版带有一组独立的 freestanding 回退头文件。[第二轮 Review](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5502061602) 中维护者提出：回退逻辑能否直接放进**现有** MIOpen 头文件、仅在标准库不可用时启用？既然已不再支持，`HIP < 7` 的兼容判断能否删掉？作者随后合并了独立文件、删除了死分支——最终 PR 为 **7 个文件，+317/−21**，比初版更小、更易审阅。

[批准轮](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5551696370)中，维护者还要求恢复被顺手改动的 `typedef` 风格与定义顺序——功能上无害，但它让 diff 比修复本身更大。完整对照表见[案例研究](../../case-studies/zh-CN/rocm-pr-13437.md)。

## E. 跟着做

**① 先看项目已有实现。** 有没有同类 fallback、异常处理、接口和测试？仓库原来的惯例是什么？你的补丁应该像「读过这个代码库的人」写的。

**② 写 Patch Plan 再让 AI 动手。** 在 [Patch Plan](../../templates/zh-CN/patch-plan.md) 里列出每个要改的文件、必须改的原因、风险和验证方式，并写明**不做什么**（「不重排版」「不重命名」）——这是你对助手「顺手漂移」的防线。

**③ 以最小差异实施。** AI 写完代码后逐块读 `git diff`：是否触碰计划外模块？是否只把现有代码换了一种写法？每个新增逻辑都能说出用途？

**④ 审阅到你能复述。** 让助手解释你看不懂的部分，直到你自己写得出来。你不能提交自己解释不了的代码——Reviewer 最终也会用这条标准要求你。

## F. CodeX 提示词

> 已确认的根因是：[证据链接]。请先研究仓库中已有的类似实现、命名规则和测试框架，设计一个最小必要补丁：列出需要修改的文件、每处改动的目的、兼容风险与验证方式，并明确列出不做哪些重构。待我确认后再编码；编码后逐文件给我看 diff，并标出所有与根因无关的改动。不要推送或提交 PR。

独立文件版：[Mission 04 提示词](../../prompts/zh-CN/mission-04-minimal-patch.md)

## G. 预期成果

带 non-goals 清单的完整 [Patch Plan](../../templates/zh-CN/patch-plan.md)，加上分支上可运行的 diff——每个改动块都能追溯到根因。

## H. 验收标准

diff 里的每一行都能回答**「为什么必须改这一行？」**，不用含糊其辞；计划中的回归测试存在且能运行。附加检查：`git diff --stat` 里没有你解释不了的文件。

## I. 常见误区

- 把顺手改进（重排版、重命名、依赖升级）混进 Bug 修复 PR；它们应各自独立成 PR——如果确实需要的话。
- 为「保持 diff 小」而省略回归测试；测试是修复质量边界的一部分，不是可选重量。
- 只看总行数。「+12 −3」照样可能是错的——读实际行为变化。

## J. 导航

[← 上一课](./03-root-cause-analysis.md) · [课程目录](./README.md) · [下一课 →](./05-prove-the-fix.md) · [English version](../en/04-minimal-patch.md) · [Patch Plan 模板](../../templates/zh-CN/patch-plan.md) · [Mission 04 提示词](../../prompts/zh-CN/mission-04-minimal-patch.md)
