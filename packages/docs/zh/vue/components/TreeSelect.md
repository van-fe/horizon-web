## 基本用法

`TreeSelect` 结合了选择器与树的大部分能力。传入 `tree-data`，并确保整棵树中的 `value` 唯一。

:::demo vue/components/TreeSelect/basic.vue :::

## 可清空

设置 `clearable = true`，让用户移除已有选择。

:::demo vue/components/TreeSelect/clearable.vue :::

## 单选

单选模式可开启 `show-radio`，让选择方式更明确。

:::demo vue/components/TreeSelect/single.vue :::

## 多选

设置 `multiple = true` 开启多选；`collapse-tags`、`collapse-tags-tooltip` 和 `max-collapse-tags` 用于控制标签展示。

:::demo vue/components/TreeSelect/multiple.vue :::

## 多选限制

`multiple-limit` 可以限制最多选择多少个节点。

:::demo vue/components/TreeSelect/multiple-limit.vue :::

## 父子关联

`check-strictly` 控制父子节点是否联动。严格模式下，每个节点可独立选择。

:::demo vue/components/TreeSelect/check-strictly.vue :::

## 展开与选择

`expand-on-click-node` 控制整行展开；多选时，`check-on-click-node` 控制整行勾选。

:::demo vue/components/TreeSelect/expand-and-check.vue :::

## 叶子节点选择

`check-on-click-leaf` 控制点击叶子节点整行是否选择。关闭后需要直接操作选择控件。

:::demo vue/components/TreeSelect/check-on-leaf.vue :::

## 受控展开

使用 `expand-values` 或 `v-model:expand-values` 控制并读取面板中的展开节点。

:::demo vue/components/TreeSelect/expand-values.vue :::

## 默认全部展开

`is-default-expand-all` 仅在树实例创建时生效；异步数据应在准备完成后再创建组件。

:::demo vue/components/TreeSelect/default-expand-all.vue :::

## 禁用

节点的 `disabled` 只禁用该项，组件的 `disabled` 会禁用整个选择器。

:::demo vue/components/TreeSelect/disabled.vue :::

## 自定义展开图标

只设置 `fold-icon` 时图标会旋转；同时设置 `fold-icon` 与 `expand-icon` 可使用两套状态图标。

:::demo vue/components/TreeSelect/expand-icon.vue :::

## 选项统计

多选时设置 `use-statistic = true` 显示数量摘要，`statistic-text` 可自定义统计文字。

:::demo vue/components/TreeSelect/statistic.vue :::

## 过滤

设置 `filterable = true` 开启触发器内搜索，并可通过 `filter-method` 自定义匹配。

:::demo vue/components/TreeSelect/filter.vue :::

## 保留搜索关键字

多选过滤时，`reserve-keyword` 支持始终保留、始终清空、仅反选保留和特殊持续过滤四种行为。

:::demo vue/components/TreeSelect/reserve-keyword.vue :::

## 面板过滤

开启 `panel-filterable` 后，可使用 `use-build-in-panel-filter` 的内置输入框，或通过 `panelHeaderRender` 自定义面板头并传入 `panel-filter-input-value`。

:::demo vue/components/TreeSelect/filter-in-panel.vue :::

## 自定义高亮

通过 `highlight-method` 自定义过滤结果的高亮渲染。建议返回 VNode，避免拼接 HTML。

:::demo vue/components/TreeSelect/highlight-filter.vue :::

## 动态加载

按需加载的节点需要设置 `isLeaf = false`，并由 `dynamic-load` 返回子节点。

:::demo vue/components/TreeSelect/dynamic-load.vue :::

## 自定义节点

使用 `treeNodeRender` 插槽自定义所有树节点；数据项的 `label` 渲染函数可覆盖单个节点。

:::demo vue/components/TreeSelect/custom-render.vue :::

## 字段映射

`field-map` 可把外部字段映射到 `value`、`label` 与 `children`。不要用同一字段覆盖多个内置含义。

:::demo vue/components/TreeSelect/field-map.vue :::

## 虚拟滚动

大数据量时设置 `use-virtual-scroll = true`，并提供 `height` 或 `max-height` 限制面板高度。

:::demo vue/components/TreeSelect/virtual-scroll.vue :::

## 不可选择

`selectable = false` 会阻止当前节点被直接选择，但仍允许展开并选择其可选后代；`disabled` 同时阻止节点交互。

:::demo vue/components/TreeSelect/selectable.vue :::

## 前缀图标

通过 `prefix-icon` 为树节点添加统一图标，帮助用户识别选项类型。

:::demo vue/components/TreeSelect/prefix-icon.vue :::

## 强调选中项

设置 `stress = true`，在下拉树中用品牌色突出当前选中项。

:::demo vue/components/TreeSelect/stress.vue :::

## Props

### 值、触发器与浮层

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model-value` | `HTreeSelectModelValueType` | — | 选中值，支持 `v-model`。 |
| `initial-value` | `HTreeSelectModelValueType` | `[]` | 清空时使用的回退值。 |
| `trigger` | `'click' \| 'hover'` | `'click'` | 浮层触发方式。 |
| `disabled` | `boolean` | 继承值 | 禁用触发器与树交互。 |
| `clearable` | `boolean` | `false` | 非空选择时显示清空操作。 |
| `placeholder` | `string` | 国际化值 | 触发器占位文字。 |
| `size` / `tree-size` | `'small' \| 'medium' \| 'large'` / `TreeSize` | 继承值 | 触发器与树节点行尺寸。 |
| `input-style` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | 触发器视觉样式。 |
| `input-status` | `PickerInputStatusType` | `'normal'` | 触发器校验状态。 |
| `input-attrs` | `PickerNativeInputAttrs` | — | 触发输入框的原生无障碍与数据属性。 |
| `dropdown-icon` | `Icon \| false` | 默认图标 | 下拉后缀图标。 |
| `to-body` | `boolean` | `true` | 将浮层 Teleport 到 `body`。 |
| `placement` | `PopoverPlacement` | `'bottom-start'` | 首选浮层位置。 |
| `flip` | `boolean` | `true` | 空间不足时允许翻转位置。 |
| `hover-show-delay` / `hover-hide-delay` | `number` | `0` / `200` | hover 触发延迟，单位为毫秒。 |
| `popover-options` | `Partial<PopoverProps>` | — | 额外的 Popover 属性。 |
| `popper-class-name` | `string` | — | 浮层类名。 |
| `tree-width` | `string` | — | 树面板宽度。 |
| `search-panel-width` | `string \| number` | `''` | 搜索结果面板宽度。 |
| `fit-input-width` | `boolean \| 'fit-content'` | `true` | 浮层宽度策略。 |
| `fit-content-input-min-width` | `string \| number` | `1` | 自适应触发器的最小宽度。 |

### 选择展示与确认

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `multiple` | `boolean` | `false` | 开启多选。 |
| `multiple-limit` | `number` | `Infinity` | 最大选中数量。 |
| `collapse-tags` | `boolean` | `false` | 折叠多选标签。 |
| `collapse-tags-tooltip` | `boolean` | `false` | 悬浮摘要标签时显示隐藏文字。 |
| `max-collapse-tags` | `number` | — | 出现摘要前最多展示的标签数。 |
| `collapse-tags-fill-up` | `boolean` | `true` | 让标签尽量填满触发器。 |
| `collapsed-tags-props` | `Partial<TagProps>` | — | 折叠 `+N` 标签的属性。 |
| `use-statistic` | `boolean` | `false` | 使用选择数量摘要替代标签。 |
| `statistic-text` | `string` | 国际化值 | 摘要前置文字。 |
| `need-confirm` | `boolean` | `false` | 确认前暂存选择变化。 |
| `confirm-button-text` / `cancel-button-text` | `string` | 国际化值 | 确认操作文字。 |

### 筛选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `filterable` | `boolean` | `false` | 开启触发器筛选。 |
| `filter-method` | `HTreeFilterMethodType` | 默认标签匹配 | 自定义节点匹配方法。 |
| `filter-to-hide-children` | `boolean` | `true` | 筛选时隐藏不匹配的子节点。 |
| `expand-filtered-tree` | `boolean` | `true` | 展开包含匹配项的分支。 |
| `reserve-keyword` | `boolean \| 'reserve-deselect' \| 'reserve-special'` | `true` | 选择后的关键词保留策略。 |
| `input-emit-frequency` | `number` | `200` | 输入事件间隔，单位为毫秒。 |
| `search-icon` | `Icon \| false` | 搜索图标 | 触发器搜索图标。 |
| `panel-filterable` | `boolean` | `false` | 允许从面板内筛选。 |
| `panel-filter-input-value` | `string` | `''` | 外部面板筛选文字。 |
| `use-build-in-panel-filter` | `boolean` | `false` | 显示内置面板筛选输入框。 |
| `panel-input-placeholder` | `string` | 国际化值 | 面板筛选输入框占位文字。 |
| `highlight-method` | `HTreeHighlightMethod` | — | 渲染高亮匹配文字。 |
| `search-input-placeholder` | `string` | 国际化值 | 树筛选输入框占位文字。 |
| `empty-text` | `string` | 国际化值 | 空结果文字。 |

### 树数据、展开与选择

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `tree-data` | `HTreeData[]` | `[]` | 层级数据，整棵树中的值必须唯一。 |
| `field-map` | `HTreeFieldMap` | — | 将数据源字段映射到树字段。 |
| `expand-values` | `HTreeUuidType[]` | — | 展开值，支持 `v-model:expand-values`。 |
| `selected-values` | `HTreeUuidType[]` | `[]` | 树选择状态输入。 |
| `is-default-expand-all` | `boolean` | `false` | 默认展开全部初始分支。 |
| `is-default-expand-parent` | `boolean` | `true` | 解析展开值时包含祖先。 |
| `expand-on-click-node` | `boolean` | `true` | 点击分支整行时切换展开。 |
| `fold-icon` / `expand-icon` | `Icon` | 三角图标 / — | 收起与展开分支图标。 |
| `prefix-icon` | `Icon` | — | 节点共用的前缀图标。 |
| `check-strictly` | `boolean` | `false` | 让父子节点独立选择。 |
| `check-on-click-node` | `boolean` | `false` | 多选时点击分支整行进行选择。 |
| `check-on-click-leaf` | `boolean` | `true` | 点击叶子整行进行选择。 |
| `show-checkbox` / `show-radio` | `boolean` | `true` / `false` | 显示明确的选择控件。 |
| `parent-effect-disabled-child` | `boolean` | `false` | 允许父节点选择影响禁用后代。 |
| `stress` | `boolean` | `false` | 强调选中的节点行。 |
| `dynamic-load` | `HTreeDynamicLoadMethod` | — | 展开 `isLeaf: false` 分支时加载子节点。 |

### 布局、提示与拖拽

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `height` / `max-height` | `number` / `string \| number` | — / `256` | 树可视区域尺寸。 |
| `use-virtual-scroll` | `boolean` | `false` | 开启虚拟滚动。 |
| `expand-panel-by-children` | `boolean` | `false` | 允许子元素撑开虚拟滚动容器。 |
| `root-class-name` / `root-style` | `string` / `CSSProperties` | — | 树根元素类名与行内样式。 |
| `indent` | `number` | `24` | 每层缩进的像素值。 |
| `tooltip` | `boolean` | `true` | 开启节点文字提示。 |
| `tooltip-show-after` / `tooltip-hide-after` | `number` | `100` / `200` | 提示延迟，单位为毫秒。 |
| `show-line` | `boolean` | `false` | 显示节点连线。 |
| `draggable` | `boolean` | `false` | 开启拖拽排序。 |
| `drag-on-handler` | `boolean` | `true` | 只从手柄开始拖拽。 |
| `drag-to-leaf` | `boolean` | `true` | 允许拖入叶子节点。 |
| `before-drop` | `TreeBeforeDrop` | — | 提交放置前进行拦截。 |
| `draggable-icon` / `undraggable-icon` | `Icon \| false` | 拖拽图标 / `false` | 可移动与固定节点的拖拽手柄。 |
| `draggable-icon-always-visible` | `boolean` | `false` | 始终显示拖拽手柄。 |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:model-value` | `(value)` | 更新 `v-model`。 |
| `change` | `(value)` | 已提交值变化后触发。 |
| `update:expand-values` | `(values)` | 更新展开值。 |
| `update:tree-data` | `(data)` | 返回动态加载或节点命令产生的数据。 |
| `visible-change` | `(visible)` | 浮层显隐变化后触发。 |
| `input` | `(value?)` | 返回触发器输入文字。 |
| `focus` / `blur` | `()` | 触发器焦点变化时触发。 |
| `clear` | `()` | 清空后触发。 |
| `select` | `(values, value, details)` | 节点选择交互后触发。 |
| `expand` | `(values, value, details)` | 分支展开交互后触发。 |
| `click` / `contextmenu` | `(event, value, node, vnode?)` | 节点点击或右键时触发。 |
| `confirm` / `cancel` | `()` | 接受或放弃暂存选择后触发。 |

## Slots

| 插槽 | 作用域 | 说明 |
| --- | --- | --- |
| `default` | `{ visible, treeDataMap }` | 渲染完整触发器内容。 |
| `tagRender` | 选中标签数据 | 渲染一个选中标签。 |
| `selectRender` | 选中展示数据 | 渲染完整选中值区域。 |
| `treeNodeRender` | `{ data, vnode }` | 渲染一行树节点。 |
| `panelHeaderRender` / `panelFooterRender` | — | 渲染面板头部与底部。 |
| `empty` | — | 渲染空状态。 |
| `confirmRender` | `{ cancelHandle, confirmHandle }` | 渲染暂存选择操作区。 |

## Exposes

组件引用提供 `confirmHandle()`、`cancelHandle()`、`changePanelVisible(visible)`、`getSelectedNodes()`、`getPartSelectedNodes()`、`getUnSelectedNodes()`、`setSelectedStatus(values, selected)`、`clearSelectedValues()`、`getExpandNodes()`、`setCollapseStatusByValue(values, isExpand)`、`setAllCollapseStatus(isExpand)`、`getNodeByValues(values)`、`setNodeByValue(treeData, value?)`、`addNodeChildrenByValue(treeDataArray, value?)`、`delNodeByValue(value?)`、`getVisibleItems()` 和 `scrollTo(value?)`。

## 无障碍

可聚焦触发器提供 combobox 语义并关联浮层树。树节点提供层级、展开、选择、勾选和禁用状态；方向键在可用节点间移动，`ArrowRight` 与 `ArrowLeft` 导航分支，`Enter` 或 `Space` 选择活动节点。自定义触发器和节点内容时，应保留组件提供的焦点与标注关系。
