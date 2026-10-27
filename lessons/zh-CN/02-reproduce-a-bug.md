# 02｜发现一个 Bug，如何让它在自己的电脑上复现？

> **本课只解决一个问题：怎样复现并诚实记录 Bug？**
> 预计 45–90 分钟｜前置：[第 01 课](01-find-an-issue.md)选定 Issue，并完成 [Git 速成](../../docs/zh-CN/git-quickstart.md)（克隆仓库、创建工作分支、会看 `git status` / `git diff`）｜成果：[最小复现报告](../../templates/zh-CN/bug-reproduction.md)

## A. 问题

第 01 课你选出了真实 Issue。现在最诱人的动作是让 AI「把它修好」。请忍住。任何人修任何东西之前，都要先回答一个问题：**这个错误在已知环境里是否确实、稳定地发生——并且我能展示给别人看？**

复现不了的 Bug，就无法验证任何后续修复。本课之后的一切都依赖它。

## B. Aha 时刻

**把「训练失败」缩小成同样报错的四行代码，这件事本身就是软件工程能力。**

## C. 一个概念：最小复现程序

**最小复现程序**（minimal reproducer）是仍能触发原始报错的最短程序。它重要有两个原因：输入和依赖越少，之后排查根因的干扰越少；修复后可以用**同一个**程序作为对照的「修复前」一侧。

一个只在某些时候失败、或只在没记录的硬件上失败的程序，还不是复现程序——只是一条线索。

## D. 真实案例

[ROCm/MIOpen #3956](https://github.com/ROCm/MIOpen/issues/3956) 的报告者提供了精简的 `BatchNorm2d` 示例。后续 [PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) 的调查使用了本质上就是这个的最小程序：

```python
import torch
import torch.nn as nn
m = nn.BatchNorm2d(100).cuda()
m(torch.randn(20, 100, 35, 45, device="cuda"))
```

在受影响的 Windows 运行时编译环境中，它抛出 `miopenStatusUnknownError`，更深层日志显示 `fatal error: 'type_traits' file not found`。**这不是一个在任何机器都必然失败的程序**——前置条件不匹配时它正常运行。这正是环境记录属于交付物而非附属品的原因。完整链条见[案例研究](../../case-studies/zh-CN/rocm-pr-13437.md)。

## E. 跟着做

**① 先抄下环境身份。** 记录 OS 与版本、依赖版本、目标代码 Commit、硬件；涉及 GPU 时还要记录驱动、ROCm、GPU 架构。动手改任何东西之前，先克隆项目并创建工作分支——[Git 速成](../../docs/zh-CN/git-quickstart.md)有完整演示。按仓库安装文档操作，尽量使用虚拟环境或容器，不污染系统环境。

**② 按原始报告的步骤原样运行。** 使用**原始、未经修改**的代码和对应软件版本；记录命令、完整输出和异常，不要只截最后一行。最后一行往往是错误*浮现*的位置；完整日志常显示错误*开始*的位置。

**③ 尽可能删减，每删一步都重测。** 把长命令变成短程序，但每删一步都要重新验证同一错误仍会出现。错误消失，说明你删掉了触发条件——加回来并记录。

**④ 用同一环境重复测试。** 一次偶发错误与稳定错误是两回事；记录复现成功率、缓存状态和随机种子（如适用）。

### 没有 GPU 怎么办？

如果 Issue 确实需要 Linux ROCm GPU，可选的 [AMD Radeon Cloud 实验室](../../docs/zh-CN/cloud-gpu-lab.md)说明如何获得匹配环境——先核对 OS、GPU 和软件栈是否与原问题一致。例如 #13437 的 Windows 特有编译错误**不能**仅靠 Linux 云实例复现并证明修复。完全没有 GPU 的同学，请优先选择文档、纯 Python 或纯 CPU 问题——本课程不要求购买硬件。

## F. CodeX 提示词

> 我的目标 Issue 是：[URL]。请阅读其最新描述与评论，提取文档中可验证的复现步骤和环境要求，列出安全的最小执行计划；执行前说明每个命令会影响什么；不要安装来路不明的脚本。运行后保存实际命令、完整错误日志与版本信息。将结果标注为 REPRODUCED / NOT REPRODUCED / BLOCKED；「未复现」绝不能被说成「Bug 不存在」。

独立文件版：[Mission 02 提示词](../../prompts/zh-CN/mission-02-reproduce-a-bug.md)

## G. 预期成果

填写完整的 [最小复现报告](../../templates/zh-CN/bug-reproduction.md)：环境、Commit、最小代码、确切命令、原始日志保存位置、复现状态。

## H. 验收标准

只看你的报告、从未见过原 Issue 的另一个人，能在类似机器上独立尝试相同实验。即使结果是 **BLOCKED**（环境无法匹配），只要阻塞条件记录清楚，同样算通过。记录清楚的 BLOCKED 比编造的 PASS 有价值。

## I. 常见误区

- 重装软件直到错误消失，却不记录哪个变量导致了差异——最后连你自己都不知道是什么「修好」了它。
- 因为云 GPU 实例跑通了一个负载，就默认它覆盖所有 GPU/Windows 问题。一台 Linux 机器只证明这一台机器。
- 把缓存里的旧编译结果当作新代码的测试成功；记录你如何排除了缓存，或如实说明没有检查。

## J. 导航

[← 上一课](./01-find-an-issue.md) · [课程目录](./README.md) · [下一课 →](./03-root-cause-analysis.md) · [English version](../en/02-reproduce-a-bug.md) · [复现报告模板](../../templates/zh-CN/bug-reproduction.md) · [Mission 02 提示词](../../prompts/zh-CN/mission-02-reproduce-a-bug.md)
