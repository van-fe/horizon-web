SortableList renders drag-sortable data with stable keys. While dragging, a Tree-style highlighted bar previews the final insertion point. After drop, keyed FLIP transitions move the remaining items smoothly into place.

## Basic Usage

Use `v-model` for the reordered array and provide a stable, unique `item-key`. Dragging starts from the handle by default. When focused, the handle also supports Arrow, Home, and End keys. Use `item-disabled` to lock individual items.

:::demo components/SortableList/basic.vue :::

## Whole-row Dragging

Set `drag-on-handler="false"` to start dragging from any empty part of the row. The `handle` slot can still provide a custom visual affordance and keyboard entry point.

:::demo components/SortableList/whole-row.vue :::
