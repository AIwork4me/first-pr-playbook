# 欢迎参与贡献

[English](CONTRIBUTING.md)

感谢你帮助改进这套课程！这是一个教育型 Markdown 仓库，最有价值的贡献围绕**准确性、清晰度与可复现性**。

## 最适合的贡献

- 修正文档中无法复现的步骤，附环境信息与复现证据。
- 改善一课的验收标准，或补充曾让你困惑的初学者解释。
- 修复仓库内部 Markdown 链接、错别字、示例命令的危险默认值。
- 维护案例证据的准确引用，不扩大测试结论。
- 保持英文版与中文版的结缝对等（内容修正同时覆盖两种语言）。

## 贡献流程

1. 先搜索已有 Issues/PR 避免重复；改动较大先开 Issue 讨论。
2. Fork 本仓库，为每个聚焦的改动新建分支。
3. 只修改与当前问题有关的文档；不要一次重写多课。
4. 检查课程索引、上下课链接与跨语言链接；保持示例命令的前提条件与脱敏要求。
5. 运行 `node scripts/validate-docs.mjs`，并在 PR 中附上结果。
6. PR 描述说明 Problem / Change / Validation / Scope（[PR 模板](.github/PULL_REQUEST_TEMPLATE.md) 会引导你）。

请遵守[行为准则](CODE_OF_CONDUCT.zh-CN.md)。

## 请勿提交

他人的私有代码、真实访问令牌、SSH 私钥、未经许可的图片、未经核实的 AI 生成结论，以及无针对性的批量 PR。

## 许可

原创文字采用 CC BY 4.0；原创代码、命令与模板采用 MIT——见 [LICENSE](LICENSE) 与 [LICENSE-CONTENT.md](LICENSE-CONTENT.md)。提交原创内容即表示你同意以相同方式许可。
