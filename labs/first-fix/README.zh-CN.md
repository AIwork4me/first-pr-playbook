# 入门实验：15 分钟完成你的第一次 Bug 修复

**[English version](README.md)**

这是一个为零基础学习者设计的独立动手练习。你将运行一个真实的测试、亲眼看到它失败、理解失败原因、做出最小修复，再看到它通过——这正是 [First PR Playbook](../../README.zh-CN.md) 整套课程教的「红 → 绿」纪律，浓缩在一个小小的 Python 函数里。

不需要 GPU、不需要账号、不需要 AI 助手、不需要联网，也不需要安装任何第三方包——只需要 Python 本身。

```text
打开实验 → 运行一个小程序 → 看到一个真实的失败测试 →
理解失败原因 → 做出最小修复 → 再次运行测试 →
看到 PASS → 理解改了什么、为什么这样改
```

**时间预期。** 在 Python 已装好的前提下，练习本身大多数学习者约 **15 分钟**完成。如果还没装 Python，请额外预留 10–20 分钟——那是一次性的环境准备，不算在练习时间内。超过 15 分钟完全正常：目标是理解，不是速度。

## 步骤 1 — 准备：确认 Python 可用

你需要 Python 3.8 或更新版本，Windows、macOS、Linux 均可。

打开终端（Windows 用 PowerShell，macOS 用「终端」，Linux 用任意 shell），按操作系统选择一条命令检查：

```bash
py --version          # Windows（"py" 启动器）
python3 --version     # macOS / Linux
python --version      # 部分系统（主要是 Windows）也有这个
```

只要其中一条打印出类似 `Python 3.11.4` 的版本号，就可以继续。如果每条命令都提示「不是内部或外部命令」或「command not found」（Windows 弹窗询问用什么程序打开 `.py` 文件也算），请到 [python.org](https://www.python.org/downloads/) 下载安装——Windows 安装时勾选 **"Add python.exe to PATH"**——装完后重新打开终端再检查一次。

## 步骤 2 — 运行那个失败的测试

在终端里进入**你下载的本课程仓库文件夹**（即包含顶层 `README.md` 和 `labs/` 目录的那个文件夹），然后进入实验目录并运行测试：

```bash
# Windows（PowerShell 或命令提示符）
cd labs\first-fix
py run_tests.py

# macOS / Linux
cd labs/first-fix
python3 run_tests.py
```

**按下回车之前——先预测。** 实验文件 `buggy.py` 里有 `normalize_title("  fix  typo   in docs  ")`。你觉得它会返回什么字符串？先把你的猜想写下来，再运行。

示例输出（实际输出类似如下，文件路径会不同）：

```text
test_already_normalized_title_is_unchanged ... ok
test_collapses_tabs_and_newlines_to_single_spaces ... FAIL
test_strips_and_collapses_inner_spaces ... FAIL
test_whitespace_only_title_becomes_empty ... ok

======================================================================
FAIL: test_strips_and_collapses_inner_spaces
----------------------------------------------------------------------
AssertionError: 'fix  typo   in docs' != 'fix typo in docs'
- fix  typo   in docs
?    -      --
+ fix typo in docs

----------------------------------------------------------------------
Ran 4 tests in 0.001s

FAILED (failures=2)
```

两个测试**失败**了。这不是安装坏了——这恰恰是实验按设计在工作。你看到的是一个货真价实的「红灯」测试。

## 步骤 3 — 理解失败

**先自己判断：** 只看 `AssertionError` 那一行，你能说出函数实际返回了什么、而不是期望值吗？

然后用编辑器打开 `buggy.py` 通读一遍。整个函数只有一行：`return title.strip()`。把失败拆成三部分对照：

- **期望**（测试的要求）：`'fix typo in docs'`——单词之间只有单个空格。
- **实际**（代码的产出）：`'fix  typo   in docs'`——中间多余的空格原样保留。
- **原因：** Python 的 `str.strip()` 只删除字符串**两端**的空白字符。开头的 `"  "` 和结尾的 `"  "` 确实被删掉了，但第一个字符和最后一个字符之间的内容原封不动。一个 Bug，两个失败测试：制表符/换行那个测试失败的原因完全相同。

再打开 `run_tests.py`，找到产生失败的那一行。你会发现「测试」的本质：一句「这个输入必须产生这个输出」的断言，由机器来检查——不是一种观点。

## 步骤 4 — 修复这个 Bug

**先预测：** 能解决这个问题的**最小**改动是什么？（规则：只能改 `buggy.py`，永远不要改 `run_tests.py`——测试就是需求规格。）

**路线 A — 使用 AI 编程助手。** 把下面这段提示词交给助手，接受任何修改之前先自己审一遍：

```text
我在 first-pr-playbook 仓库的 labs/first-fix 目录。buggy.py 中的
normalize_title() 函数有 Bug：run_tests.py 报告两个失败测试。
请阅读 buggy.py 和 run_tests.py，用平实的语言解释当前实现到底
做了什么；然后给出能让四个测试全部通过的最小修改方案，只改
buggy.py，不要改 run_tests.py。除非你真的运行过测试命令并看到
输出 OK，否则不要声称成功——把真实输出贴给我看。
```

**路线 B — 自己动手。** 先独立尝试；卡住了再按顺序看提示，一次只看一条：

1. 重读 `AssertionError`：哪些字符必须消失？
2. 想想 `"fix  typo   in docs".split()` 返回什么。可以现场试：Windows 运行 `py -c "print('fix  typo   in docs'.split())"`，macOS/Linux 运行 `python3 -c "print('fix  typo   in docs'.split())"`。
3. 如果你得到了一个单词列表：怎样把列表用单个空格拼回一个字符串？
4. 还是卡住？带讲解的参考答案在 [solutions/reference_solution.py](solutions/reference_solution.py)——看完讲解后，请务必亲手把修复再敲一遍。

## 步骤 5 — 验证修复

运行与步骤 2 **完全相同**的命令：

```bash
py run_tests.py          # Windows
python3 run_tests.py     # macOS / Linux
```

示例输出：

```text
test_already_normalized_title_is_unchanged ... ok
test_collapses_tabs_and_newlines_to_single_spaces ... ok
test_strips_and_collapses_inner_spaces ... ok
test_whitespace_only_title_becomes_empty ... ok

----------------------------------------------------------------------
Ran 4 tests in 0.001s

OK
```

最后那个 `OK` 就是你的证据。**怎么证明修复真的有效，而不是轻信 AI 助手（或我们自己）？** 因为之前失败的还是那四个测试，现在全部通过——同一条命令、同一个测试文件，且从未被改动。没有任何东西被模拟或写死：测试在你动手之前就写好了，而且不允许你改。

如果输出仍然有 FAIL，那是正常的工程过程，不是失败：重新读新的 `AssertionError`（文件保存了吗？有没有拼写错误？），调整后再运行。

## 步骤 6 — 庆祝：写下你的三句话总结

你刚完成了一次真实的「红 → 绿」循环。用三句话把它记进学习日志：

1. **Bug 是什么：** *`normalize_title()` 只删除字符串两端的空白字符，标题中间的连续空格被原样保留。*
2. **修复是什么：** 我把 `title.strip()` 换成 `" ".join(title.split())`，它按任意连续空白切分、再用单个空格拼回。
3. **证据是什么：** *修复前 `run_tests.py` 报告 2 FAIL / 2 ok，修复后报告 `OK (4 tests)`——同一条命令，同样的、未被改动的测试。*

如果这三句话你能用自己的话写出来，你就不是「过了一遍教程」，而是练就了开源审阅者最看重的技能：结论、改动、证据。

## 步骤 7 — 继续学习

- 下一步：[第 01 课 — 找到适合你的第一个真实 Issue](../../lessons/zh-CN/01-find-an-issue.md)，为自己常用的项目挑一个真实问题。
- 第 01 课之后、[第 02 课](../../lessons/zh-CN/02-reproduce-a-bug.md)之前，请阅读 [Git 速成](../../docs/zh-CN/git-quickstart.md)——本课程从第 02 课起需要的 Git 生存指南。
- 完整导览：[从这里开始](../../docs/zh-CN/start-here.md)。

## 故障排查

| 现象 | 可能原因与解决办法 |
|---|---|
| `python`/`py`/`python3` 不是内部或外部命令 / command not found | 未安装 Python 或未加入 PATH。到 [python.org](https://www.python.org/downloads/) 重装；Windows 安装时勾选 **Add python.exe to PATH**；重开终端。Windows 优先用 `py` 启动器。 |
| 到底用 `python`、`python3` 还是 `py`？ | Windows：先试 `py`，再试 `python`。macOS/Linux：用 `python3`。步骤 1 中哪条命令能打印版本号，就用哪个。 |
| `can't open file 'run_tests.py'` 或 `No such file or directory` | 工作目录不对。Windows 用 `cd`（macOS/Linux 用 `pwd`）查看当前位置，然后 `cd` 进入下载仓库里的 `labs/first-fix` 目录。 |
| `ModuleNotFoundError: No module named 'buggy'`（找不到模块 `buggy`） | 你在实验目录之外运行了测试。两个文件必须在同一目录——先 `cd labs\first-fix`（Windows）或 `cd labs/first-fix`（macOS/Linux）再运行。 |
| `Ran 0 tests` / 测试似乎没被发现 | 你可能在用 `python -m unittest discover` 之类的发现模式。不要用——直接运行文件：`py run_tests.py` / `python3 run_tests.py`。（测试文件叫 `run_tests.py` 正是为了避免仓库里其他批量测试自动发现它。） |
| 编辑 `buggy.py` 后提示语法错误 | 有拼写错误（少了引号、括号或冒号）。错误信息会标出行号；对照原来的 `return title.strip()` 那一行检查。 |
| 第一次运行就全部 `ok`（基线意外变绿） | `buggy.py` 已经被修好了——可能是你或 AI 助手此前改过。恢复初始状态：在仓库根目录运行 `git checkout -- labs/first-fix/buggy.py`（或重新下载仓库），然后从步骤 2 重新开始。 |
| 修复后运行测试仍然失败 | 读新的 `AssertionError`——它精确告诉你实际输出与期望的差别。确认文件已保存、改的是 `buggy.py` 本体（不是副本）、没有改过 `run_tests.py`。 |

## 给维护者：这个实验如何保证 CI 安全

失败的初始代码是**有意为之**——请不要在正式仓库里"顺手修好" `buggy.py`，那会删掉整个练习。两道保护让常规 CI 保持绿色：

1. 测试文件命名为 `run_tests.py`，既不匹配 pytest 的默认模式（`test_*.py`、`*_test.py`），也不匹配 `unittest discover` 的默认模式（`test*.py`），任何标准的批量测试都不会误踩这个故意失败的测试。
2. [verify_lab.py](verify_lab.py) 在**临时目录内**验证实验：断言初始代码以预期的断言方式失败、[参考答案](solutions/reference_solution.py)通过同一套测试、并拒绝损坏状态（崩溃、基线意外变绿）。CI 运行 `python labs/first-fix/verify_lab.py --self-test`。
