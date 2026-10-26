# 可选实验室：把 AMD Radeon Cloud GPU 接入笔记本

> **这是一种云端开发方案，不是课程入门的必选前提。** 本篇只解决：遇到确实需要 GPU 的 Issue 时，如何准备可重复的实验环境。

## 先做环境匹配判断

| 问题性质 | 是否需要 GPU | 云端 Linux GPU 是否足够 |
|---|---|---|
| README 文档、链接/安装命令错误 | 通常不需要 | 无需云 GPU |
| 普通 Python 包的纯 CPU Bug | 不一定 | 视依赖而定 |
| Linux ROCm 上某内核异常 | 通常需要 | **可能适合**，仍需匹配 gfx、ROCm、torch 等版本 |
| Windows 特有的 HIPRTC/驱动编译错误 | 通常需要特定环境 | **不能仅凭 Linux 结果证明 Windows 修复** |

## 最短准备流程

1. 根据 [公众号连接教程](https://mp.weixin.qq.com/s/dOAIzJ2qsWPmBSH67q41aA) 和 [Radeon Cloud 官方文档](https://amd-aim.github.io/radeon-cloud-docs/zh-cn/) 登录平台，检查资格、配额/收费与可用 GPU/镜像。
2. 创建云端实例；**以实例页面提供的 SSH 用户、主机地址、端口和认证方式为准**——不存在通用主机名。
3. 在本机使用终端或 VS Code Remote-SSH 连接，远程编辑与运行代码；若平台提供浏览器终端/Jupyter，也可使用。
4. 在**已配置 PyTorch ROCm** 的 Python 环境中检查 GPU，留存环境摘要。

```bash
# 在自己的电脑上创建密钥（不覆盖已存在密钥，先阅读提示）
ssh-keygen -t ed25519 -C "my-laptop"

# 按实例提供的信息替换占位符；不要直接复制示例的主机地址
ssh -p <PORT> <USERNAME>@<HOST>
```

```python
import platform
import torch
print("OS:", platform.platform())
print("PyTorch:", torch.__version__)
print("CUDA API available:", torch.cuda.is_available())
if torch.cuda.is_available():
    print("GPU:", torch.cuda.get_device_name(0))
```

> ROCm 后端的 PyTorch 通常仍使用 `torch.cuda` API 命名。**能识别 GPU 只是环境预检查，不代表目标 Bug 已复现。**

## 记录实验身份

至少记录：操作系统、GPU 型号/架构、驱动、ROCm/PyTorch 版本、仓库 Commit SHA、执行命令、日志位置、测试是否命中原错误。使用[复现模板](../../templates/zh-CN/bug-reproduction.md)和[验证矩阵](../../templates/zh-CN/validation-matrix.md)。不要把 Windows 测试、Linux 测试或不同 GPU 的结果混写成一条通用结论。

## 成本与安全

- 云服务可能需要积分、账号资格或费用；查看平台当前规则。
- 只将**公钥**添加到平台，不分享 SSH 私钥、令牌和工作环境凭据。
- 不运行来源不明的脚本，先审查 AI 提议的安装或删除命令。
- 工作结束及时保存成果、停止或释放实例。

## 对应真实案例

[ROCm PR #13437](../../case-studies/zh-CN/rocm-pr-13437.md) 的 Windows gfx1151 验证有独立证据；相关 Linux gfx1100/gfx1151 验证属于补充材料，并不能替代 Windows 结论。

[English version](../en/cloud-gpu-lab.md)
