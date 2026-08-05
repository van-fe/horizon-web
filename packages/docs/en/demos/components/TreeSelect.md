## Basic usage

`TreeSelect` combines a picker with most tree behaviors. Pass `tree-data` and keep every `value` unique across the tree.

:::demo components/TreeSelect/basic.vue :::

## Clearable

Set `clearable = true` so users can remove the current selection.

:::demo components/TreeSelect/clearable.vue :::

## Single selection

In single mode, enable `show-radio` to make the selection control explicit.

:::demo components/TreeSelect/single.vue :::

## Multiple selection

Set `multiple = true` for multiple selection. Use `collapse-tags`, `collapse-tags-tooltip`, and `max-collapse-tags` to control tag display.

:::demo components/TreeSelect/multiple.vue :::

## Multiple-selection limit

Use `multiple-limit` to cap the number of selected nodes.

:::demo components/TreeSelect/multiple-limit.vue :::

## Parent-child association

`check-strictly` controls whether parent and child selections are linked. In strict mode, every node is independent.

:::demo components/TreeSelect/check-strictly.vue :::

## Expansion and selection

`expand-on-click-node` controls row expansion. In multiple mode, `check-on-click-node` controls row selection.

:::demo components/TreeSelect/expand-and-check.vue :::

## Leaf-node selection

`check-on-click-leaf` controls whether clicking a leaf row selects it. When disabled, use the selection control directly.

:::demo components/TreeSelect/check-on-leaf.vue :::

## Controlled expansion

Use `expand-values` or `v-model:expand-values` to control and observe expanded panel nodes.

:::demo components/TreeSelect/expand-values.vue :::

## Expand all by default

`is-default-expand-all` is read when the tree instance is created. For asynchronous data, create the component after the data is ready.

:::demo components/TreeSelect/default-expand-all.vue :::

## Disabled states

A node-level `disabled` flag affects one item; the component `disabled` prop disables the entire picker.

:::demo components/TreeSelect/disabled.vue :::

## Custom expansion icons

With only `fold-icon`, the icon rotates when expanded. Set both `fold-icon` and `expand-icon` for separate state icons.

:::demo components/TreeSelect/expand-icon.vue :::

## Selection statistics

In multiple mode, set `use-statistic = true` for a count summary and customize its label with `statistic-text`.

:::demo components/TreeSelect/statistic.vue :::

## Filtering

Set `filterable = true` for trigger search, and use `filter-method` for custom matching.

:::demo components/TreeSelect/filter.vue :::

## Search keyword retention

During multiple filtering, `reserve-keyword` supports always keeping, always clearing, keeping only on deselection, or maintaining a special persistent filter.

:::demo components/TreeSelect/reserve-keyword.vue :::

## Panel filtering

After enabling `panel-filterable`, use the `use-build-in-panel-filter` input or provide `panelHeaderRender` and `panel-filter-input-value` for a custom panel header.

:::demo components/TreeSelect/filter-in-panel.vue :::

## Custom highlighting

Use `highlight-method` to customize filtered-result highlighting. Returning a VNode avoids constructing HTML strings.

:::demo components/TreeSelect/highlight-filter.vue :::

## Dynamic loading

Set `isLeaf = false` on nodes that load on demand, then return their children from `dynamic-load`.

:::demo components/TreeSelect/dynamic-load.vue :::

## Custom nodes

Use the `treeNodeRender` slot for every tree node, or a `label` render function to override an individual item.

:::demo components/TreeSelect/custom-render.vue :::

## Field mapping

`field-map` maps external fields to `value`, `label`, and `children`. Do not reuse one source field for multiple built-in meanings.

:::demo components/TreeSelect/field-map.vue :::

## Virtual scrolling

For large data sets, set `use-virtual-scroll = true` and provide `height` or `max-height` for the panel viewport.

:::demo components/TreeSelect/virtual-scroll.vue :::

## Non-selectable nodes

`selectable = false` prevents direct selection but still allows expansion and selectable descendants. `disabled` also blocks interaction with that node.

:::demo components/TreeSelect/selectable.vue :::

## Prefix icons

Use `prefix-icon` to add a shared node icon that clarifies the option type.

:::demo components/TreeSelect/prefix-icon.vue :::

## Emphasized selection

Set `stress = true` to highlight the current tree selection with the brand color.

:::demo components/TreeSelect/stress.vue :::
