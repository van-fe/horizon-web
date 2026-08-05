# 贡献指南

感谢你对 `Horizon Web` 的关注与贡献！在开始之前，请先阅读[开发必读](./开发必读.md)，其中汇总了组件开发相关的所有约定，包括功能设计、useProps 规则、编码规范与文档规范。

## Issue 规范

提交 Issue 前，请先搜索[已有 Issue](https://github.com/van-fe/horizon-web/issues)（包括已关闭的），避免重复提交。

### Bug 报告

请尽量包含以下信息，便于快速定位问题：

- 环境信息：浏览器及版本、Node / bun 版本、`@aurora/horizon-web` 版本
- 复现步骤：提供最小化复现仓库或在线 Demo 优先
- 期望行为与实际行为
- 报错信息、控制台日志与截图

### 功能建议

请说明使用场景、期望的组件 API 与交互方式，越具体越好。

## 本地开发

### 环境要求

- [Node.js](https://nodejs.org/) >= 20（建议使用 [nvm](https://github.com/nvm-sh/nvm) 管理版本）
- [bun](https://bun.sh) >= 1.0（仓库使用 bun 作为包管理器与脚本运行时）

### 开发步骤

```bash
# 1. fork 仓库并 clone 到本地
git clone git@github.com:<your-username>/horizon-web.git
cd horizon-web

# 2. 安装依赖
bun install

# 3. 首次开发前构建产物
bun run build

# 4. 启动文档站（包含组件 Demo 与 API 文档）
bun run dev
```

请基于 `feature` 分支自行创建开发分支，例如：

```bash
git checkout -b feat/your-feature
```

### 生成模板

仓库内置模板生成脚本，可以快速创建组件 / 指令 / 方法的初始代码：

```bash
# 生成组件（组件名使用 PascalCase）
bun run new component PanelItem

# 生成指令（指令名必须以 v- 开头）
bun run new directive v-focus

# 生成方法
bun run new method your-method
```

## 代码规范

- 组件 props 必须定义在 `useProps` 中，并遵循注释与类型规则，详见[开发必读](./开发必读.md#useprops)
- 样式文件只能使用 scss，且不支持路径别名
- 新增关联组件时，需同步修改 `packages/unplugin-resolver/src/index.mts` 中的按需加载配置

提交前请确保以下检查全部通过：

```bash
bun run lint        # oxlint + eslint
bun run vitest:all  # 全部单测与浏览器测试
bun run ts:check    # TypeScript 类型检查
```

`husky` 会在提交时自动执行 commitlint、lint-staged、单测与类型检查。

## 文档规范

组件与指令的文档遵循固定结构，所有文档使用 `doc.md` 文件名，Demo 通过 `:::demo` 容器语法引入，详见[开发必读](./开发必读.md)中的文档相关章节。

## Commit 规范

仓库通过 commitlint 约束提交信息，格式为 `<type>(<scope>): <subject>`：

- `type` 仅允许：`feat`、`update`、`fix`、`refactor`、`optimize`、`style`、`docs`、`chore`、`release`
- `scope` 必须使用 PascalCase，通常为组件名或包名

示例：

```text
feat(Table): support column filter
fix(Button): fix loading state flicker
docs(README): rewrite project introduction
```

建议保持小提交、语义清晰，一个提交只做一件事。

## Pull Request 流程

1. 从最新的 `feature` 分支（或 `main`）创建开发分支
2. 保持 PR 小且职责单一，并在描述中关联对应 Issue
3. 本地通过 lint、单测与类型检查
4. 在 PR 描述中说明改动内容、影响范围与验证方式
5. 等待维护者 Review，根据反馈补充修改后合并

## 发布流程

版本发布由维护者执行，流程见[发版流程](./发版流程.md)。

## 相关链接

- [文档站源码](packages/docs)
- [更新日志](https://github.com/van-fe/horizon-web/releases)
- [Issue 列表](https://github.com/van-fe/horizon-web/issues)
