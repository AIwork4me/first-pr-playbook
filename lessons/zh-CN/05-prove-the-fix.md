# 05｜AI 说 Bug 修好了，怎么证明它真的修好了？

> **本课只解决一个问题：用什么证据证明修复有效？**
> 预计 45–90 分钟｜前置：[第 04 课](04-minimal-patch.md)的最小补丁已提交到你的分支——基线与修复后两个状态各对应一个记录在案的 Commit（见 [Git 速成](../../docs/zh-CN/git-quickstart.md)）｜成果：[验证矩阵](../../templates/zh-CN/validation-matrix.md)

## A. 问题

「Tests passed!」是 AI 助手最爱汇报的好消息。但如果测试根本没执行到原始 Bug，或者编译器悄悄复用了缓存里的旧构建，这句话毫无价值——你要是在 PR 里照搬，Reviewer 会（理应）不再信任你写的任何东西。真正的验证，要设计到**怀疑你的人也能亲自重跑**。

## B. Aha 时刻

**未修复的代码应当失败，修复后的代码应当通过——条件完全相同——而且两边都要有日志。**

## C. 一个概念：Baseline/Patched 对照与诚实的状态

两个概念撑起本课：

- **A/B 对照。** Baseline 是记录在案的、未修复代码的 Commit；Patched 是修复后的 Commit。其余一切——输入、环境、版本——全部固定，唯一变化的变量是补丁。
- **不撒谎的测试状态。** PASS 指你定义的断言实际运行并通过；FAIL 指运行了但失败；SKIP 指前置条件缺失而跳过，**SKIP 不是 PASS**；NOT RUN 指从未执行；EXPECTED_FAIL 指负对照*按预期*失败（例如 Baseline 触发原始 Bug）。

## D. 真实案例

[ROCm PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) 不只证明「修复后没报错」。在相同测试条件下，**未修复**代码重现了原始的 `type_traits` 缺失签名，修复后通过。新增的 no-STL 回归测试会先验证测试环境中宿主 STL 确实不可达，并改变编译参数，防止**旧 GPU 内核缓存**伪造通过。最终 HEAD 上，作者记录的验证（Windows 11 / Radeon 8060S，gfx1151）覆盖 HIPRTC 回归测试、BatchNorm 前向/反向数值检查、kthvalue 27/27、以及 YOLO26n COCO8 **FP32** 单轮训练。明确**未宣称**：AMP 训练通过；覆盖所有 Windows AMD GPU。细节见[案例研究](../../case-studies/zh-CN/rocm-pr-13437.md)与作者的 [CI 证据评论](https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225886811)。

## E. 跟着做

**① 设定 Baseline 与 Patched 运行。** 固定输入、环境、依赖版本，记录两个 Commit SHA；尽量在同一台机器上先后执行。

**② 写「红—绿」回归测试。** 在*未修复*代码上，测试必须以你预先描述的方式失败（「红」）；在修复后代码上通过明确断言（「绿」）。若测试前置条件在你的环境不满足，标注 SKIP 并写明原因——永远不要发明 PASS。

**③ 验证相关功能没有退化。** 先跑补丁涉及区域的现有测试套件，再按原始 Issue 的真实场景跑一遍。本地无法运行的 GPU 测试可参考可选的[云端实验室](../../docs/zh-CN/cloud-gpu-lab.md)——无论是否使用，都要记录 OS/架构/版本边界。

**④ 排除缓存与数值陷阱。** 若修复涉及编译内核或浮点行为，明确说明：缓存是否重建或绕过、旧结果是否可能被复用、输出差异是否在合理公差内。

## F. CodeX 提示词

> 请为我的补丁设计并执行验证矩阵：(1) 未修复 Commit 上原始错误的基线复现；(2) 修复后 Commit 上的同输入验证；(3) 新增回归测试；(4) 相关既有测试；(5) 受影响的真实工作负载。记录每条命令、环境、版本、Commit SHA、退出状态与日志保存位置。每项标为 PASS / FAIL / SKIP / NOT RUN / EXPECTED_FAIL——绝不把 SKIP 算作 PASS。列出未验证的 OS、GPU、精度与负载，并给出证据能支持的最窄结论。

独立文件版：[Mission 05 提示词](../../prompts/zh-CN/mission-05-prove-the-fix.md)

## G. 预期成果

填写完整的 [验证矩阵](../../templates/zh-CN/validation-matrix.md)：一个可复现的基线、一个可检查的修复结果、一道回归防线——每一项都附真实命令输出。

## H. 验收标准

矩阵能回答三个问题：**基线失败能重跑吗？修复行为能重跑吗？回归测试守住它了吗？** 没执行的格子写清原因。诚实的 NOT RUN 每次都赢过编造的 PASS。

## I. 常见误区

- 把「跑通一次没崩」当回归验证。一次成功是轶事，一张矩阵才是证据。
- Linux 上通过就宣称 Windows 问题已解决。平台结论不向任何方向自动迁移。
- 混淆 EXPECTED_FAIL（负对照按预期失败）与 FAIL（你的修复弄坏了东西）——两者含义相反。

## J. 导航

[← 上一课](./04-minimal-patch.md) · [课程目录](./README.md) · [下一课 →](./06-open-first-pr.md) · [English version](../en/05-prove-the-fix.md) · [验证矩阵模板](../../templates/zh-CN/validation-matrix.md) · [Mission 05 提示词](../../prompts/zh-CN/mission-05-prove-the-fix.md)
