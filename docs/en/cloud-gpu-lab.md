# Optional Lab — Connecting an AMD Radeon Cloud GPU to Your Laptop

> **A cloud development option, not a prerequisite for this course.** This page covers one thing: preparing a repeatable experiment environment when an issue genuinely needs a GPU.

## First: does the environment even match?

| Problem type | GPU needed? | Is a cloud Linux GPU enough? |
|---|---|---|
| README docs, broken links, install-command errors | Usually not | No cloud GPU needed |
| Pure-CPU bug in an ordinary Python package | Sometimes | Depends on dependencies |
| A kernel failure specific to ROCm on Linux | Usually | **Possibly** — still match gfx, ROCm, and torch versions |
| Windows-specific HIPRTC/driver compile errors | Needs the specific environment | **Linux results alone cannot prove a Windows fix** |

## Shortest setup path

1. Follow the [connect tutorial (Chinese)](https://mp.weixin.qq.com/s/dOAIzJ2qsWPmBSH67q41aA) and the [Radeon Cloud official docs](https://amd-aim.github.io/radeon-cloud-docs/en/) to log in; check eligibility, quota/pricing, and available GPUs/images.
2. Create an instance; **use the SSH user, host, port, and authentication method shown on that instance's page** — there is no universal hostname.
3. Connect from your laptop with a terminal or VS Code Remote-SSH; a browser terminal or Jupyter also works if the platform provides it.
4. In a Python environment **already configured with PyTorch for ROCm**, check the GPU and save the environment summary.

```bash
# Create a key on your own machine (don't overwrite an existing one; read the prompts)
ssh-keygen -t ed25519 -C "my-laptop"

# Replace placeholders with your instance's actual values; never copy a sample host
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

> ROCm-backed PyTorch still uses the `torch.cuda` API naming. **Seeing the GPU is an environment pre-check, not evidence that the target bug reproduced.**

## Record the experiment identity

At minimum: OS, GPU model/architecture, driver, ROCm/PyTorch versions, repository commit SHA, commands, log locations, and whether the test hit the original error. Use the [reproduction report](../../templates/en/bug-reproduction.md) and [validation matrix](../../templates/en/validation-matrix.md). Never merge Windows tests, Linux tests, and different GPUs into one "general" conclusion.

## Cost and safety

- Cloud services may need credits, account eligibility, or payment; check the platform's current rules.
- Add only your **public key** to the platform; never share SSH private keys, tokens, or workstation credentials.
- Don't run scripts from unknown sources; review any install/delete command an AI proposes.
- Save results and stop or release the instance when you're done.

## In the real case

The Windows gfx1151 validation of [ROCm PR #13437](../../case-studies/en/rocm-pr-13437.md) has independent evidence; the related Linux gfx1100/gfx1151 runs are supplementary and do not replace the Windows conclusion.

[简体中文版](../zh-CN/cloud-gpu-lab.md)
