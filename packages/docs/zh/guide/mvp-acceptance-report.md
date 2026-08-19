# Web Vue/React MVP 验收报告

## 结论

M0–M5 的 Web 双 renderer MVP 已达到进入 M6 批量迁移的工程门槛。Button、Switch、Tooltip、Select 单选模式已经验证公共状态、浏览器 primitives、主题、公共 API contract、Vue adapter、React adapter、独立文档、发布和消费链路能够闭环。

## 包与边界

| 能力 | 结果 |
| --- | --- |
| 公共行为 | `@aurora/core`，无 Vue/React/DOM 类型依赖 |
| Web DOM 能力 | `@aurora/horizon-core`，包含浮层、焦点、listbox 和 ARIA primitives |
| 公共视觉 | `@aurora/theme`，Button、Switch、Tooltip、Select 使用同源变量与样式 |
| Vue renderer | `@aurora/horizon-vue`，保留现有公开 API 和测试基线 |
| React renderer | `@aurora/horizon-react`，原生受控/非受控、children/renderers、callbacks 和 ref API |
| 包名迁移 | breaking change：只保留 `@aurora/horizon-vue` 与 `@aurora/horizon-react`，不提供旧组件包兼容入口 |

边界检查覆盖 Core、Theme、Web Core 和 React renderer，当前全部通过。

## 公共 API contract

公共 contract 统一维护领域类型、默认值、校验语义、事件 payload/reason、内容区域和命令。renderer adapter 负责按自身 API 习惯调整名称、删减字段和添加框架专属能力，不把 `VNode`、`ReactNode` 或框架 Ref 放进公共层。

当前生成器会在文档准备阶段生成 4 份 Vue contract 和 4 份 React contract。组件文档继续分目录、分导航和分运行时维护，不展示跨框架映射表。

## 质量证据

| 检查 | 结果 |
| --- | --- |
| Core | 6 个文件、33 个测试通过 |
| Web Core | 3 个 Node 文件、2 个 Chromium 文件通过 |
| React | 5 个 Chromium 文件、23 个测试通过 |
| Vue Select | 18 个文件、174 个测试通过 |
| Vue Button/Switch | 7 个文件、64 个测试通过 |
| Vue 全量浏览器 | 265 个文件、2295 通过、1 个预期失败 |
| Vue 覆盖率 | Statements 98.06%、Branches 95.33%、Functions 97.86%、Lines 98.31% |
| 文档 | 中英文 renderer 隔离、示例类型检查、媒体检查和 VitePress 全构建通过 |

## 消费与发布证据

- Vite Vue 按需路径构建通过；
- Vite React 根入口构建通过；
- Vue 与 React SSR render smoke 通过；
- React 保留组件模块边界，只使用 Button/Select 时不会保留 Tooltip 实现；
- resolver 能显式解析 Vue/React 包与样式入口；
- 发布 dry-run 按依赖顺序覆盖 Core、Theme、Web Core、双 renderer 和扩展包；
- workspace、锁文件、版本表和 release plan 均不包含 `@aurora/horizon-web` 旧组件包。

## 已知风险

1. Vue Select 按需消费仍会带入较多历史依赖，当前 smoke 的 JS/CSS 体积偏大。M6/M7 应继续拆分 Picker、Tag、Scrollbar 和表单依赖，不能把现状视为最终体积目标。
2. React JS 已可按组件 tree-shake，但 `style.css` 仍是 renderer 级样式入口。批量迁移时需要增加稳定的组件级 CSS 产物和 resolver 路径。
3. 包名迁移是 breaking change；业务项目必须将 Vue imports 显式更新为 `@aurora/horizon-vue`。
4. 现有 Vue 浏览器套件仍会输出部分历史警告，需要在相应组件迁移批次中逐项消除。

## 下一阶段

批准进入 M6。先迁移展示与布局组件，再迁移基础表单和导航；每个组件继续遵循四包同名目录、公共 contract、共享主题、独立 renderer 文档和真实浏览器测试规则。
