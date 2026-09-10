# Aurora Renderer 组件细致拆分台账

> 本台账只记录通过当前 Renderer file-structure 与 Hook/Composable 门禁的组件。完成跨 renderer 包迁移、存在 Core contract，或提交标题包含 `split`，都不能单独作为“细致拆分完成”的依据。

## 状态定义

| 状态 | 含义 |
| --- | --- |
| 已核验 | 当前代码已通过职责拆分、单一状态权威、响应式边界、资源清理、组件覆盖率及消费方门禁。 |
| 部分核验 | 只有部分目标 renderer 通过新门禁；组件整体不计入完成数。 |
| 待复核 | 存在历史分层或跨 renderer 迁移，但尚未按当前细致拆分门禁重新审计。 |
| 需整改 | 已确认存在单体入口、catch-all hook、重复状态权威或其他门禁问题。 |
| 不适用 | 该 renderer 或平台当前没有真实实现需求。 |

## 当前总览

- 已核验组件：**1**
- 已核验 renderer：**2**（Vue 1，React 1）
- 待按新门禁复核的历史迁移组件：**8**
- 最后更新：2026-09-10

| 组件 | Core / Product Core | Vue renderer | React renderer | 组件状态 | 最后核验 |
| --- | --- | --- | --- | --- | --- |
| Tag | 已核验 | 已核验 | 已核验 | **已核验** | 2026-09-10 |

## 已核验记录

### Tag

职责归属：

- Core contract、激活算法和异步 mutation 权威位于 [`packages/core/src/components/Tag`](packages/core/src/components/Tag)。
- Horizon 浏览器资源能力位于 [`packages/horizon-core/src/components/Tag`](packages/horizon-core/src/components/Tag)，负责 close visibility、press tracker、ResizeObserver 与 collapse controller。
- Vue 使用聚焦 composables 适配编辑、交互、Tooltip/overflow、样式、Group context、注册表、mutation 与 collapse；组件文件保留 Vue 原生装配和 JSX。
- React 使用独立组件、types、context、utils 和 runtime hooks；组件文件保留 React 原生 JSX、输入与事件组合。
- 视觉规则由 [`packages/theme/styles/components/tag`](packages/theme/styles/components/tag) 提供。

结构证据：

| Renderer | 公共入口 | 组件实现 | Hook / Composable | 当前最大生产文件 | 剩余职责说明 |
| --- | --- | --- | --- | --- | --- |
| Vue | [`index.ts`](packages/horizon-vue/src/components/Tag/index.ts)，8 行 | [`Tag.tsx`](packages/horizon-vue/src/components/Tag/src/Tag.tsx)，233 行；[`TagGroup.tsx`](packages/horizon-vue/src/components/Tag/src/TagGroup.tsx)，232 行 | [`composables/`](packages/horizon-vue/src/components/Tag/src/composables) 中 8 个职责型 composable；最大为 `useTagGroupCollapse.ts`，180 行 | `Tag.tsx`，233 行 | Vue 原生 JSX、slot/tooltip 内容组合、class/style/event 绑定；状态机和资源生命周期已移出。 |
| React | [`index.tsx`](packages/horizon-react/src/components/Tag/index.tsx)，4 行 | [`Tag.tsx`](packages/horizon-react/src/components/Tag/Tag.tsx)，300 行；[`TagGroup.tsx`](packages/horizon-react/src/components/Tag/TagGroup.tsx)，208 行 | [`hooks/`](packages/horizon-react/src/components/Tag/hooks) 中资源与 Group runtime hooks；另有独立 [`types.ts`](packages/horizon-react/src/components/Tag/types.ts)、[`context.ts`](packages/horizon-react/src/components/Tag/context.ts) 和 [`utils.ts`](packages/horizon-react/src/components/Tag/utils.ts) | `Tag.tsx`，300 行 | React 原生 JSX、ARIA/keyboard/input 与组件本地事件组合；共享 controller 与浏览器资源生命周期已移出。 |

验证证据：

| 范围 | 结果 |
| --- | --- |
| Vue Tag Chromium | 4 个测试文件、46 个测试通过。 |
| Vue Tag + Select 消费回归 | 8 个测试文件、150 个测试通过。 |
| Vue Tag 组件覆盖率 | Statements 98.70%，Branches 97.61%，Functions 97.14%，Lines 98.68%。 |
| React Tag Chromium | 1 个测试文件、15 个测试通过。 |
| React Tag renderer 覆盖率 | Statements 97.91%，Branches 98.53%，Functions 100%，Lines 99.19%。 |
| 全量 pre-push | Vue 269 个测试文件、2391 个测试通过（另 1 个 expected fail）；React 63 个测试文件、374 个测试通过；其余 foundation、node 与工具包门禁通过。 |
| 构建与消费 | Vue declaration build、package boundaries、Vue/React consumer build、SSR、tree-shaking、renderer docs isolation 通过。 |

关联提交：

- `2948771d` — `feat(Tag): complete cross-renderer package split`
- `56dca9dd` — `refactor(Tag): split React renderer internals`
- `b9cb793b` — `refactor(HorizonVue): decompose Tag renderers`

## 历史迁移待复核

以下组件有分层或跨 renderer 迁移记录，但没有按 2026-09-10 生效的细致拆分门禁完成追溯审计，因此不计入“已核验组件”。

| 组件 | 历史证据 | 当前状态 | 进入已核验前必须补充 |
| --- | --- | --- | --- |
| Button | `a9036557`、`25d33c1d` | 待复核 | Vue/React 文件职责、hook 边界、最大文件、覆盖率和消费方证据。 |
| Calendar | `8f6ba289` | 待复核 | 同上，并复核日期能力与 DOM/焦点能力的层级归属。 |
| TimeSelect | `f4ad1d75` | 待复核 | 同上，并复核 Select/Picker 消费链。 |
| CommandPalette | `c7c124f7` | 待复核 | 同上，并复核 async/controller、keyboard 与 layer 资源清理。 |
| QRCode | `ef4537ef` | 待复核 | 同上，并复核 controller 与 renderer 输出边界。 |
| TreeSelect | `fc0ce865` | 待复核 | 同上，并复核大型 renderer/hook 是否仍为单体或 catch-all。 |
| Tree | `c3fc123a` | 待复核 | 同上，并复核 drag、dynamic load、selection 与 browser resource 所有权。 |
| Cascader | `c5f04aa6` | 待复核 | 同上，并复核 panels、filter、option 与 virtual scroll 职责边界。 |

## 维护规则

1. 只有当前代码通过 [`develop-horizon-components`](.agents/skills/develop-horizon-components/SKILL.md) 的 Renderer file-structure 与 Hook/Composable 门禁后，才能标记“已核验”。
2. 每次核验必须记录职责归属、renderer 文件结构、最大生产文件及其保留理由、组件四项覆盖率、消费方/SSR/tree-shaking 结果和关联提交。
3. 不能根据提交标题、文件数量或行数单独判断完成；行数只用于发现风险。
4. 只有一端通过时标记“部分核验”，不能增加“已核验组件”计数。
5. 后续修改重新引入单体组件、catch-all hook、响应式快照、重复状态权威或资源泄漏时，立即降级为“需整改”或“待复核”。
6. 台账只记录实际执行并可追溯的结果；未运行的测试和未审计的 renderer 不得写为通过。

## 新增记录模板

```md
### <Component>

- 最后核验日期：
- Core / Product Core 职责：
- Vue 文件结构、最大文件与保留理由：
- React 文件结构、最大文件与保留理由：
- Hook/Composable 边界与资源清理：
- 单一状态权威：
- Vue 四项覆盖率：
- React 四项覆盖率：
- 消费方、SSR、tree-shaking、docs/build：
- 关联提交：
```
