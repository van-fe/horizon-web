# 贡献指南

感谢你对 `Horizon Web` 的关注与贡献！本指南涵盖 Issue 规范、本地开发、组件开发约定（功能设计、useProps、样式、文档）、Commit 规范、PR 流程与发布流程，欢迎补充。

[English](./CONTRIBUTING.md) | **简体中文**

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

## 功能设计

开发一个组件之前，先思考这个组件需要哪些功能、定义哪些 props 和 emits、如何与设计稿结合。除了参考 Element、AntD，也建议看看国外流行的组件库，如 [Vuetify](https://vuetifyjs.com/en/components/alerts/)、[Quasar](https://quasar.dev/vue-components/)，可能会有不一样的启发。

例如 `Link` 组件：Element 只提供了 `href` 跳转，而 Vuetify 还提供 `to`、`replace` 等 prop 结合 `vue-router` 进行路由跳转，显然更加实用。

另外，不要复制粘贴 Element 等开源库的代码和文档，文档话术可以参考设计稿中的描述进行整合。

## 本地开发

### 环境要求

- [Node.js](https://nodejs.org/) >= 20（建议使用 [nvm](https://github.com/nvm-sh/nvm) 管理版本）
- [bun](https://bun.sh) >= 1.0（仓库使用 bun 作为包管理器与脚本运行时）
- 分支：请基于 `feature` 分支自行创建开发分支

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

开发分支示例：

```bash
git checkout -b feat/your-feature
```

### 生成模板

仓库内置模板生成脚本，可以快速创建组件 / 指令 / 方法的初始代码（含源码、文档与 demo）：

```bash
# 生成组件（组件名使用 PascalCase）
bun run new component PanelItem

# 生成指令（指令名必须以 v- 开头）
bun run new directive v-focus

# 生成方法
bun run new method your-method
```

生成的文档会自动注册到 `packages/docs/.vitepress/config/demos-sidebar.json`（组件默认进入「基础组件」分类，如分类不合适请手动调整）。

### 目录结构

仓库采用 bun workspaces 管理的 monorepo 结构：

```
├── node_modules  # packages 中所有项目公共的模块
└── packages  # bun 的工作空间（Workspace），包含了多个项目
    ├── horizon-web      # horizon-web UI 项目
    │   ├── dist    # 编译生成的浏览器产物目录（IIFE / UMD）
    │   ├── es      # 编译生成的 esm 文件目录（含类型声明）
    │   ├── lib     # 编译生成的 cjs 文件目录
    │   ├── json    # vetur / web-types 等编辑器提示文件
    │   └── src
    │       ├── components      # 组件目录
    │       ├── directives      # 指令目录
    │       ├── composables     # 公共的类 Hook 文件目录
    │       └── styles          # 样式目录
    ├── docs     # 文档站项目（VitePress）
    │   ├── demos       # 存放所有 .vue demo 示例文件的目录
    │   │   ├── components      # 组件 demo 目录
    │   │   │   └── Button      # 具体某组件的 demo 目录
    │   │   ├── directives      # 指令 demo 目录
    │   │   └── methods         # 方法 demo 目录
    │   ├── zh                # 中文文档（根语言）
    │   │   ├── guide           # 快速开始、按需引入等指南文档
    │   │   ├── demos           # 组件 / 指令 / 方法的 markdown 文档
    │   │   │   ├── components  # 组件文档目录（Button.md）
    │   │   │   ├── directives  # 指令文档目录
    │   │   │   └── methods     # 方法文档目录
    │   │   ├── features        # 主题、国际化、Token 等特性文档
    │   │   └── ...             # 其他文档目录
    │   └── en                # 英文文档（结构与 zh 一致）
    ├── icon                # 图标库
    ├── locale              # 多语言库（纯js，无框架代码）
    ├── locale-vue          # 多语言库，提供 vue 支持
    ├── colors              # 颜色 / Design Token 包
    ├── utils               # 工具库
    ├── unplugin-resolver   # 用于提供给 unplugin-vue-components 做树摇的 resolver
    ├── upload-adapters     # 上传适配器
    ├── api-generator       # 组件 API 文档生成器
    └── eslint-plugin-horizon-web  # 自定义 ESLint 规则
```

## 代码规范

### useProps

组件的 props 必须定义在 `./src/composables/useProps.ts` 文件中，为了正确生成文档，需要遵循以下规则：

- 组件参数的注释对应文档中的参数说明
  ```ts
  export const useXXXProps = {
    /** switch 关闭时的自定义状态文本 */
    statusOffText: {
      type: String,
      default: 'Off',
    },
  };
  ```
- 注释支持 Markdown 语法，但为保证阅读体验与排版，请尽量只使用加粗、斜体、链接等有限语法
  ```ts
  export const useXXXProps = {
    /**
     * **绑定**的值
     */
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  };
  ```
- 不要写 `enum`，使用 `UnionType` 替代
  ```ts
  export const useXXXProps = {
    /** switch 大小 */
    size: {
      type: String as PropType<'normal' | 'small'>,
      default: 'normal',
    },
  };
  ```
- 尽量总是设置 `required` 属性，文档中的「是否必填」以它作为最高优先级判断
- `PropType` 泛型暂时只支持基本类型、`UnionType` 和 `Interface`

### 样式

- 样式文件只能使用 scss
- scss 等文件中不支持路径别名
  ```scss
  // not support
  @use '~/styles/name.scss';
  @use '@/styles/name.scss';
  ```

### 导出关联组件

一个组件可能包含关联组件，如 `Checkbox` 内置 `CheckboxGroup`。由于编译产物只有 `Checkbox.js` 而没有 `CheckboxGroup.js`，自动按需加载会失败，请手动修改 `packages/unplugin-resolver/src/index.mts` 中的 config。

### 本地校验

提交前请确保以下检查全部通过：

```bash
bun run lint        # oxlint + eslint
bun run vitest:all  # 全部单测与浏览器测试
bun run ts:check    # TypeScript 类型检查
```

`husky` 会在提交时自动执行 commitlint、lint-staged、单测与类型检查。

## 文档规范

文档站源码位于 `packages/docs`（VitePress），中文文档在 `packages/docs/zh`，英文文档在 `packages/docs/en`，两者结构保持一致。

组件、指令和方法的 markdown 文档位于 `packages/docs/[zh|en]/demos/[components|directives|methods]/[组件名].md`，对应的 `.vue` demo 示例文件放在 `packages/docs/demos/[components|directives|methods]/[组件名]/` 目录下。

文档遵循标准结构，右侧菜单、demo 等内容会根据文档结构自动生成：

```
### 特性1

描述特性1

::: demo1 :::

### 特性2

描述特性2

::: demo2 :::
```

组件 / 指令 / 方法文档中的 demo 使用如下语法，路径相对于 `packages/docs/demos` 目录：

```
:::demo components/Button/basic.vue :::
```

某些场景下可能希望仅展示 demo 效果而不展示源码（如颜色面板），给文件名添加 `--no-code` 即可：

```
:::demo ./demos/colors--no-code.vue :::
```

> 注：`features` 等文档中的 demo 路径相对于当前 markdown 文件所在目录，如 `./demos/colors--no-code.vue`。

组件 / 指令 / 方法的文档不需要定义除 demo 以外的信息，其余内容会自动解析。

## 依赖库

当前组件库依赖以下第三方库，可以在需要时利用这些库的能力：

- [@vueuse/core](https://vueuse.org/)：基于 Composition API 的工具方法，如 `useEventListener`、`useMouse`、`useLocalStorage`
- [async-validator](https://github.com/yiminghe/async-validator)：异步表单验证库

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

版本发布由维护者执行：

1. 修改 `./versions.json` 中的版本号
2. 执行 `bun run modify:version` 同步各包版本
3. 执行 `bun install`
4. 执行 `bun run build`
5. 发布：
   - 最新版：`bun run pub -- --confirm`
   - alpha 版：`bun run pub -- --confirm --tag alpha`
   - beta 版：`bun run pub -- --confirm --tag beta`
   - 2-x 版：`bun run pub -- --confirm --tag v2-x`
   - 2-x alpha 版：`bun run pub -- --confirm --tag v2-x-alpha`
   - 2-x beta 版：`bun run pub -- --confirm --tag v2-x-beta`

## 相关链接

- [文档站源码](packages/docs)
- [更新日志](https://github.com/van-fe/horizon-web/releases)
- [Issue 列表](https://github.com/van-fe/horizon-web/issues)
