## 基本用法

`TreeSelect` 结合了选择器与树的大部分能力。传入 `tree-data`，并确保整棵树中的 `value` 唯一。

:::demo components/TreeSelect/basic.vue :::

## 可清空

设置 `clearable = true`，让用户移除已有选择。

:::demo components/TreeSelect/clearable.vue :::

## 单选

单选模式可开启 `show-radio`，让选择方式更明确。

:::demo components/TreeSelect/single.vue :::

## 多选

设置 `multiple = true` 开启多选；`collapse-tags`、`collapse-tags-tooltip` 和 `max-collapse-tags` 用于控制标签展示。

:::demo components/TreeSelect/multiple.vue :::

## 多选限制

`multiple-limit` 可以限制最多选择多少个节点。

:::demo components/TreeSelect/multiple-limit.vue :::

## 父子关联

`check-strictly` 控制父子节点是否联动。严格模式下，每个节点可独立选择。

:::demo components/TreeSelect/check-strictly.vue :::

## 展开与选择

`expand-on-click-node` 控制整行展开；多选时，`check-on-click-node` 控制整行勾选。

:::demo components/TreeSelect/expand-and-check.vue :::

## 叶子节点选择

`check-on-click-leaf` 控制点击叶子节点整行是否选择。关闭后需要直接操作选择控件。

:::demo components/TreeSelect/check-on-leaf.vue :::

## 受控展开

使用 `expand-values` 或 `v-model:expand-values` 控制并读取面板中的展开节点。

:::demo components/TreeSelect/expand-values.vue :::

## 默认全部展开

`is-default-expand-all` 仅在树实例创建时生效；异步数据应在准备完成后再创建组件。

:::demo components/TreeSelect/default-expand-all.vue :::

## 禁用

节点的 `disabled` 只禁用该项，组件的 `disabled` 会禁用整个选择器。

:::demo components/TreeSelect/disabled.vue :::

## 自定义展开图标

只设置 `fold-icon` 时图标会旋转；同时设置 `fold-icon` 与 `expand-icon` 可使用两套状态图标。

:::demo components/TreeSelect/expand-icon.vue :::

## 选项统计

多选时设置 `use-statistic = true` 显示数量摘要，`statistic-text` 可自定义统计文字。

:::demo components/TreeSelect/statistic.vue :::

## 过滤

设置 `filterable = true` 开启触发器内搜索，并可通过 `filter-method` 自定义匹配。

:::demo components/TreeSelect/filter.vue :::

## 保留搜索关键字

多选过滤时，`reserve-keyword` 支持始终保留、始终清空、仅反选保留和特殊持续过滤四种行为。

:::demo components/TreeSelect/reserve-keyword.vue :::

## 面板过滤

开启 `panel-filterable` 后，可使用 `use-build-in-panel-filter` 的内置输入框，或通过 `panelHeaderRender` 自定义面板头并传入 `panel-filter-input-value`。

:::demo components/TreeSelect/filter-in-panel.vue :::

## 自定义高亮

通过 `highlight-method` 自定义过滤结果的高亮渲染。建议返回 VNode，避免拼接 HTML。

:::demo components/TreeSelect/highlight-filter.vue :::

## 动态加载

按需加载的节点需要设置 `isLeaf = false`，并由 `dynamic-load` 返回子节点。

:::demo components/TreeSelect/dynamic-load.vue :::

## 自定义节点

使用 `treeNodeRender` 插槽自定义所有树节点；数据项的 `label` 渲染函数可覆盖单个节点。

:::demo components/TreeSelect/custom-render.vue :::

## 字段映射

`field-map` 可把外部字段映射到 `value`、`label` 与 `children`。不要用同一字段覆盖多个内置含义。

:::demo components/TreeSelect/field-map.vue :::

## 虚拟滚动

大数据量时设置 `use-virtual-scroll = true`，并提供 `height` 或 `max-height` 限制面板高度。

:::demo components/TreeSelect/virtual-scroll.vue :::

## 不可选择

`selectable = false` 会阻止当前节点被直接选择，但仍允许展开并选择其可选后代；`disabled` 同时阻止节点交互。

:::demo components/TreeSelect/selectable.vue :::

## 前缀图标

通过 `prefix-icon` 为树节点添加统一图标，帮助用户识别选项类型。

:::demo components/TreeSelect/prefix-icon.vue :::

## 强调选中项

设置 `stress = true`，在下拉树中用品牌色突出当前选中项。

:::demo components/TreeSelect/stress.vue :::
