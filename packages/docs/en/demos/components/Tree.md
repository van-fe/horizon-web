## Basic usage

Pass `tree-data` using the `HTreeData` structure. Every `value` must be unique across the tree.

:::demo components/Tree/basic.vue :::

## Emphasized selection

Set `stress = true` to highlight the current selection with the brand color.

:::demo components/Tree/stress.vue :::

## Radio and checkbox controls

Use `show-radio` and `show-checkbox` to make single- or multiple-selection controls explicit.

:::demo components/Tree/checkbox-and-radio.vue :::

## Prefix icons

Use `prefix-icon` to add a shared semantic icon to every node.

:::demo components/Tree/prefix-icon.vue :::

## Parent-child association

`check-strictly` controls whether parent and child selections are linked. In strict mode, every node is independent.

:::demo components/Tree/check-strictly.vue :::

## Expansion and selection

`expand-on-click-node` controls row expansion. In multiple mode, `check-on-click-node` controls row selection.

:::demo components/Tree/expand-and-check.vue :::

## Leaf-node selection

`check-on-click-leaf` controls whether clicking a leaf row selects it. When disabled, use the checkbox or radio directly.

:::demo components/Tree/check-on-leaf.vue :::

## Controlled expansion

Use `expand-values` or `v-model:expand-values` to control and observe expanded nodes.

:::demo components/Tree/expand-values.vue :::

## Expand all by default

`is-default-expand-all` is read only when the tree instance is created. For asynchronous data, render the tree after the data is ready.

:::demo components/Tree/default-expand-all.vue :::

## Controlled selection

Use `selected-values` or `v-model:selected-values` to control and observe selected nodes.

:::demo components/Tree/selected-values.vue :::

## Disabled states

A node-level `disabled` flag affects one item; the component `disabled` prop affects the entire tree. `parent-effect-disabled-child` controls whether parents can change disabled children.

:::demo components/Tree/disabled.vue :::

## Custom expansion icons

With only `fold-icon`, the icon rotates when expanded. Set both `fold-icon` and `expand-icon` to use separate state icons.

:::demo components/Tree/expand-icon.vue :::

## Filtering

Set `filterable = true` to enable filtering, and use `filter-method` for custom matching.

:::demo components/Tree/filter.vue :::

## Custom highlighting

Use `highlight-method` to customize filtered-result highlighting. Returning a VNode avoids constructing HTML strings.

:::demo components/Tree/highlight-filter.vue :::

## Dynamic loading

Set `isLeaf = false` on nodes that load children on demand, then return those children from `dynamic-load`.

:::demo components/Tree/dynamic-load.vue :::

## Multiple-selection limit

Use `multiple-limit` to cap the number of selections in multiple mode.

:::demo components/Tree/multiple-limit.vue :::

## Custom nodes

Use the `treeNodeRender` slot for every node, or a `label` render function to override an individual item.

:::demo components/Tree/custom-render.vue :::

## Field mapping

`field-map` maps external fields to `value`, `label`, and `children`. Do not reuse one source field for multiple built-in meanings.

:::demo components/Tree/field-map.vue :::

## Instance methods

A component ref exposes methods for expansion, selection, scrolling, and node updates. Call them after the ref is mounted.

:::demo components/Tree/controls.vue :::

## Virtual scrolling

For large data sets, set `use-virtual-scroll = true` and provide `height` or `max-height` for the viewport.

:::demo components/Tree/virtual-scroll.vue :::

## Drag sorting

Set `draggable = true` to reorder nodes. The dragged node follows the pointer, the highlighted bar previews the drop target, and affected nodes settle with the same FLIP motion as SortableList. Use `drag-on-handler`, `drag-to-leaf`, and `before-drop` to constrain the interaction.

:::demo components/Tree/draggable.vue :::

## selected-values compatibility

In linked multiple selection, direct child values take precedence when parent and child values are provided together. A parent by itself selects its descendants.

:::demo components/Tree/optimize-selected-values.vue :::

## Non-selectable nodes

`selectable = false` prevents direct selection but still allows expansion and selectable descendants. `disabled` also blocks interaction with that node.

:::demo components/Tree/selectable.vue :::
