# Git 速成：第 02 课之前你需要掌握的最少 Git 知识

**[English version](../en/git-quickstart.md)**

> **课程位置：** 在[第 01 课](../../lessons/zh-CN/01-find-an-issue.md)之后、[第 02 课](../../lessons/zh-CN/02-reproduce-a-bug.md)之前 · 用时约 20 分钟 · 前置条件：已安装 [Git](https://git-scm.com/downloads) · **本页任何操作都不需要登录 GitHub、不需要 SSH 密钥、不需要任何账号权限。**

## 为什么需要这一页

从第 02 课开始，课程会要求你把一个项目的代码拿到本地、在已知状态下运行、并精确记录改动了什么。这就要用到 Git——但完整的 fork → push → pull request 流程要到[第 06 课](../../lessons/zh-CN/06-open-first-pr.md)才正式讲。本页只覆盖你**现在**就需要的那一小块本地 Git 操作，让第 02–05 课不再有知识断层。

好消息是：**本页所有操作都只发生在你自己的电脑上**，不可能弄坏任何公开项目。

## 四个核心概念

- **Git** — 一个版本控制程序，为一个文件夹录制快照（"commit / 提交"），使每一次改动都可以被查看、对比和撤销。
- **仓库（repository / repo）** — 一个被 Git 记录历史的文件夹。你电脑上的这份拷贝和 GitHub 上的那份一样，都是完整的仓库。
- **克隆（clone）** — 把远程仓库连同完整历史下载到本地的拷贝。对公开仓库执行 `git clone` 不需要账号、不需要登录。
- **分支（branch）** — 仓库里一条独立命名的改动线。在自己的分支上工作，你的实验就和别人的工作互不干扰。

## 五分钟沙盒：亲手创建一个仓库

在这里你不会弄坏任何东西——这个仓库只属于你。按你的系统运行命令（Windows 用 PowerShell；macOS 用「终端」；Linux 用任意 shell）。Git 命令在三个平台上完全相同，只有 `cd` 的写法略有差异。

```bash
# 1. 创建练习文件夹，并把它变成 Git 仓库
cd ~                    # Windows PowerShell 下 cd ~ 同样有效
mkdir git-practice
cd git-practice         # 然后执行：git init
git init
```

```text
Initialized empty Git repository in .../git-practice/.git/
```

> **如果 `mkdir` 提示文件夹已存在**：不要 `cd` 进去——已存在的 `git-practice` 里可能是别人的真实文件。换一个新名字（如 `git-practice-2`），并在下方所有命令中统一使用它。`mkdir` 失败时什么都没有创建、没有造成任何影响——换个名字继续即可。

```bash
# 2. 创建文件：用任意文本编辑器（记事本、VS Code、TextEdit、gedit）
#    在 git-practice 文件夹里保存一个 notes.txt，内容为：
#    "my first note"
git status
```

```text
Untracked files:
  notes.txt
```

`git status` 是你的「我在哪」命令——任何时候感到迷茫就运行它。现在的输出表示：Git 看到了一个尚未记录的新文件。

```bash
# 3. 录制第一个快照（一次"提交"）
git add notes.txt
git commit -m "add first note"
```

> **如果 `git commit` 提示 "Please tell me who you are"**：Git 需要为每个提交盖章一个姓名和邮箱，而当前还没有配置。只需**为这个沙盒仓库单独设置**（不改动全局配置，也不会发布任何东西）：
>
> ```bash
> git config user.name "Your Name"
> git config user.email "you@example.com"
> ```
>
> 然后重新运行 `git commit` 那一行。每个仓库只需设置一次。Windows 上你可能还会看到 `LF will be replaced by CRLF` 之类的警告——那是 Git 在统一换行符格式，这里可以放心忽略。

```bash
# 4. 做一处改动，并在记录之前先查看它
#    （用编辑器打开 notes.txt，追加第二行 "my second note"）
git diff
```

```diff
+my second note
```

（上面只是**关键的那一行**，实际输出比这长。你还会看到 `diff --git`、`index`、`@@ -1 +1,2 @@` 这类行——它们在说明「哪个文件的哪几行变了」，不是报错，不用管。）

顺带说明 `\ No newline at end of file` 这行提示：它的意思是「这个文件的最后一行结尾没有换行符」——也就是你写到最后没有按过回车。遇到这种情况，Git 会把那一行当成「先删掉、再写一遍」，所以下一步 `git commit` 可能报出「2 行新增、1 行删除」，而你其实只加了一行。这不是你操作错了。

`git diff` 逐行显示自上次提交以来改了什么。亲自读这个输出——而不是依赖记忆或 AI 的转述——正是第 04、05 课要建立的核心习惯。读完之后，用与之前完全相同的方式记录这个改动：

```bash
git add notes.txt
git commit -m "add second note"
```

```bash
# 5. 试试分支——本页的重点
git switch -c experiment/new-note      # 创建并切换到新分支
# （再次编辑 notes.txt：追加一行 "experimental line"）
git add notes.txt                      # 把改动记录在"这条"分支上
git commit -m "add experimental line"
git status                             # 显示：On branch experiment/new-note
git branch                             # 列出分支；* 标记你当前所在的分支
git switch -                           # 回到你之前所在的分支
                                       #（无论默认分支叫什么名字都有效）
```

「git switch -」（一个短横线）会带你回到*当前分支之前*你所处的分支——在这个流程里，就是 `git init` 创建的那条默认分支，无论 Git 把它命名为 `main` 还是 `master`。不需要查名字，也不需要猜。上面的 `git branch` 仍会列出所有分支并用 `*` 标记当前分支——真正需要名字的时候用它。（较老的 Git 用 `git checkout -` 也能实现。）

切回去之后，亲自核对文件内容——不要只读下面的文字：

```bash
cat notes.txt        # PowerShell 也可用 type notes.txt
```

```text
my first note
my second note
```

你的 "experimental line" 不见了——不是被删除，而是被安全地存放在另一条分支上（能这样是因为你先在那条分支上*提交*了它；未提交的改动会跟着你一起换分支）。再切回实验分支确认一次：

```bash
git switch experiment/new-note
cat notes.txt
```

```text
my first note
my second note
experimental line
```

**这就是分支的心智模型：分支是一张你可以随时离开的办公桌，磁盘上的文件永远反映你当前所在的分支。**

### 清理沙盒（可选——以及怎样安全地删除）

你**不是必须删除**什么：沙盒只是一个小文件夹，留着不占什么空间。但真实的开源工作迟早会遇到删除命令，所以现在就把安全模式学会——**先查看，再删除，而且只删除你刚刚列出并确认过的文件夹**：

```bash
cd ~                    # 回到用户主目录
pwd                     # 再次确认位置：应打印主目录路径
ls -A git-practice      # 查看：必须只有 notes.txt 和 .git
                        #（-A 会列出 .git 这样的隐藏条目）
rm -r git-practice      # 确认无误后才删除（macOS / Linux）
```

PowerShell 等价写法，同样遵守先查看再删除：

```powershell
cd ~
pwd
dir git-practice -Force   # 查看：必须只有 notes.txt 和 .git
                          #（-Force 会列出 .git 这样的隐藏条目）
Remove-Item -Recurse -Force git-practice
```

- 如果查看步骤显示出**任何你不认识的东西**——多出来的文件、别的文件夹——**立即停止**。那个文件夹不是本沙盒，删除它从来不是这个练习的一部分。
- 想要更直观的确认？直接在文件管理器（资源管理器 / Finder）里删除该文件夹——你能亲眼看到什么消失了。
- 永远不要对没有先列出来查看过的文件夹执行删除命令——包括上面的命令。`rm -r` 和 `Remove-Item -Recurse` 会删除指定文件夹内的**全部内容**。

## 安全地"阅读"一个真实仓库

以下命令只**查看**，不修改任何东西：

```bash
git clone https://github.com/<OWNER>/<REPO>.git   # 匿名、免登录，适用于公开仓库
cd <REPO>
git remote -v        # 这份拷贝从哪来 / 会把改动送到哪
git branch -a        # 所有分支，含远程分支
git status           # 当前在哪个分支；改了什么
git diff             # 未暂存的改动，逐行显示
git diff --stat      # 同上，按文件汇总为一行一个
```

`git remote -v` 会打印一到两组命名 URL，通常是：

```text
origin   https://github.com/<OWNER>/<REPO>.git (fetch)
origin   https://github.com/<OWNER>/<REPO>.git (push)
```

`origin` 的意思只是"我克隆自的那份拷贝"。在[第 06 课](../../lessons/zh-CN/06-open-first-pr.md)你会遇到 `upstream`——指向官方项目的第二个远程——但本页不需要它。

## 面向真实 Issue 修改代码之前

当第 02 课带你进入一个真实项目时，**在改动任何文件之前**按这个顺序做：

1. **克隆项目**（上面的命令）——不要"下载 ZIP"：历史记录本身就是你要保存的证据的一部分。
2. **阅读仓库根目录的 `CONTRIBUTING.md`**（如果有）。它写明了 PR 的目标分支、提交风格和维护者的其他期望。**不要想当然地以为默认分支就是 `main`**——例如本课程的案例 [ROCm PR #13437](https://github.com/ROCm/rocm-libraries/pull/13437) 面向的是 `develop` 分支。`git branch -a` 能看到实际存在哪些分支。
3. **先创建工作分支，再动手改：**

```bash
git switch -c investigate/issue-<编号>     # 例如 investigate/issue-3956
# ……然后才是编辑文件、跑测试、做记录……
git status        # 随时确认：你还在"自己的"分支上
```

用 Issue 编号命名分支，让工作不言自明。先建分支再改代码，意味着后续每一步——第 04 课的 diff、第 05 课的提交对比、第 06 课的 PR——都有一个干净、隔离的归宿。第 06 课会直接接手这条分支，你不需要把工作搬来搬去。

## 怎样避免改错分支

- **每次开始工作前先运行 `git status`。** 它一行就能回答"我在哪个分支上"。把它变成条件反射，就像变道前先看后视镜。
- **早提交、小提交。** 未提交的改动会跟着你切换分支——这是新手不小心把两件事混在一起的最常见原因。小而频繁的提交让每条分支的历史保持清晰。
- **把默认分支（`main`/`master`/`develop`）当作大堂，而不是你的办公桌。** 工作在自己的分支上做；在默认分支上只"读"代码。

## 为什么上游仓库不是练习场

你在本页做的一切都只存在于你的电脑上。公开项目看不到你的分支、你的提交、你的沙盒——直到第 06 课，由**你**主动通过 pull request 提议一个改动。由此引出三条规则：

1. **永远不要在繁忙的上游仓库提"测试"或"hello world" PR 来练习流程。** 维护者的审阅时间是公共资源；要练习就在自己的沙盒里练（比如上面那个）。
2. **即使在本地，也不要把实验提交到默认分支**——那是你与项目保持同步的地方，混入私人改动后 diff 会变得混乱。
3. **推送是之后的、深思熟虑的一步。** 第 02–05 课不需要登录 GitHub，也不需要任何地方的写权限。如果某个教程让你在理解改了什么之前就 push，停下来，重新读一遍你的 `git diff`。

## 命令速查表

| 命令 | 作用 | 会修改什么吗？ |
|---|---|---|
| `git clone <URL>` | 下载仓库拷贝及完整历史 | 只新建一个本地文件夹 |
| `git status` | 显示当前分支和待处理改动 | 否（只读） |
| `git diff` / `git diff --stat` | 逐行 / 按文件显示改动 | 否（只读） |
| `git switch -c <名字>` | 创建并切换到新分支 | 仅本地 |
| `git switch <名字>` | 在已有分支间切换 | 仅本地 |
| `git branch` | 列出本地分支；`*` 标记当前分支 | 否（只读） |
| `git switch -` | 返回上一次所在的分支，无需知道名字 | 仅本地 |
| `git add <文件>` | 把改动暂存到下一次提交 | 仅本地 |
| `git commit -m "信息"` | 录制一个快照 | 仅本地 |
| `git remote -v` | 列出这份拷贝关联的 URL | 否（只读） |
| `git branch -a` | 列出所有分支（含远程） | 否（只读） |

`git switch` 需要 Git 2.23+（2019 年）——用 `git --version` 检查。更老的 Git：`git checkout -b <名字>` 建分支，`git checkout <名字>` 切换，`git checkout -` 返回上一个分支。

## Windows / macOS / Linux 差异

| 项目 | Windows（PowerShell） | macOS / Linux |
|---|---|---|
| Git 命令 | 三平台完全相同 | 三平台完全相同 |
| 文件夹路径 | `cd labs\first-fix`（反斜杠；PowerShell 也接受 `/`） | `cd labs/first-fix` |
| 用户主目录 | `cd ~` | `cd ~` |
| 默认编辑器 | 系统自带记事本 | TextEdit（macOS）/ gedit 或任意编辑器 |
| 删除沙盒 | 可选——按上方**「清理沙盒」**一节的先查看再删除步骤执行；切勿粘贴没有读过的删除命令 | 所有平台完全相同 |

本课程从不假设 Bash 语法在 PowerShell 里也能用——凡命令有平台差异，课程都会同时给出两种写法。

## 你刻意不需要的东西

不需要登录 GitHub、不需要 SSH 密钥、不需要 fork、不需要 push、不需要 pull request。克隆公开仓库是匿名的。一切接触公开世界的操作，都会在[第 06 课](../../lessons/zh-CN/06-open-first-pr.md)里讲解清楚。

---

[← 第 01 课](../../lessons/zh-CN/01-find-an-issue.md) · [从这里开始](start-here.md) · [下一课：第 02 课 →](../../lessons/zh-CN/02-reproduce-a-bug.md) · [English version](../en/git-quickstart.md)
