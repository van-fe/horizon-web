## Basic usage

Pass `tree-data` using the `HTreeData` structure. Every `value` must be unique across the tree.

:::demo vue/components/Tree/basic.vue :::

## Emphasized selection

Set `stress = true` to highlight the current selection with the brand color.

:::demo vue/components/Tree/stress.vue :::

## Radio and checkbox controls

Use `show-radio` and `show-checkbox` to make single- or multiple-selection controls explicit.

:::demo vue/components/Tree/checkbox-and-radio.vue :::

## Prefix icons

Use `prefix-icon` to add a shared semantic icon to every node.

:::demo vue/components/Tree/prefix-icon.vue :::

## Parent-child association

`check-strictly` controls whether parent and child selections are linked. In strict mode, every node is independent.

:::demo vue/components/Tree/check-strictly.vue :::

## Expansion and selection

`expand-on-click-node` controls row expansion. In multiple mode, `check-on-click-node` controls row selection.

:::demo vue/components/Tree/expand-and-check.vue :::

## Leaf-node selection

`check-on-click-leaf` controls whether clicking a leaf row selects it. When disabled, use the checkbox or radio directly.

:::demo vue/components/Tree/check-on-leaf.vue :::

## Controlled expansion

Use `expand-values` or `v-model:expand-values` to control and observe expanded nodes.

:::demo vue/components/Tree/expand-values.vue :::

## Expand all by default

`is-default-expand-all` is read only when the tree instance is created. For asynchronous data, render the tree after the data is ready.

:::demo vue/components/Tree/default-expand-all.vue :::

## Controlled selection

Use `selected-values` or `v-model:selected-values` to control and observe selected nodes.

:::demo vue/components/Tree/selected-values.vue :::

## Disabled states

A node-level `disabled` flag affects one item; the component `disabled` prop affects the entire tree. `parent-effect-disabled-child` controls whether parents can change disabled children.

:::demo vue/components/Tree/disabled.vue :::

## Custom expansion icons

With only `fold-icon`, the icon rotates when expanded. Set both `fold-icon` and `expand-icon` to use separate state icons.

:::demo vue/components/Tree/expand-icon.vue :::

## Filtering

Set `filterable = true` to enable filtering, and use `filter-method` for custom matching.

:::demo vue/components/Tree/filter.vue :::

## Custom highlighting

Use `highlight-method` to customize filtered-result highlighting. Returning a VNode avoids constructing HTML strings.

:::demo vue/components/Tree/highlight-filter.vue :::

## Dynamic loading

Set `isLeaf = false` on nodes that load children on demand, then return those children from `dynamic-load`.

:::demo vue/components/Tree/dynamic-load.vue :::

## Multiple-selection limit

Use `multiple-limit` to cap the number of selections in multiple mode.

:::demo vue/components/Tree/multiple-limit.vue :::

## Custom nodes

Use the `treeNodeRender` slot for every node, or a `label` render function to override an individual item.

:::demo vue/components/Tree/custom-render.vue :::

## Field mapping

`field-map` maps external fields to `value`, `label`, and `children`. Do not reuse one source field for multiple built-in meanings.

:::demo vue/components/Tree/field-map.vue :::

## Instance methods

A component ref exposes methods for expansion, selection, scrolling, and node updates. Call them after the ref is mounted.

:::demo vue/components/Tree/controls.vue :::

## Virtual scrolling

For large data sets, set `use-virtual-scroll = true` and provide `height` or `max-height` for the viewport.

:::demo vue/components/Tree/virtual-scroll.vue :::

## Drag sorting

Set `draggable = true` to reorder nodes. The dragged node follows the pointer, the highlighted bar previews the drop target, and affected nodes settle with the same FLIP motion as SortableList. Use `drag-on-handler`, `drag-to-leaf`, and `before-drop` to constrain the interaction.

:::demo vue/components/Tree/draggable.vue :::

## selected-values compatibility

In linked multiple selection, direct child values take precedence when parent and child values are provided together. A parent by itself selects its descendants.

:::demo vue/components/Tree/optimize-selected-values.vue :::

## Non-selectable nodes

`selectable = false` prevents direct selection but still allows expansion and selectable descendants. `disabled` also blocks interaction with that node.

:::demo vue/components/Tree/selectable.vue :::

## Props

### Data, filtering, and layout

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tree-data` | `HTreeData[]` | `[]` | Hierarchical data; every `value` must be unique. |
| `field-map` | `HTreeFieldMap` | — | Maps source fields to Tree data fields. |
| `tree-helper` | `Tree<HTreeData, HTreeExtendsData>` | — | Internal Tree helper accepted when the component is composed by TreeSelect. |
| `size` | `'small' \| 'medium' \| 'large' \| 'huge'` | provider value | Row size. |
| `disabled` | `boolean` | `false` | Disables the whole tree. |
| `height` / `max-height` | `number \| string` | — | Scroll container dimensions. |
| `indent` | `number` | `24` | Indentation in pixels per level. |
| `root-class-name` / `root-style` | `string` / `CSSProperties` | — | Root element class and inline style. |
| `tooltip` | `boolean` | `true` | Shows node text in a tooltip. |
| `tooltip-show-after` / `tooltip-hide-after` | `number` | `100` / `200` | Tooltip show and hide delay. |
| `use-virtual-scroll` | `boolean` | `false` | Enables virtual scrolling; use with `height` or `max-height`. |
| `virtual-scroll-buffer` | `number` | — | Virtual-scroller buffer size. |
| `expand-wrapper-by-children` | `boolean` | `false` | Lets children expand the virtual-scroll wrapper. |

### Filtering

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `filterable` | `boolean` | `false` | Enables filtering. |
| `filter-value` | `string` | — | Filter text; supports `v-model:filter-value`. |
| `filter-input-value` | `string` | — | External text for a custom filter input. |
| `filter-input-props` | `Partial<InputProps>` | — | Props passed to the built-in filter input. |
| `filter-method` | `HTreeFilterMethodType` | — | Custom filter predicate. |
| `filter-to-hide-children` | `boolean` | `true` | Hides child nodes that do not match a filter. |
| `expand-filtered-tree` | `boolean` | `true` | Expands branches containing filter results. |
| `hide-filter-input` | `boolean` | `false` | Hides the built-in filter input. |
| `highlight-method` | `HTreeHighlightMethod` | — | Renders highlighted matches for string labels. |
| `search-input-placeholder` | `string` | locale value | Filter input placeholder. |
| `empty-text` | `string` | locale value | Empty-result text. |

### Expansion and selection

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `expand-values` | `(string \| number)[]` | — | Expanded node values; supports `v-model:expand-values`. |
| `is-default-expand-all` | `boolean` | `false` | Expands all branches on creation. |
| `is-default-expand-parent` | `boolean` | `true` | Resolves ancestors for expanded values. |
| `expand-on-click-node` | `boolean` | `true` | Toggles a branch when its row is clicked. |
| `fold-icon` / `expand-icon` | `Icon` | triangle / — | Icons for collapsed and expanded branches. |
| `prefix-icon` | `Icon` | — | Shared prefix icon for nodes. |
| `selected-values` | `(string \| number)[]` | — | Selected node values; supports `v-model:selected-values`. |
| `multiple` | `boolean` | `false` | Enables multiple selection. |
| `multiple-limit` | `number` | `Infinity` | Maximum selection count. |
| `check-strictly` | `boolean` | `false` | Makes parent and child selection independent. |
| `check-on-click-node` | `boolean` | `false` | Selects a node when its row is clicked. |
| `check-on-click-leaf` | `boolean` | `true` | Selects a leaf when its row is clicked. |
| `show-checkbox` / `show-radio` | `boolean` | `true` / `false` | Shows checkbox or radio controls. |
| `parent-effect-disabled-child` | `boolean` | `false` | Lets parent selection affect disabled descendants. |
| `stress` | `boolean` | `false` | Emphasizes selected rows. |

### Loading and dragging

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dynamic-load` | `HTreeDynamicLoadMethod` | — | Loads an unopened branch with `isLeaf: false`. |
| `draggable` | `boolean` | `false` | Enables drag sorting. |
| `drag-on-handler` | `boolean` | `true` | Starts a drag only from the drag handle. |
| `drag-to-leaf` | `boolean` | `true` | Allows dropping a node into a leaf branch. |
| `before-drop` | `(current, target, prev) => boolean \| Promise<boolean>` | — | Guards a drop before it is committed. |
| `draggable-icon` / `undraggable-icon` | `Icon \| false` | drag icon / `false` | Icons for draggable and fixed nodes. |
| `draggable-icon-always-visible` | `boolean` | `false` | Keeps drag icons visible. |
| `show-line` | `boolean` | `false` | Shows connector lines. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:tree-data` | `(treeData)` | Emits tree data after loading or node commands. |
| `update:expand-values` | `(values)` | Emits expanded values for `v-model:expand-values`. |
| `update:selected-values` | `(values)` | Emits selected values for `v-model:selected-values`. |
| `update:filter-value` | `(value)` | Emits the filter text. |
| `update:visible-nodes` | `(nodes)` | Emits nodes in current visible order. |
| `expand` | `(expandValues, value, details)` | Emits after a branch expands or collapses. |
| `select` | `(selectedValues, value, details)` | Emits after selection changes. |
| `click` / `contextmenu` | `(event, value, node, vnode?)` | Emits node click or right-click interaction. |
| `reach-top` / `reach-bottom` | `()` | Emits when scrolling reaches an edge. |

## Slots

| Slot | Scope | Description |
| --- | --- | --- |
| `treeNodeRender` | `{ data, vNode?, vnode? }` | Renders an individual tree node. |
| `empty` | — | Renders the empty result. |

## Exposes

The component ref exposes `getSelectedNodes()`, `getPartSelectedNodes()`, `getUnSelectedNodes()`, `setSelectedStatus(values, selected)`, `clearSelectedValues()`, `getExpandNodes()`, `setCollapseStatusByValue(values, isExpand)`, `setAllCollapseStatus(isExpand)`, `getNodeByValues(values)`, `setNodeByValue(treeData, value?)`, `addNodeChildrenByValue(treeDataArray, value?)`, `delNodeByValue(value?)`, `getVisibleItems()`, `scrollTo(value?)`, `treeTemplateRef`, and `keyboardEventDeal(event)`.

## Accessibility

Tree renders `tree` and `treeitem` semantics with hierarchy, expanded, selected, checked, and disabled state. `ArrowUp`, `ArrowDown`, `Home`, and `End` move focus across available nodes; `ArrowRight` expands or enters a branch, and `ArrowLeft` collapses or returns to its parent. `Enter` and `Space` select the active node. The built-in filter input keeps normal text editing behavior.
