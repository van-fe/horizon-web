
## Fixed and Data-driven Sizes

Prefer RecycleScroller when item size is known. Use `item-size` for fixed rows or `size-field` to read varying sizes from the data.

:::demo components/VirtualScroller/RecycleScrollerDemo.vue :::

## Grid

`grid-items` sets the number of items per row and `item-size` sets the primary-axis size of each cell.

:::demo components/VirtualScroller/GridDemo.vue :::

## Dynamic Sizes

VirtualScroller can measure content through VirtualScrollerItem. List changing content in `size-dependencies` so it is measured again.

:::demo components/VirtualScroller/VirtualScrollerDemo.vue :::

## Horizontal Scrolling

Set `direction="horizontal"` to virtualize horizontal items with different widths.

:::demo components/VirtualScroller/HorizontalDemo.vue :::
