## 基本用法

按 `HTreeData` 结构传入 `tree-data` 即可生成树。整棵树中的 `value` 必须唯一。

:::demo vue/components/Tree/basic.vue :::

## 强调选中项

设置 `stress = true`，用品牌色突出当前选中项。

:::demo vue/components/Tree/stress.vue :::

## 单选框与复选框

使用 `show-radio` 和 `show-checkbox` 明确展示单选或多选控件。

:::demo vue/components/Tree/checkbox-and-radio.vue :::

## 前缀图标

通过 `prefix-icon` 为每个节点添加统一的语义图标。

:::demo vue/components/Tree/prefix-icon.vue :::

## 父子关联

`check-strictly` 控制父子节点是否联动。严格模式下，每个节点都能独立选择。

:::demo vue/components/Tree/check-strictly.vue :::

## 展开与选择

`expand-on-click-node` 控制点击整行是否展开；多选时，`check-on-click-node` 控制点击整行是否勾选。

:::demo vue/components/Tree/expand-and-check.vue :::

## 叶子节点选择

`check-on-click-leaf` 控制点击叶子节点整行时是否选择。关闭后需要直接操作复选框或单选框。

:::demo vue/components/Tree/check-on-leaf.vue :::

## 受控展开

使用 `expand-values` 或 `v-model:expand-values` 控制并读取展开的节点。

:::demo vue/components/Tree/expand-values.vue :::

## 默认全部展开

`is-default-expand-all` 只在树实例初始化时生效。异步数据应在数据就绪后再创建树。

:::demo vue/components/Tree/default-expand-all.vue :::

## 受控选择

通过 `selected-values` 或 `v-model:selected-values` 控制并读取选中项。

:::demo vue/components/Tree/selected-values.vue :::

## 禁用

节点的 `disabled` 只禁用该项；组件的 `disabled` 会禁用整棵树。`parent-effect-disabled-child` 决定父节点是否能影响禁用子节点。

:::demo vue/components/Tree/disabled.vue :::

## 自定义展开图标

仅设置 `fold-icon` 时，图标会旋转表示展开；同时设置 `fold-icon` 和 `expand-icon` 可使用两套图标。

:::demo vue/components/Tree/expand-icon.vue :::

## 过滤

设置 `filterable = true` 开启过滤，并可通过 `filter-method` 定义匹配规则。

:::demo vue/components/Tree/filter.vue :::

## 自定义高亮

使用 `highlight-method` 自定义过滤结果的高亮渲染。建议返回 VNode，避免拼接 HTML。

:::demo vue/components/Tree/highlight-filter.vue :::

## 动态加载

需要按需加载的节点应设置 `isLeaf = false`，并通过 `dynamic-load` 返回其子节点。

:::demo vue/components/Tree/dynamic-load.vue :::

## 多选限制

`multiple-limit` 可以限制多选模式下的最大选择数量。

:::demo vue/components/Tree/multiple-limit.vue :::

## 自定义节点

使用 `treeNodeRender` 插槽自定义所有节点；数据项的 `label` 渲染函数可覆盖单个节点。

:::demo vue/components/Tree/custom-render.vue :::

## 字段映射

`field-map` 可将外部数据的字段映射到 `value`、`label` 和 `children`。不要用同一字段覆盖多个内置含义。

:::demo vue/components/Tree/field-map.vue :::

## 实例方法

通过组件引用可以展开、选择、滚动及增删节点。调用前应确认引用已经挂载。

:::demo vue/components/Tree/controls.vue :::

## 虚拟滚动

大数据量时设置 `use-virtual-scroll = true`，并提供 `height` 或 `max-height` 以限制可视区域。

:::demo vue/components/Tree/virtual-scroll.vue :::

## 拖拽排序

设置 `draggable = true` 开启排序。拖动时节点本体跟随指针，落点继续使用高亮横条提示；重排后，受影响节点会通过与 SortableList 相同的 FLIP 动画平滑归位。`drag-on-handler`、`drag-to-leaf` 和 `before-drop` 可限制拖拽方式与结果。

:::demo vue/components/Tree/draggable.vue :::

## 兼容 selected-values

在父子关联的多选模式中，同时传入父节点和直接子节点时，组件会优先保留更具体的子节点状态；只传父节点时会选择其后代。

:::demo vue/components/Tree/optimize-selected-values.vue :::

## 不可选择

`selectable = false` 会阻止当前节点被直接选择，但仍允许展开和操作可选后代；`disabled` 则同时阻止该节点交互。

:::demo vue/components/Tree/selectable.vue :::

## Props

### 数据、筛选与布局

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `tree-data` | `HTreeData[]` | `[]` | 层级数据，整棵树中的 `value` 必须唯一。 |
| `field-map` | `HTreeFieldMap` | — | 将数据源字段映射到 Tree 数据字段。 |
| `tree-helper` | `Tree<HTreeData, HTreeExtendsData>` | — | 与 TreeSelect 组合时可传入的内部树助手。 |
| `size` | `'small' \| 'medium' \| 'large' \| 'huge'` | Provider 值 | 节点行尺寸。 |
| `disabled` | `boolean` | `false` | 禁用整棵树。 |
| `height` / `max-height` | `number \| string` | — | 滚动容器尺寸。 |
| `indent` | `number` | `24` | 每层缩进的像素值。 |
| `root-class-name` / `root-style` | `string` / `CSSProperties` | — | 根元素类名和行内样式。 |
| `tooltip` | `boolean` | `true` | 显示节点文字提示。 |
| `tooltip-show-after` / `tooltip-hide-after` | `number` | `100` / `200` | 提示显示与隐藏延迟。 |
| `use-virtual-scroll` | `boolean` | `false` | 开启虚拟滚动，需要配合 `height` 或 `max-height`。 |
| `virtual-scroll-buffer` | `number` | — | 虚拟滚动缓冲区大小。 |
| `expand-wrapper-by-children` | `boolean` | `false` | 允许子内容撑开虚拟滚动容器。 |

### 筛选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `filterable` | `boolean` | `false` | 开启筛选。 |
| `filter-value` | `string` | — | 筛选文字，支持 `v-model:filter-value`。 |
| `filter-input-value` | `string` | — | 自定义筛选输入框使用的外部文字。 |
| `filter-input-props` | `Partial<InputProps>` | — | 传给内置筛选输入框的属性。 |
| `filter-method` | `HTreeFilterMethodType` | — | 自定义筛选断言。 |
| `filter-to-hide-children` | `boolean` | `true` | 筛选时隐藏不匹配的子节点。 |
| `expand-filtered-tree` | `boolean` | `true` | 展开包含筛选结果的分支。 |
| `hide-filter-input` | `boolean` | `false` | 隐藏内置筛选输入框。 |
| `highlight-method` | `HTreeHighlightMethod` | — | 渲染字符串标签中的高亮匹配项。 |
| `search-input-placeholder` | `string` | 国际化值 | 筛选输入框占位文字。 |
| `empty-text` | `string` | 国际化值 | 空结果文字。 |

### 展开与选择

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `expand-values` | `(string \| number)[]` | — | 展开节点值，支持 `v-model:expand-values`。 |
| `is-default-expand-all` | `boolean` | `false` | 创建时展开全部分支。 |
| `is-default-expand-parent` | `boolean` | `true` | 解析展开值时自动展开父级。 |
| `expand-on-click-node` | `boolean` | `true` | 点击分支整行时切换展开。 |
| `fold-icon` / `expand-icon` | `Icon` | 三角图标 / — | 折叠与展开分支图标。 |
| `prefix-icon` | `Icon` | — | 所有节点共用的前缀图标。 |
| `selected-values` | `(string \| number)[]` | — | 选中节点值，支持 `v-model:selected-values`。 |
| `multiple` | `boolean` | `false` | 开启多选。 |
| `multiple-limit` | `number` | `Infinity` | 最大选中数量。 |
| `check-strictly` | `boolean` | `false` | 让父子节点独立选择。 |
| `check-on-click-node` | `boolean` | `false` | 点击节点整行时选择。 |
| `check-on-click-leaf` | `boolean` | `true` | 点击叶子节点整行时选择。 |
| `show-checkbox` / `show-radio` | `boolean` | `true` / `false` | 显示复选框或单选框。 |
| `parent-effect-disabled-child` | `boolean` | `false` | 允许父节点选择影响禁用后代。 |
| `stress` | `boolean` | `false` | 强调已选择的节点行。 |

### 动态加载与拖拽

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `dynamic-load` | `HTreeDynamicLoadMethod` | — | 加载 `isLeaf: false` 的未展开分支。 |
| `draggable` | `boolean` | `false` | 开启拖拽排序。 |
| `drag-on-handler` | `boolean` | `true` | 只允许从拖拽手柄开始拖动。 |
| `drag-to-leaf` | `boolean` | `true` | 允许将节点拖入叶子分支。 |
| `before-drop` | `(current, target, prev) => boolean \| Promise<boolean>` | — | 提交放置前的同步或异步拦截方法。 |
| `draggable-icon` / `undraggable-icon` | `Icon \| false` | 拖拽图标 / `false` | 可拖动或固定节点的图标。 |
| `draggable-icon-always-visible` | `boolean` | `false` | 始终显示拖拽图标。 |
| `show-line` | `boolean` | `false` | 显示节点连线。 |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:tree-data` | `(treeData)` | 动态加载或节点命令后返回树数据。 |
| `update:expand-values` | `(values)` | 为 `v-model:expand-values` 返回展开值。 |
| `update:selected-values` | `(values)` | 为 `v-model:selected-values` 返回选中值。 |
| `update:filter-value` | `(value)` | 返回筛选文字。 |
| `update:visible-nodes` | `(nodes)` | 返回当前可见顺序中的节点。 |
| `expand` | `(expandValues, value, details)` | 分支展开或收起后触发。 |
| `select` | `(selectedValues, value, details)` | 选择状态变化后触发。 |
| `click` / `contextmenu` | `(event, value, node, vnode?)` | 节点点击或右键时触发。 |
| `reach-top` / `reach-bottom` | `()` | 滚动触及边界时触发。 |

## Slots

| 插槽 | 作用域 | 说明 |
| --- | --- | --- |
| `treeNodeRender` | `{ data, vNode?, vnode? }` | 渲染单个树节点。 |
| `empty` | — | 渲染空结果。 |

## Exposes

组件引用提供 `getSelectedNodes()`、`getPartSelectedNodes()`、`getUnSelectedNodes()`、`setSelectedStatus(values, selected)`、`clearSelectedValues()`、`getExpandNodes()`、`setCollapseStatusByValue(values, isExpand)`、`setAllCollapseStatus(isExpand)`、`getNodeByValues(values)`、`setNodeByValue(treeData, value?)`、`addNodeChildrenByValue(treeDataArray, value?)`、`delNodeByValue(value?)`、`getVisibleItems()`、`scrollTo(value?)`、`treeTemplateRef` 和 `keyboardEventDeal(event)`。

## 无障碍

Tree 使用 `tree` 与 `treeitem` 语义，并提供层级、展开、选择、勾选和禁用状态。`ArrowUp`、`ArrowDown`、`Home`、`End` 在可用节点间移动焦点；`ArrowRight` 展开或进入分支，`ArrowLeft` 折叠或回到父级。`Enter` 与 `Space` 选择当前活动节点。内置筛选输入框保留正常的文本编辑键盘行为。
