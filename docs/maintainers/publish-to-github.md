# 将课程发布到 `AIwork4me/first-pr-playbook`（维护者发布手册）

> Maintainer note (2026-10-27): this is the publication runbook used for the 2026-10-27 bilingual launch. It is retained for future re-releases and audits. The actual launch record — commands, commit SHAs, and verification results — lives in `release-validation.md` beside this file.

## 第一步：创建空仓库（GitHub 网页或 gh CLI）

1. 登录 [GitHub 新建仓库](https://github.com/new)，或使用 `gh repo create`。
2. Owner 选择 `AIwork4me`；Repository name 填 `first-pr-playbook`。
3. Description 建议：`An English-first, bilingual guide to your first high-quality open-source PR — from real issues and AI-assisted debugging to testing, code review, and CI.`
4. Visibility 选 **Public**。为避免首次推送冲突，**不要在新建时勾选自动添加 README、.gitignore 或 LICENSE**：这些文件已经在本地项目内。
5. 确认仓库地址为 `https://github.com/AIwork4me/first-pr-playbook`。

## 第二步：上传已制作的 Markdown 内容

进入含 `README.md` 和 `lessons/` 的根目录。确保电脑安装了 Git，终端中运行：

```bash
# 仅在全新、无 .git 的目录中执行
git init
git branch -M main
git add .
git status             # 检查是否只有本教程的文件，无密钥/缓存/临时文件
git commit -m "docs: launch bilingual first PR playbook"
git remote add origin https://github.com/AIwork4me/first-pr-playbook.git
git push -u origin main
```

- 如果 Git 要求认证，请通过系统 Git Credential Manager 或 GitHub 支持的安全登录流程处理；**不要在截图或公开消息中粘贴 Token**。
- 如果已经存在 `.git`，先检查 `git remote -v` 和当前分支，避免覆盖原有仓库。
- 如果新仓库意外用 GitHub 初始化了 README，先不要强行 `--force`；重新检查远程历史并选择安全的合并方式。
- `.github/` 是隐藏目录；打包与上传时务必保留。

## 第三步：核对公开仓库

- [ ] 首页默认显示英文 `README.md`，语言导航可切到 `README.zh-CN.md`。
- [ ] `lessons/en/` 与 `lessons/zh-CN/` 各有 10 篇课程。
- [ ] `prompts/en|zh-CN/` 各有 10 个任务文件 + 索引；`templates/` 两种语言齐全。
- [ ] [案例](../../case-studies/en/rocm-pr-13437.md) 中的 GitHub 外部证据链接正常。
- [ ] `.github/PULL_REQUEST_TEMPLATE.md`、Issue 模板与 `docs-quality.yml` 已提交。
- [ ] 云端 GPU 文档清楚说明 Linux/Windows 和不同 GPU 配置的验证边界。
- [ ] LICENSE 与 LICENSE-CONTENT.md 正确展示双重许可。
- [ ] Actions 中 docs-quality 工作流执行并报告结果。

## 第四步：推荐的仓库配置

Topics：`open-source`, `first-pull-request`, `good-first-issue`, `github`, `ai-coding`, `software-engineering`, `code-review`, `beginner-friendly`, `documentation`, `rocm`。

建议在仓库 Settings 中允许 Issues，后续依据真实使用反馈建立 `good first issue`；先不要为了热闹制造空 Issue。

## 发布纪律

- 只有本地 `node scripts/validate-docs.mjs` 通过后才推送。
- 不得在 CI 失败或未检查时宣称「已验证发布」；结果如实记录在 `release-validation.md`。
- 发布后核对本地与远程 commit SHA 一致，再对外公布仓库地址。
