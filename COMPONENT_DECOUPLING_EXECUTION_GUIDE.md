# Aurora 组件解耦与多端多框架整改执行规范

> 本文是交给开发者或 AI 执行组件整改时的规范性文档。它描述最终目标、能力分层、Hook 设计、迁移流程、验证门禁和禁止事项。
>
> 若本文与早期规划、历史包名或某个组件的旧实现发生冲突，以本文、当前组件公开契约和当前分支上的自动化边界检查为准。历史文档只用于理解迁移背景，不能作为恢复旧架构的依据。

## 1. 文档目的

本项目不是简单地把 Vue 组件复制成 React 组件，也不是为了让目录看起来对称而机械拆包。整改的目标是把组件中的真实能力按“跨产品领域能力 → 产品/平台能力 → renderer”逐层解耦，使同一行为只有一个权威实现，同时保留 Vue、React 各自自然、可维护的公开 API 和渲染代码。

任何接手任务的开发者或 AI 都必须同时完成以下目标：

1. 找出组件真正共享的状态、算法、协议和资源生命周期，并放入正确层级；
2. 将有状态公共能力设计为不依赖框架的 Headless Hook/Controller；
3. 让 Horizon 与未来 Skyline 只共享跨产品能力，各自承载平台特性；
4. 让 Vue、React renderer 成为薄适配层，而不是第二份状态机；
5. 使用统一 Theme、语义、测试向量和质量门禁，阻止后续再次漂移；
6. 完成真实可运行的 Vue/React 文档和 Demo，而不是只完成代码导出；
7. 采用 breaking migration，不保留旧组件包兼容入口。

## 2. 规范范围与权威顺序

本文适用于：

- `@aurora/core` 的公共契约、算法、状态机和 Headless Hooks；
- `@aurora/horizon-core` 的桌面 Web 能力；
- `@aurora/horizon-vue` 与 `@aurora/horizon-react`；
- 未来的 `@aurora/skyline-core`、`@aurora/skyline-vue`、`@aurora/skyline-react`；
- `@aurora/theme`、locale、组件文档、Demo、测试、构建和发布链；
- 现有组件逐个迁移时的审计、实现、验收和交接。

遇到冲突时按以下顺序判断：

1. 用户对当前任务的明确要求；
2. 本文；
3. `.agents/skills/develop-horizon-components/SKILL.md`；
4. 仅在 `feature/vue-react-support` 分支有效的 `.agents/skills/develop-vue-react-support/SKILL.md`；
5. 当前公共 contract、自动化边界检查和测试所锁定的兼容行为；
6. 历史规划与旧实现。

本文不会替代具体组件的行为审计。旧实现中已被用户使用的行为必须先记录，再决定保持、修复或作为 breaking change 明确移除。

## 3. 最终包架构

最终依赖层级如下：

```text
@aurora/core
├── @aurora/horizon-core
│   ├── @aurora/horizon-vue
│   └── @aurora/horizon-react
└── @aurora/skyline-core
    ├── @aurora/skyline-vue
    └── @aurora/skyline-react

@aurora/theme  -> 被 renderer 消费，不承载运行时状态
@aurora/locale -> 被产品/renderer 的 locale adapter 消费
```

依赖方向只能向下：

```text
renderer -> product core -> @aurora/core
renderer -> @aurora/theme
```

禁止出现：

- Core 反向依赖产品 Core 或 renderer；
- Horizon 依赖 Skyline，或 Skyline 依赖 Horizon；
- Vue renderer 依赖 React renderer，或反向依赖；
- 为复用一个组件而从另一个包导入私有源码路径；
- Theme 依赖 Vue、React 或产品运行时；
- renderer 通过挂载另一框架组件实现功能。

## 4. 各层职责

### 4.1 `@aurora/core`：跨产品的领域内核

`@aurora/core` 只承载 Horizon 和 Skyline 都成立、且不依赖 DOM、触摸运行时或渲染框架的能力。

应放入：

- 公共语义类型、值模型、字段映射和数据归一化；
- 默认值、枚举、validator 和公共事件原因；
- reducer、状态转换和 controlled/uncontrolled 规则；
- 选择、展开、排序、过滤、分页、日期、树、表格等纯算法；
- 异步任务的去重、代次失效、过期结果丢弃和销毁协议；
- 与平台无关的焦点意图、键盘意图和 ARIA 语义状态；
- 公共 events、regions、commands 和 manifest；
- 框架无关 Headless Hooks/Controllers；
- Vue、React 可以复用的测试向量。

不得放入：

- `vue`、`react`、`@vueuse/*`；
- VNode、ReactNode、JSX.Element、框架 Ref；
- `window`、`document`、HTMLElement、PointerEvent；
- Teleport、Portal、Transition、Context、provide/inject；
- Horizon/Skyline 品牌行为或平台专属默认值；
- CSS、DOM class、浏览器测量、Safe Area 或手势监听。

### 4.2 `@aurora/horizon-core`：桌面 Web 产品内核

`@aurora/horizon-core` 承载 Horizon 桌面 Web 中 Vue 与 React 共同需要的浏览器能力。

应放入：

- DOM focus scope、focus restore、roving focus；
- dismissable layer、outside pointer、Escape、top-layer stack；
- body scroll lock、滚动定位和真实元素测量；
- Pointer/Keyboard 事件归一化及监听生命周期；
- ResizeObserver、IntersectionObserver、虚拟滚动测量；
- Portal/Teleport 目标解析；
- Web 拖拽、浮层定位、碰撞、视口边界；
- SSR 安全的浏览器能力适配；
- 只在 Horizon 成立的 Headless Hooks/Controllers。

可以使用 DOM 类型，但必须：

- 在调用阶段读取浏览器对象，模块初始化不得直接访问 `window`/`document`；
- 明确监听器、observer、timer、pointer capture 的所有权；
- `destroy()` 幂等，并释放全部资源；
- 支持 ownerDocument/ownerWindow，而不是假定全局 document；
- 在真实 Chromium 中验证。

### 4.3 `@aurora/skyline-core`：移动产品内核

只有在真实 Skyline 能力出现时才创建对应目录或包。它负责：

- 触摸、滑动、长按、移动端拖拽和手势仲裁；
- Safe Area、软键盘、移动端 viewport；
- 移动端导航、弹层、返回手势；
- 设备能力、性能约束和移动资源生命周期；
- Skyline Vue/React 共用但 Horizon 不成立的行为。

不得为了目录对称提前建立空 `skyline-core/<Component>`。没有真实能力就不创建。

### 4.4 Renderer：`horizon-vue/react` 与 `skyline-vue/react`

Renderer 只负责框架原生 API、渲染和把公共能力接入框架生命周期。

Vue 层保留：

- props/emits/slots/exposes；
- ref/computed/watch、生命周期和 effect scope；
- provide/inject、Teleport、Transition；
- Vue Router、Vue Form、Vue locale adapter；
- VNode、Vue JSX、组件安装器和 template ref。

React 层保留：

- props/callbacks/children/render functions/ref handle；
- hooks、Context、Portal、React 生命周期；
- controlled/uncontrolled 的 React API 表面；
- StrictMode 安全的订阅和清理；
- React Router、React Form、React locale adapter；
- ReactNode、React JSX 和 `forwardRef`。

Renderer 不得：

- 再实现一份 Core 已有的 reducer/controller/算法；
- 在 render/computed 中修改共享 controller 或缓存；
- 同时维护“框架状态”和“controller 状态”两个权威源；
- 为了 API 字面一致而暴露另一框架的术语；
- 把 DOM 监听复制到 Vue 和 React 两边。

### 4.5 `@aurora/theme`：唯一视觉源

视觉规范相同时，Theme 是唯一 canonical source：

- token、CSS Variables、组件 SCSS/CSS；
- namespace、BEM class、状态 class；
- light/dark、reduced-motion、响应式和窄屏规则；
- renderer 共用的 DOM/class 视觉契约。

Vue/React 组件目录中的样式文件只能是薄代理或极少量框架专属补丁。不能把同一视觉规则复制两份。

Horizon 与 Skyline 当前视觉规范一致时继续共用 `@aurora/theme`。只有真实视觉或发布生命周期分叉，才讨论产品 Theme 子入口，不能预先拆空包。

## 5. 能力归属决策表

实现任何功能前，先用下表判断，不能先移动代码再解释。

| 问题 | 归属 |
| --- | --- |
| 不使用 Vue/React、DOM、触摸运行时仍有意义吗？ | `@aurora/core` |
| 只依赖浏览器 DOM，Vue/React 都要使用吗？ | `@aurora/horizon-core` |
| 只依赖移动端/触摸/设备，Skyline Vue/React 都要使用吗？ | `@aurora/skyline-core` |
| 是 VNode/ReactNode、slot/render、框架 ref 或生命周期吗？ | 对应 renderer |
| 是统一 token、CSS 或 class 视觉规则吗？ | `@aurora/theme` |
| 只是为了目录一致、没有真实能力吗？ | 不创建 |

判断示例：

| 能力 | 正确位置 |
| --- | --- |
| Calendar 日期网格、范围归一化、禁用日期判断 | `@aurora/core/components/Calendar` |
| Calendar 键盘意图 reducer | 若纯语义则 `core`；若需要真实 DOM focus 则浏览器执行部分在 `horizon-core` |
| Calendar 滚动到月份、测量单元格、恢复焦点 | `@aurora/horizon-core/components/Calendar` |
| Calendar Vue slots 和 VNode 日期内容 | `@aurora/horizon-vue/components/Calendar` |
| Calendar React renderCell 和 ref | `@aurora/horizon-react/components/Calendar` |
| Calendar 统一视觉 | `@aurora/theme/styles/components/calendar` |
| 触摸滑动切月 | `@aurora/skyline-core/components/Calendar`，仅在 Skyline 实现时创建 |

## 6. Headless Hook/Controller 设计规范

### 6.1 命名与形态

框架无关的有状态能力统一使用 `createXxx`：

```ts
export interface CalendarController {
  getState(): CalendarState;
  subscribe(listener: () => void): () => void;
  update(options: CalendarOptions): void;
  select(date: CalendarDate, reason: CalendarSelectReason): CalendarResult;
  focus(date: CalendarDate): CalendarResult;
  destroy(): void;
}

export function createCalendarController(
  options: CalendarOptions,
): CalendarController {
  // framework-free implementation
}
```

纯算法使用动词函数：

```ts
normalizeCalendarValue(...)
createCalendarMonthGrid(...)
isCalendarDateDisabled(...)
reduceCalendarNavigation(...)
```

不要把无框架能力命名成 `useXxx`，避免与 Vue composable/React Hook 混淆。Renderer 可以提供私有 `useCalendarController`，但它只能订阅和适配 `createCalendarController`。

### 6.2 Controller 必须满足

- state/snapshot 是可预测的普通数据；
- action/command 表达用户意图，并带明确 reason/details；
- controlled 模式不能越权改变 renderer 的权威值；
- uncontrolled 模式由 controller 或 renderer 明确唯一持有，不能两边都持有；
- options 更新后状态按契约归一化；
- `subscribe` 取消订阅幂等；
- `destroy` 幂等，并使晚到异步结果失效；
- 不保存 VNode、ReactNode、框架实例或不可序列化 UI 内容；
- callback 不能在 reducer、React state updater 或 render/computed 内触发；
- 支持多实例，不使用不可控全局单例；
- 可以用普通 Vitest 在无 DOM 环境独立验证。

### 6.3 异步与资源生命周期

异步能力必须覆盖：

- 同一任务去重；
- generation/revision 失效；
- options、loader、fieldMap、数据源变化后的 stale result；
- resolve、false/prevent、reject、throw；
- pending 期间重复命令；
- unmount/destroy 后 resolve；
- listener、timer、observer、pointer capture 清理；
- StrictMode setup-cleanup-replay。

谁创建资源，谁负责完整销毁。Renderer 不得在 Core 已管理代次时再造一套 requestId，也不得同时让 Web Core 和 renderer 各注册一套 document listener。

### 6.4 纯函数优先，Controller 适度

下列能力优先纯函数：

- 值格式转换；
- 日期、树、列表、分页计算；
- display/summary/tag projection；
- 可见项、ARIA state、drop context；
- reducer 和状态迁移。

只有需要订阅、跨动作状态、异步所有权或资源生命周期时才使用 controller。不要把 Core 变成另一个 UI 框架。

## 7. 公共 Contract 规范

每个完成拆分的组件至少考虑以下文件：

```text
packages/core/src/components/<Component>/
├── contract.ts       # 公共语义类型、props subset、events/regions/commands
├── defaults.ts       # 如规模足够，可并入 contract
├── algorithms.ts     # 纯函数
├── controller.ts     # 确有状态能力时才创建
├── manifest.ts       # 文档/API 语义
├── index.ts
└── __tests__/
```

目录不要求每个文件都存在。不要为形式完整创建空文件。

公共层可定义：

- `XxxCommonProps`：只有跨 renderer 的语义输入；
- `XxxEventMap`：语义事件及 payload；
- `XxxRegionMap`：可定制内容区域的语义，不携带 VNode/ReactNode；
- `XxxCommandMap`：公开命令的语义签名；
- defaults、validators、reason/details；
- manifest、算法、controller。

公共层不能把 Vue props/emits/slots/exposes 或 React props/callbacks/renderers/ref 原样搬进去。Renderer 用类型化的 omit/rename/extend 得到原生 API。

公共 API 的中文 JSDoc 后必须紧邻 `@en` 英文说明。公共方法参数同时写 `@param` 和 `@paramEn`。

## 8. 目录镜像规则

仅当某层存在真实能力时创建同名组件目录：

```text
packages/core/src/components/Calendar
packages/horizon-core/src/components/Calendar
packages/horizon-vue/src/components/Calendar
packages/horizon-react/src/components/Calendar
packages/theme/styles/components/calendar
```

目录一致的目的，是让能力归属容易查找，不是要求所有层文件一一对应。

允许：

- Calendar 只有 Core 算法和 renderer，没有 Web Core 目录；
- 某组件使用跨组件的 FocusScope，而不再创建组件私有 FocusScope；
- Skyline 尚未实现时不存在 Skyline Calendar 目录。

禁止：

- 空 manifest、空 controller、只 re-export 的假能力目录；
- 把组件私有算法平铺到包级 `src`；
- renderer 深度导入另一个组件的私有 hook；
- 为保持镜像把 DOM 能力放进 `@aurora/core`。

## 9. 单组件迁移标准流程

每个组件必须按以下顺序推进。不得跳过审计直接复制实现。

### 第 1 步：建立基线

记录并冻结：

- Vue props、emits、slots、exposes；
- 默认值、validator、受控/非受控语义；
- DOM、class、ARIA、键盘、焦点和 pointer 行为；
- locale、theme、Form、Router、Portal/Teleport 集成；
- timer、observer、document/window listener、async loader；
- 已知兼容行为和已知缺陷；
- 当前文档中的全部用户场景；
- 现有测试数和覆盖缺口。

输出一份行为矩阵。事件顺序必须精确，例如“先 emit confirm，再请求 close”，不能只写“支持确认”。

### 第 2 步：能力切片

把功能逐项标记为：

- Core domain；
- Horizon Web；
- Skyline Mobile；
- Vue renderer；
- React renderer；
- Theme；
- Locale；
- 保留但暂不抽取，并说明原因。

如果无法清楚说明某段代码为何属于目标层，就先不要移动。

### 第 3 步：先实现 Core

要求：

- contract/defaults/validators 是语义唯一源；
- 算法无框架依赖；
- 有状态能力形成 `createXxx` 或明确 controller；
- controlled rollback、disabled、limit、async stale、destroy 被测试；
- manifest 和公共 JSDoc 完整；
- package boundary、typecheck、Core tests、build 通过。

### 第 4 步：实现产品 Core

只有真实 Web/移动能力才实施：

- DOM 或手势 primitive 可被两个 renderer 独立消费；
- 公开接口只依赖平台对象和 Core 数据；
- 监听、timer、observer、capture 清理完整；
- SSR import 安全；
- 使用真实运行环境测试。

### 第 5 步：Vue 回接

先让现有 Vue 组件消费新 Core/Product Core，证明抽取没有改变旧行为。

要求：

- props/emits/slots/exposes 保留 Vue 原生表面；
- 删除 renderer 内重复算法、状态机和 document listener；
- Vue reactive state 只是 controller snapshot/projection；
- 外部 prop 同步不产生回写；
- timers/watch/effect/unmount 清理完整；
- 原有 Vue 测试和新增回归通过。

### 第 6 步：实现 React

React 必须基于公共能力原生实现，禁止从 Vue 翻译后保留 Vue 心智模型。

要求：

- 使用 React 原生 props/callbacks/children/ref；
- controlled/uncontrolled、StrictMode、concurrent render 安全；
- render 阶段无 controller/cache 突变；
- effect 只同步已 commit 的状态；
- Portal、focus、Form、locale 等使用 React adapter；
- 行为覆盖 Vue 已公开场景，同时允许 React 原生 API 形态不同。

### 第 7 步：抽取 Theme

- Theme 成为 canonical source；
- Vue/React DOM class 契约稳定；
- renderer 原样样式改为薄代理；
- 原生 `button/input/a` reset 必须精确限定，不能覆盖 Horizon Button 等组件；
- 验证 light/dark、390px、长文本、disabled、focus-visible、reduced-motion。

### 第 8 步：文档与 Demo

- Vue 与 React 文档入口完全分开；
- 页面不写跨框架映射、对比或“另一端如何实现”；
- React 可运行 Demo 数量不得少于 Vue；
- Vue 每一个用户可见场景都要有独立 React 对应场景；
- 不允许用一个超大 Demo 合并多个 Vue Demo 来凑数量；
- React Demo 必须使用真实导出的公共 API 并通过 TSX typecheck；
- 中英文同一 renderer 的示例结构一致；
- API 表、Events/Callbacks、Slots/Renderers、Exposes/Ref 分别使用当前 renderer 术语。

### 第 9 步：验证与终审

必须完成：

- Core、Theme、Product Core、Vue、React typecheck/build；
- Core unit tests；
- Vue/React 真实 Chromium tests；
- 组件源四项覆盖率各自 `>= 95%`；
- docs typecheck、renderer isolation、docs build；
- consumer、SSR、tree-shaking（按组件风险）；
- boundaries、release dry-run；
- 精确旧包负向扫描；
- 只读终审，确认没有第二权威源、资源泄漏和 API 漂移。

### 第 10 步：提交与交接

- 只 stage 本组件和必要公共文件；
- 不覆盖、删除或顺手提交用户的无关修改；
- 不修改或提交 `.codex/config.toml`；
- commit message 清楚描述组件/层级；
- 推送当前任务分支；
- 交接中列出实际执行命令、通过数量、覆盖率和非阻断警告。

## 10. Renderer 状态适配规则

### 10.1 单一权威源

每个状态必须明确由谁持有：

- controlled：外部 prop 是权威；交互只提出 proposal；父级拒绝时 UI 和下一次交互必须仍基于旧 prop；
- uncontrolled：controller 或 renderer state 二选一持有；不能双份乐观状态；
- staged/needConfirm：formal 与 draft 的关闭、确认、取消、重开规则必须写入 Core contract；
- runtime data：明确 controlled `treeData/options` 与 `defaultTreeData/defaultOptions`，不能混合语义。

Renderer 为了触发重渲染可以保存 snapshot，但不能偷偷改变 controller 的权威状态。受控 proposal 后要么使用一次性 transition，要么立即回滚 controller，确保连续交互和 ref 命令正确。

### 10.2 Render/Computed 纯度

禁止：

- React render 中调用会突变 controller 的 `setTree/setOptions/sync`；
- React state updater 中调用外部 callback；
- Vue computed getter 中写 Map/Set、emit 或修改 controller；
- 因 render 被丢弃而污染 previous-label 等缓存。

缓存更新放在 commit 后的 effect/watch 中；显示 projection 用纯函数计算。

### 10.3 语义一致，不追求字面一致

共享的是：

- 值含义、默认值、disabled/limit 规则；
- event reason/details；
- command 语义；
- 异步与清理；
- ARIA/keyboard 行为意图。

不要求共享：

- Vue 的 `modelValue` 与 React 的 `value` 字面命名；
- slots 与 render props 的形态；
- exposes 与 ref handle 的框架类型；
- Teleport 与 Portal 的实现。

## 11. 文档与 Demo 强制规范

目录约定：

```text
packages/docs/zh/vue/components/<Component>.md
packages/docs/en/vue/components/<Component>.md
packages/docs/zh/react/components/<Component>.md
packages/docs/en/react/components/<Component>.md

packages/docs/demos/vue/components/<Component>/
packages/docs/demos/react/components/<Component>/
```

每次迁移先建立 Vue 场景清单，例如：

```text
basic
controlled
disabled
size
custom-content
async
keyboard
locale
responsive
```

然后逐项建立 React 独立 Demo。React 数量必须 `>=` Vue 数量，且场景逐项可追踪。若某场景在 React 不成立，必须在整改记录中说明产品原因并提供 React 等价用户场景，不能静默省略。

组件文档禁止出现：

- “Vue 中对应 React 的……”；
- “React 是从 Vue 映射而来……”；
- 跨 renderer API 对照表；
- 另一 renderer 的包名、组件名或示例代码；
- 为了说明实现过程而暴露内部拆分细节。

架构指南可以讨论 renderer 边界，但用户组件文档只能讲当前 renderer。

## 12. 测试与质量门禁

### 12.1 Core 测试

至少覆盖：

- defaults、validator、normalization；
- controlled/uncontrolled；
- repeated action、disabled、read-only、limit；
- empty/error/unknown value；
- async success/false/reject/throw/stale/destroy；
- reducer/navigation/drop/filter 等共享向量；
- 多实例隔离。

### 12.2 Renderer 浏览器测试

必须使用仓库 Browser Mode + Playwright Chromium。禁止用 jsdom/happy-dom 替代。

至少覆盖：

- 真实 focus、Tab/Shift+Tab、Arrow/Home/End/Enter/Escape；
- pointer/mouse/touch 适用路径；
- role、accessible name、expanded/selected/checked/disabled；
- controlled parent 拒绝和随后接受；
- Portal/Teleport、outside、top-layer、focus restore；
- 动态 props、StrictMode、快速开关；
- unmount 后 listener/timer/observer/async 不再产生副作用；
- 390px 无横向溢出、长文本、dark/reduced-motion。

### 12.3 覆盖率

迁移组件生产源码必须同时达到：

```text
Statements >= 95%
Branches   >= 95%
Functions  >= 95%
Lines      >= 95%
```

禁止：

- 添加 coverage ignore；
- 排除难测文件；
- 降低 threshold；
- 用无意义断言冲数字；
- 只报告 package 总覆盖掩盖组件覆盖。

### 12.4 建议命令

命令按包实际 scripts 调整，但至少应覆盖：

```bash
bun --filter @aurora/core typecheck
bun --filter @aurora/core test
bun --filter @aurora/core build

bun --filter @aurora/theme typecheck
bun --filter @aurora/theme build

bun --filter @aurora/horizon-core typecheck
bun --filter @aurora/horizon-core test:browser
bun --filter @aurora/horizon-core build

bun --filter @aurora/horizon-vue typecheck
bun --filter @aurora/horizon-vue test
bun --filter @aurora/horizon-vue build

bun --filter @aurora/horizon-react typecheck
bun --filter @aurora/horizon-react test
bun --filter @aurora/horizon-react build

bun run contracts:generate
bun run docs:check-renderers
bun run docs:build
bun run test:consumers
bun run release:dry-run
bun run check:boundaries
```

若 Browser Mode 因沙箱端口限制无法启动，必须在允许真实端口的环境重跑。不能把“未执行任何用例”报告为测试通过或源码失败。

## 13. 包名 Breaking Migration

目标包名：

```text
@aurora/core
@aurora/theme
@aurora/horizon-core
@aurora/horizon-vue
@aurora/horizon-react
@aurora/skyline-core
@aurora/skyline-vue
@aurora/skyline-react
```

禁止恢复或新增以下旧组件包的兼容能力：

```text
@aurora/horizon-web
@aurora/horizon-web-core
@aurora/horizon-web-vue
@aurora/horizon-web-react
```

不得创建：

- compatibility package；
- package alias；
- re-export 入口；
- resolver fallback；
- tsconfig/Vite alias；
- publish/release 兼容项；
- 文档或 Demo 旧包导入；
- lockfile 中的旧 workspace dependency。

`@aurora/eslint-plugin-horizon-web` 注册的规则简写 `@aurora/horizon-web/*` 不是组件包兼容入口，必须保留。项目品牌、CSS class 或历史迁移说明也不能被盲目批量替换。

每批结束执行精确扫描，并人工区分合法字符串与真实兼容入口。

## 14. Theme、Locale 与无障碍

### Theme

- Vue/React 使用同一组件 token 和 canonical 样式；
- DOM/class 差异必须有明确理由；
- 组件样式不能依赖框架生成的私有属性；
- 原生元素 reset 使用精确 selector 并排除已有 Horizon 组件 class；
- 组件与 directive 同名 class 冲突必须消除或使用 modifier 隔离。

### Locale

- locale key 和默认文案语义放公共层；
- Vue/React 只负责响应式/Context 接入；
- renderer props 文案优先于 Provider/locale fallback；
- SSR locale 不能跨请求泄漏；
- 禁止硬编码不可本地化的按钮 aria-label。

### Accessibility

- 先定义实际 DOM focus 位于哪里，再设置 `aria-activedescendant`；
- controls 必须指向真实挂载元素；
- dialog/alertdialog 必须有可访问名称；
- disabled 元素不能进入错误的 roving focus；
- 嵌套 layer 只允许顶层处理 Escape/outside；
- 关闭后恢复正确 trigger/父 layer 焦点。

## 15. AI 执行规则

交给其他 AI 时，必须遵循：

1. 先确认分支、工作树和当前包名；
2. 完整阅读适用 Skill，不凭记忆执行；
3. 先只读审计，再提出能力切片；
4. 不盲目批量替换 `horizon-web` 字符串；
5. 不因为“代码相似”就共享 renderer 代码；
6. 不因为“目录一致”就创建空 Core/Product Core；
7. 不修改任务外文件，不清理用户工作树；
8. 不触碰或提交 `.codex/config.toml`；
9. 不通过删测试、改 threshold 或加 ignore 解决失败；
10. 不声称未实际运行的命令通过；
11. 发现架构边界不清时先记录 blocker，不在 renderer 偷偷复制实现；
12. 每次修复都补能锁住根因的回归，而不是只改旧快照；
13. 结束前做只读终审，重新检查当前快照，防止并发覆盖；
14. 只提交任务范围，列出 commit、push 和验证证据。

## 16. 禁止做法清单

- 复制 Vue 目录后逐文件改成 React；
- 用字符串替换、AST 转译或自定义 VDOM 长期统一渲染；
- 把 Vue props/emits/slots/exposes 整包搬入 Core；
- 把 ReactNode/VNode 放进公共 contract；
- Renderer 各自维护同一 selection/expansion/filter/async 状态机；
- Core 与 renderer 同时管理同一 pending/generation；
- Product Core 和 renderer 同时注册 document listener；
- 在 React render 或 Vue computed 中产生外部副作用；
- 为共享率或镜像目录而制造无业务价值的抽象；
- 在组件文档中写跨框架映射或比较；
- React Demo 少于 Vue 或用单个大 Demo 凑覆盖；
- 恢复旧包 alias/compat/re-export；
- 为通过测试降低质量门禁；
- 把已知缺陷原样复制到另一个 renderer，却不记录风险。

## 17. 单组件任务卡模板

其他 AI 开始组件迁移前，应填写以下任务卡：

```md
# <Component> 解耦任务卡

## 基线
- Vue API：
- 事件顺序：
- slots/exposes：
- DOM/ARIA/focus：
- async/listener/timer：
- Theme/locale：
- Vue Demo 清单：
- 现有测试与已知缺陷：

## 能力切片
- @aurora/core：
- @aurora/horizon-core：
- @aurora/skyline-core：
- Vue renderer：
- React renderer：
- Theme：
- 暂不抽取及原因：

## Headless API
- Pure functions：
- createXxx/controller：
- state/actions/reasons：
- async/destroy：

## Renderer 适配
- Vue controlled/uncontrolled：
- React controlled/uncontrolled：
- framework-native extensions：

## 验收
- Core tests：
- Web Core browser tests：
- Vue Chromium：
- React Chromium：
- 四项覆盖率：
- docs/demo parity：
- builds/consumers/release/boundaries：
- legacy package negative scan：
```

## 18. Definition of Done

一个组件只有同时满足以下条件才算“完全拆分”：

- 真实能力被放入正确层级，没有为了拆分而拆分；
- 跨产品行为由 `@aurora/core` 唯一实现；
- Horizon Web 行为由 `@aurora/horizon-core` 唯一实现；
- Skyline 目录只在存在真实移动能力时创建；
- 有状态公共能力完成框架无关 Hook/Controller 化；
- Vue 和 React renderer 不再复制共享算法、状态机和资源生命周期；
- Vue 公开行为得到回归保护；
- React 使用原生、可维护的公开 API；
- Theme 为唯一视觉源；
- locale、ARIA、focus、keyboard、pointer、responsive 完整；
- Vue/React 文档分离，React Demo 数量和场景不低于 Vue；
- 公共 JSDoc 中英文完整；
- Core、Product Core、Vue、React 测试和构建通过；
- 组件源 Statements/Branches/Functions/Lines 均达到 95%；
- docs、consumer、SSR/tree-shaking、release dry-run、boundary 检查按风险通过；
- 精确扫描不存在旧组件包兼容入口；
- 没有资源泄漏、第二状态权威源或未说明的行为差异；
- 变更已独立提交并推送，且未混入用户无关文件。

## 19. 执行原则总结

这次整改的判断标准不是“拆出了多少包”或“共享了多少行代码”，而是：

> 同一个领域行为是否只有一个清晰、无框架、可测试的权威实现；产品平台能力是否位于正确 Product Core；Vue 和 React 是否只承担各自擅长的 API、生命周期与渲染；任何资源、状态和异步任务是否都能被可靠验证和销毁。

如果拆分后代码更难理解、状态源更多、跨包调用更深，说明拆分方向错误，应回到能力切片重新设计，而不是继续堆适配层。
