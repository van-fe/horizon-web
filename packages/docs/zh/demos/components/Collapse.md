## 何时使用

折叠面板适合将补充信息分组并按需展开，从而保持页面主路径清晰。如果用户通常需要连续阅读全部内容，应优先使用普通标题和完整页面。

## 基础用法

默认模式允许同时展开多个面板。使用 `v-model:active-key` 管理已展开项，`filled` 可加强区块分组。

:::demo components/Collapse/basic.vue :::

## 尺寸与图标位置

`size` 调整面板密度，`expand-icon-position` 控制展开图标位于标题左侧或右侧。

:::demo components/Collapse/size.vue :::

## 手风琴

设置 `accordion` 后，同一时间只展开一个面板。此时 `active-key` 应为单个字符串或数字，而不是数组。

:::demo components/Collapse/accordion.vue :::

## 面板嵌套

嵌套适合表达明确的父子层级。外层和内层应分别维护 `active-key`，避免状态相互干扰。

:::demo components/Collapse/nest.vue :::

## 自定义标题

通过 `title` 插槽组合图标、状态和操作。标题内按钮应使用事件修饰符阻止冒泡，避免操作按钮同时切换面板。

:::demo components/Collapse/other.vue :::
