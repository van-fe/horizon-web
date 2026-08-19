# Horizon Web 单元测试覆盖审计与补测计划

> 审计日期：2026-08-11
> 范围：`packages/horizon-vue/src/components` 下 87 个一级组件包
> 原则：测试公开行为和用户可观察结果，不以私有实现或快照数量代替行为覆盖。

## 当前实施结果

- [x] 所有 Horizon Web DOM、组件、指令、交互、布局和可访问性测试已迁移到 Vitest Browser Mode，并由 Playwright headless Chromium 执行。
- [x] 全量真实浏览器回归：265 个测试文件，2,295 个通过，1 个预期失败，共 2,296 个测试。
- [x] 纯源码分析、Sass 规则和 Bun runtime 测试已拆到独立 Node 项目：10 个测试文件，23 个测试全部通过。
- [x] `happy-dom`、`jsdom` 已从直接开发依赖和测试配置中移除；仓库源码与配置无相关环境引用。
- [x] 根目录及 `horizon-web`、`horizon-react`、`colors`、`upload-adapters`、`unplugin-resolver`、`locale-react` 的 DOM 测试入口统一为无头 Chromium。
- [x] 组件开发 skill 已固化真实浏览器要求，后续不得以 DOM 模拟器作为组件测试回退方案。

本清单下方的“足够 / 部分 / 不足”分类保留为补测前的审计基线，用于说明本轮为何选择这些补测场景；不能再当作迁移后的实时覆盖率结论。重新采集 Browser Mode 覆盖率后再更新百分比。

## 第二轮：完整公开 API 契约与 95% 覆盖率

验收口径：

- 每个公开 prop 至少有一个用户可观察的渲染、状态、样式、子组件配置或交互结果断言。
- 每个 emit 都验证真实触发路径、调用次数和 payload；不直接调用 emit validator 代替行为测试。
- 每个 slot 都验证实际渲染位置；作用域 slot 同时验证 slot props。
- click、input、change、keydown、focus、blur、pointer、drag、scroll 和媒体生命周期等事件使用 Chromium 原生行为验证。
- Browser Mode 的全局 setup 必须载入 `src/styles/index.scss`，几何、可见性、动画、overflow、响应式和 placement 断言均基于真实 Horizon CSS。
- 覆盖率由 Vitest Browser Mode + Playwright headless Chromium + coverage-v8 采集。
- Statements、Branches、Functions、Lines 四项全局指标必须分别达到 95%，并写入测试配置作为硬阈值。
- 不通过排除生产组件源码、忽略困难分支或只断言 API “当前无效”来提高覆盖率；仅测试文件、生成文件和纯类型声明可合理排除。

补测前的静态排查下限识别出 1,928 个 prop 声明、464 个 emit 和 378 个 slot。其中至少 944/182/164 项在组件自身测试中没有明确 API 引用。该扫描包含公开子组件 API，也无法证明字符串引用等于行为覆盖，因此最终结论以行为测试审查和 coverage-v8 报告为准。

### 第二轮实测进度

- [x] 87/87 个一级组件包的公开 API 静态缺项已清零：当前元数据共 1,929 个 props、465 个 emits、378 个 slots，未明确映射到组件测试的项目为 0/0/0。
- [x] 所有新增 DOM 测试均由 Vitest Browser Mode、Playwright headless Chromium 和真实 `src/styles/index.scss` 执行。
- [x] A–D 范围严格生产源码聚合覆盖率：Statements 98.43%、Branches 95.01%、Functions 97.92%、Lines 98.71%；74 个文件、632 个测试全部通过。
- [x] D–P 范围严格生产源码聚合覆盖率：Statements 98.26%、Branches 95.42%、Functions 98.79%、Lines 98.48%；52 个文件、494 个测试全部通过。
- [x] P–W 范围已按 Table、小组件、交互组件和媒体/虚拟化四组完成真实浏览器覆盖率验收；各组四项均达到 95%，其中 Table 为 98.15% / 95.50% / 98.15% / 98.63%，媒体/虚拟化为 98.44% / 97.01% / 98.57% / 98.76%。
- [x] Browser 配置已写入 coverage-v8 四项 95% 阈值；不得通过排除生产 hooks、exposes、元数据模块或添加 coverage-ignore 达标。
- [x] 87 个一级组件包统一验收：Statements 98.09%（21,337/21,752）、Branches 95.35%（13,900/14,577）、Functions 97.89%（6,146/6,278）、Lines 98.33%（19,897/20,233）；265 个 Browser Mode 测试文件全部通过。

上述覆盖率均只统计 87 个一级组件包的生产源码，不把 `__tests__` 计入分子或分母。coverage include 由配置枚举 `src/components` 的实际一级目录生成，避免误匹配 `src/methods/*/src/components` 下的内部实现。

## 迁移前审计基线

- DOM 模拟环境单测：176 个测试文件，1103 个通过，1 个预期失败。
- 真实浏览器单测：12 个测试文件，15 个通过。
- 组件源码覆盖率：行 70.21%、分支 58.13%、函数 67.84%。
- 仓库当前未配置强制覆盖率阈值。
- 覆盖率由 Node 启动 Vitest 采集，并排除只验证 Bun 运行时的 `bun-runtime.test.ts`；常规单测仍使用仓库规定的 Bun 命令验证。

## 判定标准

- `足够`：核心公开契约、主要交互、禁用状态及适用的键盘、可访问性、受控状态、异常和清理逻辑已有稳定测试。
- `部分`：已有有价值的行为测试，但仍缺少一个或多个高风险公开契约。
- `不足`：以 basic/mount 测试为主，或复杂组件的重要交互、事件和边界大面积未覆盖。
- 数字只用于发现风险。最终结论还会结合测试断言质量和组件复杂度判断。

## 开源测试参考

补测前优先阅读以下项目官方 GitHub 仓库中的同类组件测试，再把场景映射到 Horizon 的公开 API：

- [Element Plus](https://github.com/element-plus/element-plus/tree/dev/packages/components)
- [Arco Design Vue](https://github.com/arco-design/arco-design-vue/tree/main/packages/web-vue/components)
- [Ant Design Vue](https://github.com/vueComponent/ant-design-vue/tree/main/components)
- [Naive UI](https://github.com/tusen-ai/naive-ui/tree/main/src)

可借鉴场景，但不复制依赖其他组件库内部 DOM、类名或实现细节的断言。每个 Horizon 测试必须以本组件的 props、emits、slots、exposes、ARIA 语义或用户操作结果为依据。

## 完整清单

### 足够（36）

- [x] Affix
- [x] Application
- [x] Avatar
- [x] Button
- [x] Carousel
- [x] Cascader
- [x] ChatBubble
- [x] Empty
- [x] Hover
- [x] InputNumber
- [x] InputOtp
- [x] Layout
- [x] LicensePlateInput
- [x] Link
- [x] List
- [x] Mentions
- [x] PageHeader
- [x] Pagination
- [x] Panels
- [x] Picker
- [x] QRCode
- [x] Radio
- [x] Result
- [x] Select
- [x] SortableList
- [x] Space
- [x] Spin
- [x] Splitter
- [x] Statistic
- [x] Switch
- [x] Table
- [x] Time
- [x] TimeSelect
- [x] Tree
- [x] Typography
- [x] VideoPlayer

### 部分覆盖（28）

| 状态 | 组件 | 测试声明 | 行/分支覆盖 | 首要补测内容 |
| --- | --- | ---: | ---: | --- |
| [ ] | AudioPlayer | 12 | 65.6% / 50.0% | 媒体失败、源切换、生命周期清理 |
| [ ] | AutoComplete | 4 | 84.7% / 60.2% | 禁用、清空、过滤、受控事件 |
| [ ] | Badge | 2 | 69.2% / 56.3% | 上限、隐藏、内容与动态样式 |
| [ ] | Breadcrumb | 6 | 70.1% / 34.6% | 分隔符、键盘、可访问性 |
| [ ] | Calendar | 31 | 69.7% / 51.3% | 键盘导航、ARIA、时区边界 |
| [ ] | Card | 1 | 100% / 50.0% | 插槽与条件渲染 |
| [ ] | Checkbox | 8 | 80.5% / 79.2% | 点击、禁用、事件载荷、Group 限制 |
| [ ] | Collapse | 7 | 100% / 71.7% | 禁用项、手风琴、嵌套场景 |
| [ ] | CommandPalette | 2 | 69.2% / 38.6% | 键盘、ARIA、禁用、空结果 |
| [ ] | Controls | 2 | 61.5% / 33.3% | 状态切换、禁用、事件 |
| [ ] | Count | 1 | 75.0% / 60.0% | 边界值、格式化、动态更新 |
| [ ] | Dialog | 14 | 73.5% / 63.7% | Escape、焦点管理、禁用操作 |
| [ ] | Divider | 1 | 90.0% / 50.0% | 方向、内容位置、动态属性 |
| [ ] | Drawer | 11 | 75.6% / 54.5% | 键盘关闭、焦点、Teleport |
| [ ] | Dropdown | 29 | 76.4% / 55.8% | 键盘菜单导航、ARIA |
| [ ] | Form | 21 | 77.1% / 60.3% | 异步校验竞态、动态字段 |
| [ ] | Input | 19 | 64.4% / 60.0% | 键盘边界、readonly、输入类型 |
| [ ] | Popconfirm | 2 | 89.1% / 66.7% | 禁用、取消、失败、重复提交 |
| [ ] | Popover | 8 | 92.4% / 75.3% | Escape、焦点、键盘触发 |
| [ ] | Rate | 2 | 65.3% / 42.4% | 禁用、readonly、事件载荷 |
| [ ] | Segmented | 14 | 74.8% / 65.2% | 受控回退、焦点、动态禁用 |
| [ ] | Steps | 6 | 91.3% / 74.0% | 键盘、步骤状态 ARIA |
| [ ] | Tabs | 7 | 68.0% / 51.4% | 添加/关闭事件、禁用、受控值 |
| [ ] | Tag | 22 | 65.5% / 56.8% | 关闭竞态、加载、动态状态 |
| [ ] | Transfer | 9 | 64.9% / 61.5% | 键盘操作、ARIA、边界选择 |
| [ ] | TreeSelect | 17 | 73.8% / 65.3% | 插槽、Expose、空态、加载 |
| [ ] | VirtualScroller | 11 | 74.2% / 57.9% | Resize、销毁清理、滚动竞态 |
| [ ] | Watermark | 4 | 75.9% / 56.1% | DOM 篡改恢复、动态属性、异常输入 |

### 明显不足（23）

| 状态 | 组件 | 测试声明 | 行/分支覆盖 | 首要补测内容 |
| --- | --- | ---: | ---: | --- |
| [ ] | Alert | 3 | 54.8% / 63.2% | 关闭、事件、插槽、动态显示 |
| [ ] | Anchor | 6 | 53.6% / 31.3% | 滚动定位、激活状态、键盘行为 |
| [ ] | Backtop | 1 | 8.9% / 0% | 可见阈值、滚动、点击事件、清理 |
| [ ] | ColorPicker | 3 | 49.3% / 39.7% | 颜色选择、格式、事件、键盘 |
| [ ] | Container | 1 | 36.8% / 0% | 布局分支、插槽、动态属性 |
| [ ] | DatePicker | 1 | 35.5% / 23.6% | 选择、范围、禁用、清空、事件、键盘 |
| [ ] | Descriptions | 1 | 60.9% / 25.0% | 布局、插槽、响应式分支 |
| [ ] | FloatButton | 1 | 40.5% / 32.4% | 点击、禁用、Group、Tooltip |
| [ ] | Guide | 2 | 35.4% / 10.8% | 步骤切换、键盘、遮罩、销毁清理 |
| [ ] | Image | 1 | 34.6% / 17.9% | 加载、失败、预览、事件 |
| [ ] | ImageCropper | 2 | 52.0% / 28.6% | 拖拽、文件、导出、异常路径 |
| [ ] | Mask | 1 | 40.0% / 6.7% | 点击、关闭、Teleport、层级 |
| [ ] | Menu | 2 | 48.3% / 28.9% | 选择、展开、禁用、键盘、ARIA |
| [ ] | Progress | 1 | 52.9% / 28.6% | 状态、边界、格式化 |
| [ ] | Scrollbar | 1 | 58.4% / 30.9% | 滚动、Expose、尺寸同步、清理 |
| [ ] | Skeleton | 1 | 50.0% / 0% | 动画、变体、加载切换 |
| [ ] | Slider | 6 | 58.5% / 33.0% | 禁用、范围、事件、ARIA |
| [ ] | TimePicker | 1 | 34.8% / 21.5% | 选择、清空、禁用、格式、事件、键盘 |
| [ ] | Timeline | 1 | 8.6% / 0% | 项目渲染、位置、插槽、动态更新 |
| [ ] | Tooltip | 2 | 57.0% / 41.3% | 触发方式、键盘、延迟、销毁 |
| [ ] | Transition | 1 | 41.3% / 49.3% | 生命周期、不同动画状态、禁用动画 |
| [ ] | Upload | 21 | 48.8% / 34.0% | UI 主流程、校验、移除、失败、重试 |
| [ ] | Viewer | 6 | 55.7% / 39.2% | 工具栏、禁用、事件、错误状态 |

## 工作包

### P0：复杂且覆盖明显不足

- [x] 日期与选择：DatePicker、TimePicker、ColorPicker、Slider、Menu
- [x] 媒体与数据：Image、ImageCropper、Scrollbar、Upload、Viewer
- [x] 展示与导航：Alert、Anchor、Backtop、Container、Descriptions、FloatButton、Guide、Mask、Progress、Skeleton、Timeline、Tooltip、Transition

### P1：已有测试但重要契约缺失

- [x] 输入与选择：AutoComplete、Checkbox、Input、Rate、Segmented、Transfer、TreeSelect
- [x] 弹层与导航：Breadcrumb、Calendar、Collapse、CommandPalette、Dialog、Drawer、Dropdown、Popconfirm、Popover、Steps、Tabs
- [x] 展示与基础：Badge、Card、Controls、Count、Divider、Form、Tag
- [x] 媒体与性能：AudioPlayer、VirtualScroller、Watermark

P0、P1 的公开行为、边界条件、异步清理和真实浏览器分支均已纳入本轮补测；最终结论由 API 静态审计、focused Browser Mode 和统一 coverage-v8 三类证据共同确认。

## 每个组件的完成条件

- [x] 测试覆盖正常交互和禁用行为。
- [x] 适用时覆盖键盘、焦点、ARIA 和 Tab 顺序。
- [x] 受控 props、内部状态和 emitted payload 保持同步。
- [x] 适用时覆盖空态、加载、失败、重试和清理。
- [x] 异步逻辑不会重复触发，也不会接受陈旧结果。
- [x] 对重要复用控件添加集成契约测试。
- [x] 测试场景有开源同类组件或真实回归场景依据。
- [x] 聚焦单测通过。
- [x] 全量 headless Chromium 与独立 Node-only 测试通过。
- [x] 重新采集覆盖率并更新本清单。
