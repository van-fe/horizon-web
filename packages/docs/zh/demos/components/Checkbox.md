## 基础用法

使用 `v-model` 管理单个复选框。示例同时展示选中数量和最近一次变更，让绑定结果直接可见。

:::demo components/Checkbox/basic.vue :::

## 边框样式

设置 `border` 可扩大可点击区域；`size` 用于调整边框模式的高度，适合表单与触屏设置页。

:::demo components/Checkbox/border.vue :::

## 按钮样式

在 `h-checkbox-group` 中使用 `h-checkbox-button`，可以构建紧凑的多选筛选器，并由组级 `v-model` 统一维护选中值。

:::demo components/Checkbox/button.vue :::

## 半选模式

`indeterminate` 只控制视觉状态，常与全选逻辑配合。业务仍需根据子项数量同步全选值。

:::demo components/Checkbox/indeterminate.vue :::

## 多选框组

`h-checkbox-group` 统一管理相关选项，也可以在组级设置 `disabled`，用于展示不可编辑的继承权限。

:::demo components/Checkbox/group.vue :::

## 禁用状态

禁用状态可与未选、半选、已选及 `border` 组合。禁用项保留当前含义，但不会响应操作。

:::demo components/Checkbox/disabled.vue :::

## 一键反选

通过每个 Checkbox 暴露的 `toggle()` 方法，可以实现批量反选。示例展示了组件引用与异步批量调用。

:::demo components/Checkbox/inverse.vue :::
