## CSS Grid 布局

新布局使用 `h-grid` 和 `h-grid-item`。容器负责定义响应式轨道与间距，子项通过 `span` 和 `offset` 描述占位关系；底层直接使用浏览器原生 CSS Grid，无需负边距或额外的列内边距补偿。

:::demo components/Layout/grid.vue :::

## 基础分栏

默认使用 24 列栅格。`span` 表示子项占据的轨道数，可以自由组合等分和非对称布局。

:::demo components/Layout/demo1.vue :::

## 行列间距

使用 `gap` 同时设置行列间距，也可以通过 `column-gap` 和 `row-gap` 分别控制。三个属性都支持响应式对象。

:::demo components/Layout/demo2.vue :::

## 单元格对齐

`align` 和 `justify` 分别控制网格项在单元格内的垂直与水平对齐，可选值为 `start`、`center`、`end` 和 `stretch`。

:::demo components/Layout/demo3.vue :::

## 响应式布局

`cols`、`gap`、`column-gap`、`row-gap`、`span` 和 `offset` 均支持 `xs`、`sm`、`md`、`lg`、`xl`、`xxl` 响应式对象。未重复声明的值会从较小断点自然延续。

:::demo components/Layout/responsive.vue :::
