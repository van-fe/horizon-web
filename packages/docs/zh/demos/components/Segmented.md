## 基本用法

每个 `SegmentedItem` 都应通过唯一的 `value` 明确声明选项值，并通过 `active-key` 或 `v-model:active-key` 读取当前选项。适合在少量互斥视图之间快速切换。

:::demo components/Segmented/basic.vue :::

## Block 模式

设置 `block` 后，选项会分配父容器的可用宽度，适合步骤固定的工具栏。

:::demo components/Segmented/block.vue :::

## 禁用选项

为单个 `SegmentedItem` 设置 `disabled`。示例也展示了用外部状态统一锁定全部选项。

:::demo components/Segmented/disabled.vue :::

## 横向滚动

选项较多时可组合 `scrollable`、`arrow` 与 `focusable`。Segmented 仍应保持选项精简，复杂导航更适合 Tabs。

:::demo components/Segmented/scroll.vue :::

## 受控模式

外部控件与 Segmented 可以共享同一个 `active-key`，状态变化会在两处同步呈现。

:::demo components/Segmented/controlled.vue :::

## 尺寸

支持 `small`、`medium`、`large` 与 `huge` 四种尺寸。

:::demo components/Segmented/size.vue :::

## 动态加载

响应式更新 `SegmentedItem` 列表即可追加选项。异步操作应阻止重复触发，并在组件卸载时清理计时器。

:::demo components/Segmented/load-more.vue :::

## 自定义内容

通过 Item 默认插槽组合图标、主标题和辅助信息，插槽参数 `state` 可用于表达激活状态。

:::demo components/Segmented/customize.vue :::

## 图标与角标

`icon` 可与文字或角标组合。只显示图标时应确保周边场景仍能解释其含义。

:::demo components/Segmented/icon.vue :::

## 表单模式

在 `HForm` 中启用 `form`，即可让 Segmented 参与表单校验与错误状态展示。

:::demo components/Segmented/form.vue :::
