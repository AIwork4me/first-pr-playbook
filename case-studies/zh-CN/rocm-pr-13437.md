# 真实案例：ROCm/rocm-libraries PR #13437

> **已合并，不是「仅已提交」。** 该 PR 于 **2026-10-19 UTC** 合入 ROCm/rocm-libraries，TheRock [#9359](https://github.com/ROCm/TheRock/pull/9359) 在 2026-10-20 UTC 合并了包含这一更改的依赖更新。记录日期按 GitHub UTC 显示。[English version](../en/rocm-pr-13437.md)

## 1. 用户真实问题

[MIOpen Issue #3956](https://github.com/ROCm/MIOpen/issues/3956)（2026-04-22 创建，现已关闭）：Windows Radeon RX 9060 XT 用户使用 PyTorch BatchNorm2d 时触发 `miopenStatusUnknownError`。日志进一步揭示运行时编译缺少 `<type_traits>` 头文件。**这是问题来源，不是说这名用户的设备或所有受影响机器都被本 PR 全面验证。**

## 2. 最小复现

```python
import torch
import torch.nn as nn
m = nn.BatchNorm2d(100).cuda()
m(torch.randn(20, 100, 35, 45, device="cuda"))
```

当目标环境命中该问题时，hipRTC 编译失败并出现 `fatal error: 'type_traits' file not found`。该程序**并非在任意机器上都会失败**——前置条件不匹配时它正常运行。

## 3. 根因与最小修复

目标 Windows runtime-only ROCm 环境下 HIPRTC 不一定能访问宿主 C++ 标准库，MIOpen GPU kernel headers 对 `<type_traits>`、`<utility>`、`<initializer_list>` 的隐式依赖导致运行时编译失败。最终修复让对应已有 MIOpen headers 自包含：依据 `__has_include` 选择真实标准库或最小回退实现，保留现有定义顺序与格式，不做无关重构，并加入回归测试。详情见 [PR 描述与 Files changed](https://github.com/ROCm/rocm-libraries/pull/13437/files)。最终改动 **7 个文件，+317/−21**，base 分支 `develop`。

## 4. 三轮 Review 的教育价值

| 轮次 | 来自维护者的关键建议（真实、可点击） | 可迁移的方法论 | 原始证据 |
|---|---|---|---|
| 第一轮 | AMD 职务成果应写正确版权；用已有 gtest 基础设施而非独立测试；清理只能靠外部实验日志理解的注释 | 遵守社区架构、权属与可维护性 | [Review 1](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5489844163) |
| 第二轮 | 合并不必要的 freestanding 独立头文件；去掉 HIP < 7 旧兼容判断；把测试简化为平凡 inline kernel | 最小补丁不等于「做得越多越好」 | [Review 2](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5502061602) |
| 第三轮 | 保持 develop 的定义顺序与 `typedef` 用法；删冗余注释；执行 clang-format / pre-commit | 差异清晰，有利于快速审阅与降低回归风险 | [批准记录](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5551696370) |

关于第一轮的说明：维护者该轮 Review 正文写明「First pass below is an automated AI review」——这是维护者运行的自动化初审；上表内容来自其 inline comments（2026-10-27 经 GitHub API 核实）。第三轮以「LGTM, thanks! Will merge once CI is green.」收尾。

## 5. 可以验证的结果与边界

PR 作者提供的证据表明，在 **Windows 11，Radeon 8060S / gfx1151** 对最终 HEAD 的验证中：无宿主 STL 的 HIPRTC 回归测试通过；未修复代码按预期重现 `type_traits` 错误；BatchNorm 前向/反向通过数值检查；kthvalue 27/27 通过；YOLO26n COCO8 完成单轮 **FP32** 训练。

- **未宣称**所有 Windows Radeon GPU 都已通过。
- **未宣称** AMP 训练通过：AMP 检查异常在未修改 shipping wheel 中亦可发生。
- 先前 Linux gfx1100 / gfx1151 测试属于**历史补充证据**，不能冒充最终 HEAD 同时在 Linux 本机重新完成的验证；Linux 某些 no-STL 隔离测试因环境注入 STL 会 SKIP，**SKIP 不是 PASS**。
- 时间性能对照证据不完整，不能据此宣传加速收益。

原始独立证据与结果限制：[AIwork4me/Ultralytics-Windows-ROCm-Training-RCA](https://github.com/AIwork4me/Ultralytics-Windows-ROCm-Training-RCA)。

## 6. 维护者批准与合入

2026-10-16 UTC，维护者评论 `LGTM, thanks! Will merge once CI is green.`，[原文](https://github.com/ROCm/rocm-libraries/pull/13437#pullrequestreview-5551696370)。作者随后在 [证据评论](https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225886811) 中记录 `d4b574ac` 上七项主要 CI 工作流通过。PR 于 2026-10-19 UTC 合并；TheRock 相关依赖更新于 2026-10-20 UTC 合并。「已合并进 develop」**不代表**所有下游发行版已立即包含该修复。

## 7. 这不是「AI 自动合并 PR」

提交者在 [公开评论](https://github.com/ROCm/rocm-libraries/pull/13437#issuecomment-6225928183) 中明确：人类负责调查方向与工程决策，CodeX 协助 RCA、实现、测试与独立验证。**所有代码、测试和公开回复仍由人审阅并承担责任。**

**教学目标**：让新手复制的是方法，不是要求新手复现同样难度的 ROCm 底层工程问题。

---

本案例全部证据链接的索引：[case-studies/README.md](../README.md)。
