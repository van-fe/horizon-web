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
- 部分核验组件：**1**
- 需整改组件：**7**
- 已核验 renderer：**3**（Vue 2，React 1）
- 待按新门禁复核的历史迁移组件：**0**
- 最后更新：2026-09-10

| 组件 | Core / Product Core | Vue renderer | React renderer | 组件状态 | 最后核验 |
| --- | --- | --- | --- | --- | --- |
| Tag | 已核验 | 已核验 | 已核验 | **已核验** | 2026-09-10 |
| Button | 已有 contract/action；Vue 已消费 manifest | 已核验 | 需整改 | **部分核验** | 2026-09-10 |
| Calendar | 需整改：Vue 仍保留重复日期/日程权威 | 需整改 | 需整改 | **需整改** | 2026-09-10 |
| TimeSelect | 已有 contract/algorithms | 需整改 | 需整改 | **需整改** | 2026-09-10 |
| CommandPalette | 已有 controller 与 Web hotkey controller | 需整改 | 需整改 | **需整改** | 2026-09-10 |
| QRCode | 已有 generation controller 与 Web generator | 需整改 | 需整改 | **需整改** | 2026-09-10 |
| TreeSelect | 已有 contract/controller/presentation | 需整改 | 需整改 | **需整改** | 2026-09-10 |
| Tree | 已有 contract/controller/algorithms 与 Web drag | 需整改 | 需整改 | **需整改** | 2026-09-10 |
| Cascader | 已有 contract/controller/algorithms 与 Web navigation | 需整改 | 需整改 | **需整改** | 2026-09-10 |

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

## 2026-09-10 历史迁移追溯核查

本轮已对 8 个历史迁移组件完成当前快照的文件结构、Hook/Composable、API 单一来源和组件覆盖率核查。覆盖率达标只能证明路径被执行，不能抵消结构与权威源门禁失败。

### 核查结论

| 组件 | Vue 结论 | React 结论 | 阻断证据 | 历史提交 |
| --- | --- | --- | --- | --- |
| Button | **已核验**：入口为 barrel，`Button`/`ButtonGroup`、action composable 和注入配置已分离；props 由 Core manifest 生成。 | **需整改**：292 行 `index.tsx` 同时声明公共类型、Group context、`Button` 与 `ButtonGroup`；共享 props 仍逐字段重复声明。 | React 必须拆为 barrel、组件、types、context，并改为 contract-driven props。 | `a9036557`、`25d33c1d` |
| Calendar | **需整改**：`Calendar.tsx` 仍直接管理 model 订阅、多组 watch/provide；`CalendarHelper` 与 361 行 `PinFlagsHelper` 继续拥有日期网格、禁用日期、日程 mutation 等领域状态。 | **需整改**：725 行 `index.tsx` 同时拥有 contract surface、受控状态、schedule、month/year/timeline 渲染、pointer selection、scroll lifecycle 与 ref commands。 | Vue 重复 Core 权威；两端都需要按 model/schedule、timeline/pointer、mode rendering 和 public types 拆分。 | `8f6ba289` |
| TimeSelect | **需整改**：89 行组件本身薄且职责集中，但 187 行 Vue runtime props 仍逐字段手写，未由 Core manifest 派生。 | **需整改**：145 行实质组件和 public types 全留在 `index.tsx`。 | 补 contract-driven Vue props；React 将实现和 types 移出 barrel。 | `f4ad1d75` |
| CommandPalette | **需整改**：`useCommandPalette` 同时负责 Core controller、全局 hotkey、可见性、焦点调度和 async execute；Vue props 仍为手写字段表。 | **需整改**：255 行 `index.tsx` 同时拥有 public types、controlled state、controller 同步、hotkey/focus resource、keyboard、async 与渲染。 | 两端需拆 controller adapter、hotkey/focus lifecycle 和 native rendering；Vue API 改为 manifest 驱动。 | `c7c124f7` |
| QRCode | **需整改**：generation composable 边界清楚，但 Vue runtime props 仍逐字段手写，未消费 manifest。 | **需整改**：120 行 `index.tsx` 同时声明 public API、异步 generation controller effect 与渲染。 | Vue 补 contract-driven props；React 提取 generation hook，并将 types/组件实现移出 barrel。 | `ef4537ef` |
| TreeSelect | **需整改**：832 行 `useProps.ts` 为手写 API 表；560 行 `TreeSelect.tsx` 仍拥有 focus timer、previous-label cache、keyboard routing、大型 exposes 与渲染。 | **需整改**：657 行 `index.tsx` 同时拥有多组 uncontrolled state、session controller 创建、命令、imperative handle 和渲染。 | 两端需拆状态/session adapter、focus/keyboard、tag/display cache、public commands/types 与渲染；Vue API 改为 manifest 驱动。 | `fc0ce865` |
| Tree | **需整改**：虽已有 selection、expand、filter、dynamic-load、drag 等 hooks，但 519 行顶层仍直接承担 focus/keyboard、受控事件 watch、provider/expose wiring；535 行 props 为手写 API 表。 | **需整改**：767 行 `index.tsx` 除 drag/load hooks 外仍集中 selection、expansion、filter、focus/navigation、commands、tree item rendering 与 public types。 | 两端继续拆 navigation/focus、controlled adapter、context/commands/types 和 rendering；Vue API 改为 manifest 驱动。 | `c3fc123a` |
| Cascader | **需整改**：612 行 `CascaderPanels.tsx` 同时拥有 dynamic-load controller、panel composition、keyboard navigation、focus stack 与 provider wiring；789 行 props 为手写 API 表。 | **需整改**：755 行 `index.tsx` 同时拥有 public types、selection/dynamic-load controllers、多组状态、navigation、panels/items 与渲染。 | 两端需拆 selection/load、navigation/focus、panel/item renderer、context/types；Vue API 改为 manifest 驱动。 | `c5f04aa6` |

### 当前最大生产文件

| 组件 | Vue 最大实现信号 | React 最大实现信号 |
| --- | --- | --- |
| Button | `Button.tsx` 157 行 | `index.tsx` 292 行 |
| Calendar | `MonthCalendar.tsx` 366 行；`PinFlagsHelper.ts` 361 行；`Calendar.tsx` 354 行 | `index.tsx` 725 行 |
| TimeSelect | `useProps.ts` 187 行；`TimeSelect.tsx` 89 行 | `index.tsx` 145 行 |
| CommandPalette | `CommandPalette.tsx` 102 行；`useCommandPalette.ts` 102 行 | `index.tsx` 255 行 |
| QRCode | `QRCode.tsx` 63 行；`useQRCode.ts` 40 行 | `index.tsx` 120 行 |
| TreeSelect | `useProps.ts` 832 行；`TreeSelect.tsx` 560 行 | `index.tsx` 657 行 |
| Tree | `useProps.ts` 535 行；`Tree.tsx` 519 行；`TreeItem.tsx` 469 行；`useDraggable.ts` 319 行 | `index.tsx` 767 行 |
| Cascader | `useProps.ts` 789 行；`CascaderPanels.tsx` 612 行；`Cascader.tsx` 415 行 | `index.tsx` 755 行 |

行数仅用于定位风险；上述“需整改”判断均同时有职责混合、API 重复声明或可独立测试的 Hook/Composable 边界证据。

### 组件覆盖率证据

Vue 数据来自当前分支最近一次完整 Chromium coverage artifact；React 于 2026-09-10 在 `packages/horizon-react` 包作用域重新运行 Chromium coverage，63 个测试文件、374 个测试全部通过。

| 组件 | Vue S / B / F / L | React S / B / F / L | 覆盖率门禁 |
| --- | --- | --- | --- |
| Button | 98.17 / 97.26 / 100 / 97.92 | 100 / 100 / 100 / 100 | 通过 |
| Calendar | 98.08 / 95.31 / 98.91 / 98.31 | 99.52 / 95.54 / 100 / 100 | 通过 |
| TimeSelect | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 通过 |
| CommandPalette | 98.89 / 97.22 / 97.56 / 100 | 100 / 100 / 100 / 100 | 通过 |
| QRCode | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 通过 |
| TreeSelect | 98.61 / 95.41 / 99.25 / 98.80 | 99.34 / 97.48 / 100 / 100 | 通过 |
| Tree | 98.21 / 95.22 / 98.66 / 99.40 | 98.14 / 95.25 / 98.91 / 99.64 | 通过 |
| Cascader | 98.40 / 95.13 / 98.26 / 98.99 | 99.19 / 95.45 / 100 / 99.04 | 通过 |

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
