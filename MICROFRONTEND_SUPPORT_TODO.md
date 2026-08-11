# Horizon Web 微前端支持 Todo List

目标：允许同一页面中的多个 Vue 3 微应用安全使用 Horizon Web，并保证配置、主题、弹层、全局服务和生命周期互不串扰。

## 勾选规则

- `[ ]`：尚未完成，或实现后尚未通过相应验证。
- `[x]`：实现和相应验证均已完成。
- 每完成一个最小可验证事项，立即在同一次工作中勾选。
- 部分完成或受阻时保持未勾选，并在该项下记录剩余工作。
- 不得因某个子项完成而直接勾选整个阶段。

## 0. 任务初始化

- [x] 创建专用分支 `codex/microfrontend-support`。
- [x] 在项目根目录创建并维护本 Todo List。
- [x] 创建并验证项目内临时 skill `track-microfrontend-support`，约束后续任务完成后同步勾选。

## 1. 支持边界与架构契约

- [x] 明确首期支持边界：同页多 Vue 3 微应用、共享运行时、独立配置与独立卸载。
- [x] 记录共享单例清单及版本策略：`vue`、`@aurora/horizon-web`、`@aurora/utils`、`@aurora/theme`、`@aurora/locale-vue`、`@aurora/horizon-web-core`。
- [x] 定义 App 级 Horizon 上下文接口，覆盖 scope、locale、size、theme、popup container、z-index 和服务实例。
- [x] 定义微应用 mount、update、unmount 与 Horizon 安装、更新、释放之间的生命周期契约。

## 2. 依赖与发布产物

- [x] 将 Vue 等宿主运行时依赖调整为正确的 `peerDependencies`，并验证安装行为。
- [x] 补齐 Horizon 主包 `exports`，明确 ESM、CJS、类型、全量样式和按需样式入口。
- [ ] 校验所有包的 `sideEffects`、external 和 tree-shaking 行为，避免重复运行时或样式丢失。
- [ ] 提供 Module Federation、qiankun、wujie 可复用的共享依赖配置示例。

## 3. App 级配置与状态隔离

- [ ] 将 `HApplication` 的全局可变配置改为 App/组件树级上下文，避免多个应用互相覆盖。
- [ ] 将 locale 默认值和语言切换状态隔离到每个 Vue App，并保持 dayjs locale 同步。
- [ ] 统一 namespace 的运行时与 SCSS 编译契约，禁止共享实例被不同应用运行时反复改写。
- [ ] 将主题配置和已设置变量缓存按目标根节点隔离，并支持准确移除和重新设置。
- [ ] 将 Message、Notification、LoadingBar、MessageBox 等方法改为 App 绑定服务，避免 `_context` 被后安装应用覆盖。
- [ ] 将 Message、Notification、Drawer 等模块级实例集合按 App/scope 隔离。

## 4. 弹层、层级与滚动锁

- [ ] 为所有组件、指令和全局方法统一 popup container 解析规则。
- [ ] 默认把弹层挂载到当前微应用 popup root，并保留组件级覆盖能力。
- [ ] 支持从 trigger 的 `ownerDocument`/root 解析容器，兼容 iframe 与 ShadowRoot。
- [ ] 将 z-index 管理器改为可配置的页面共享或 App scope 模式，避免固定 storage key 冲突。
- [ ] 验证多个微应用同时打开模态层时的层级、ESC、点击外部、焦点恢复和焦点圈定。
- [ ] 使滚动锁在共享包和重复包场景下都不会提前释放，并在卸载时归零当前应用持有的锁。

## 5. 样式、主题与 Shadow DOM

- [ ] 审计并收敛会影响微应用根节点外部的全局选择器和 reset。
- [ ] 将 reduced-motion 等全局规则限制到 Horizon 组件作用域，避免影响其他应用。
- [ ] 支持按微应用根节点设置不同主题和暗色模式，验证 CSS 变量继承。
- [ ] 明确全量样式由基座加载一次或由微应用安全去重加载的策略。
- [ ] 如首期声明支持 Shadow DOM，提供样式注入与 Teleport/popup root 配套能力。

## 6. DOM、事件与生命周期清理

- [ ] 审计 `document.body`、全局 querySelector、固定 DOM ID 和 storage key，改为 scope/ownerDocument 感知。
- [ ] 审计 window/document 事件、Observer、定时器和拖拽监听，确保组件卸载时完整清理。
- [ ] 提供 Horizon App dispose 能力，清理弹层、服务实例、动态样式、缓存和滚动锁。
- [ ] 验证同一微应用反复 mount/unmount 不残留 DOM、事件、样式或全局状态。
- [ ] 补齐模块初始化和运行时的 DOM guard，明确并验证 SSR/hydration 支持边界。

## 7. 集成测试与文档

- [ ] 增加一个真实双微应用测试宿主，可同时配置不同 locale、theme、popup root 和 z-index。
- [ ] 在 headless Chromium 中覆盖 Select、Tooltip、Dialog、Message、Notification 等跨应用隔离。
- [ ] 增加卸载压力测试和资源泄漏断言。
- [ ] 增加共享依赖模式与允许独立版本模式的构建验证。
- [ ] 编写中英文微前端接入文档、配置示例、限制说明和排障指南。
- [ ] 完成 TypeScript、lint、样式构建、聚焦浏览器测试和完整浏览器测试，并记录结果。
