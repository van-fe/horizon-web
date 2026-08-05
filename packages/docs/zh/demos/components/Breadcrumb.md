Breadcrumb 展示当前页面在信息层级中的位置，适合两级以上且允许回溯的导航场景。

## 基础用法

通过 `texts` 快速生成路径，`title` 会强调最后一项。

:::demo components/Breadcrumb/basic.vue :::

## 尺寸

`medium` 适合页面级导航，`small` 适合卡片和紧凑面板。

:::demo components/Breadcrumb/size.vue :::

## 路由跳转

为条目设置 `to` 使用 Vue Router 跳转；`replace` 可避免新增历史记录。

:::demo components/Breadcrumb/link-mode.vue :::

## 宽度与折叠

`full` 允许换行，`ellipsis` 会将溢出项收进下拉菜单。手写 `h-breadcrumb-item` 时，每一项都必须提供稳定且唯一的 `key`。

:::demo components/Breadcrumb/collapse.vue :::

## 长文本与当前位置

组件会处理长条目省略；设置 `title` 可强化当前页面。

:::demo components/Breadcrumb/special-style.vue :::

## 自定义分隔符

`separator` 支持文字或组件，也可使用 `separator` 插槽。

:::demo components/Breadcrumb/custom-divider.vue :::

## 自定义条目

使用 `h-breadcrumb-item` 可在路径中组合下拉选择等紧凑交互。

:::demo components/Breadcrumb/custom-item.vue :::

## 组合内容与逐项分隔符

条目默认插槽与条目级 `separator` 插槽可以组合状态图标和不同分隔方式。

:::demo components/Breadcrumb/custom.vue :::
