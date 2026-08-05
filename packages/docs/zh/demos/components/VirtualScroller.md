虚拟滚动只挂载可视区域附近的条目，适合大规模列表和网格。

## 固定与数据驱动尺寸

能确定条目尺寸时优先使用 RecycleScroller。固定尺寸使用 `item-size`，不同尺寸可通过 `size-field` 从数据读取。

:::demo components/VirtualScroller/RecycleScrollerDemo.vue :::

## 网格

`grid-items` 设置每行数量，`item-size` 设置网格项的主轴尺寸。

:::demo components/VirtualScroller/GridDemo.vue :::

## 动态尺寸

VirtualScroller 可配合 VirtualScrollerItem 测量内容，并通过 `size-dependencies` 在内容变化后重新计算。

:::demo components/VirtualScroller/VirtualScrollerDemo.vue :::

## 横向滚动

设置 `direction="horizontal"` 后，可虚拟化宽度不同的横向条目。

:::demo components/VirtualScroller/HorizontalDemo.vue :::
