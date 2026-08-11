## Basic Usage
:::demo vue/components/FloatButton/basic.vue :::

## Type
:::demo vue/components/FloatButton/type.vue :::

## Shape
Use `shape` to switch button shape, which can be `circle` and `square`
:::demo vue/components/FloatButton/shape.vue :::

## Badge
Set `badge` to enable badge
:::demo vue/components/FloatButton/badge.vue :::

## Draggable
Set `draggable` to manually drag the position and automatically snap to the border, but once dragged, it will no longer be automatically arranged, and may overlap with already displayed floating buttons, so please always display only one when using

If you want to rearrange the dragged floating button, you need to toggle the `visible` state

:::demo vue/components/FloatButton/draggable.vue :::

## Button Group
Use `h-float-button-group` to enable button group

:::demo vue/components/FloatButton/group.vue :::

## Visibility and commands

Use `visible` or `v-model:visible` to own a floating button's visibility. Its template ref exposes `show()`, `hide()`, and `focus()`; controlled visibility changes only after the bound value is updated.

FloatButtonGroup accepts `expanded`, `default-expanded`, and `v-model:expanded`. Its template ref exposes `show()`, `hide()`, `expand()`, `fold()`, and `toggle()`. The `update:expanded` payload also includes the interaction reason.
