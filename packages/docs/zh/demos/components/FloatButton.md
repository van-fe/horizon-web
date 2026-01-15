## 基本用法
:::demo components/FloatButton/basic.vue :::

## 类型
使用 `type` 切换按钮类型，可以是 `normal` 和 `primary`
:::demo components/FloatButton/type.vue :::

## 形状
使用 `shape` 切换按钮形状，可以是 `circle` 和 `square`
:::demo components/FloatButton/shape.vue :::

## 徽标
设置 `badge` 即可开启徽标
:::demo components/FloatButton/badge.vue :::

## 可拖拽
设置 `draggable` ，可以手动拖拽位置，并自动吸附边框，但一旦拖拽，则不会再将其自动排列，而且可能会与已展示的悬浮按钮重叠，所以使用时请始终只展示一个

如果希望将拖拽过的悬浮按钮重新排列，需要切换一下 `visible` 的状态即可

:::demo components/FloatButton/draggable.vue :::

## 按钮组
使用 `n-float-button-group` 可以开启按钮组

:::demo components/FloatButton/group.vue :::
