## 基本用法

按 `HTreeData` 结构传入 `tree-data` 即可生成树。整棵树中的 `value` 必须唯一。

:::demo components/Tree/basic.vue :::

## 强调选中项

设置 `stress = true`，用品牌色突出当前选中项。

:::demo components/Tree/stress.vue :::

## 单选框与复选框

使用 `show-radio` 和 `show-checkbox` 明确展示单选或多选控件。

:::demo components/Tree/checkbox-and-radio.vue :::

## 前缀图标

通过 `prefix-icon` 为每个节点添加统一的语义图标。

:::demo components/Tree/prefix-icon.vue :::

## 父子关联

`check-strictly` 控制父子节点是否联动。严格模式下，每个节点都能独立选择。

:::demo components/Tree/check-strictly.vue :::

## 展开与选择

`expand-on-click-node` 控制点击整行是否展开；多选时，`check-on-click-node` 控制点击整行是否勾选。

:::demo components/Tree/expand-and-check.vue :::

## 叶子节点选择

`check-on-click-leaf` 控制点击叶子节点整行时是否选择。关闭后需要直接操作复选框或单选框。

:::demo components/Tree/check-on-leaf.vue :::

## 受控展开

使用 `expand-values` 或 `v-model:expand-values` 控制并读取展开的节点。

:::demo components/Tree/expand-values.vue :::

## 默认全部展开

`is-default-expand-all` 只在树实例初始化时生效。异步数据应在数据就绪后再创建树。

:::demo components/Tree/default-expand-all.vue :::

## 受控选择

通过 `selected-values` 或 `v-model:selected-values` 控制并读取选中项。

:::demo components/Tree/selected-values.vue :::

## 禁用

节点的 `disabled` 只禁用该项；组件的 `disabled` 会禁用整棵树。`parent-effect-disabled-child` 决定父节点是否能影响禁用子节点。

:::demo components/Tree/disabled.vue :::

## 自定义展开图标

仅设置 `fold-icon` 时，图标会旋转表示展开；同时设置 `fold-icon` 和 `expand-icon` 可使用两套图标。

:::demo components/Tree/expand-icon.vue :::

## 过滤

设置 `filterable = true` 开启过滤，并可通过 `filter-method` 定义匹配规则。

:::demo components/Tree/filter.vue :::

## 自定义高亮

使用 `highlight-method` 自定义过滤结果的高亮渲染。建议返回 VNode，避免拼接 HTML。

:::demo components/Tree/highlight-filter.vue :::

## 动态加载

需要按需加载的节点应设置 `isLeaf = false`，并通过 `dynamic-load` 返回其子节点。

:::demo components/Tree/dynamic-load.vue :::

## 多选限制

`multiple-limit` 可以限制多选模式下的最大选择数量。

:::demo components/Tree/multiple-limit.vue :::

## 自定义节点

使用 `treeNodeRender` 插槽自定义所有节点；数据项的 `label` 渲染函数可覆盖单个节点。

:::demo components/Tree/custom-render.vue :::

## 字段映射

`field-map` 可将外部数据的字段映射到 `value`、`label` 和 `children`。不要用同一字段覆盖多个内置含义。

:::demo components/Tree/field-map.vue :::

## 实例方法

通过组件引用可以展开、选择、滚动及增删节点。调用前应确认引用已经挂载。

:::demo components/Tree/controls.vue :::

## 虚拟滚动

大数据量时设置 `use-virtual-scroll = true`，并提供 `height` 或 `max-height` 以限制可视区域。

:::demo components/Tree/virtual-scroll.vue :::

## 拖拽排序

设置 `draggable = true` 开启排序。拖动时节点本体跟随指针，落点继续使用高亮横条提示；重排后，受影响节点会通过与 SortableList 相同的 FLIP 动画平滑归位。`drag-on-handler`、`drag-to-leaf` 和 `before-drop` 可限制拖拽方式与结果。

:::demo components/Tree/draggable.vue :::

## 兼容 selected-values

在父子关联的多选模式中，同时传入父节点和直接子节点时，组件会优先保留更具体的子节点状态；只传父节点时会选择其后代。

:::demo components/Tree/optimize-selected-values.vue :::

## 不可选择

`selectable = false` 会阻止当前节点被直接选择，但仍允许展开和操作可选后代；`disabled` 则同时阻止该节点交互。

:::demo components/Tree/selectable.vue :::
