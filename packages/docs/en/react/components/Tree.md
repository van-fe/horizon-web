# Tree

Tree presents hierarchical data for navigation, selection, filtering, lazy loading, and drag reordering. Each `TreeOption` needs a unique `value` and a `label`; branches use `children`, and an unloaded branch uses `isLeaf: false`.

## Basic selection

Use `multiple` and `showCheckbox` for linked multi-selection. A parent selection includes its selectable descendants unless `checkStrictly` is enabled.

:::react-demo react/components/Tree/basic.tsx :::

## Controlled expansion and selection

Pass `expandValues` and `selectedValues` when the application owns state. Their callbacks receive the next proposed values, so external actions can update the same state.

:::react-demo react/components/Tree/controlled.tsx :::

## Filtering and dynamic loading

`filterable` adds a search input. Return children from `dynamicLoad` for a branch marked with `isLeaf: false`; `onTreeDataChange` receives the resulting immutable tree data.

:::react-demo react/components/Tree/filter-dynamic.tsx :::

## Dragging and custom nodes

Set `draggable` to enable pointer reordering. `renderNode` receives normalized state for the current node, so presentation can include application metadata without mutating source data.

:::react-demo react/components/Tree/drag-render.tsx :::

## Props

### Data, state, and filtering

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `treeData` | `readonly TreeOption[]` | — | Controlled tree data. |
| `defaultTreeData` | `readonly TreeOption[]` | `[]` | Initial data for an uncontrolled tree. |
| `fieldMap` | `TreeFieldMap` | — | Maps semantic option fields to source-data keys. |
| `filterable` | `boolean` | `false` | Shows the filter input. |
| `filterValue` / `defaultFilterValue` | `string` | `''` | Controlled or initial filter text. |
| `filterMethod` | `TreeFilterMethod` | — | Custom node-matching function. |
| `filterToHideChildren` | `boolean` | `true` | Limits filtered branches to matching children. |
| `expandFilteredTree` | `boolean` | `true` | Expands branches that contain filtered results. |
| `hideFilterInput` | `boolean` | `false` | Hides the built-in filter input. |
| `filterInputProps` | `Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled' \| 'onChange' \| 'placeholder' \| 'value'>` | — | Native attributes for the filter input. |
| `searchInputPlaceholder` | `string` | provider value | Filter input placeholder. |
| `emptyText` | `string` | provider value | Text used for an empty result. |

### Expansion and selection

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `expandValues` / `defaultExpandedValues` | `readonly TreeValue[]` | — | Controlled or initial expanded values. |
| `isDefaultExpandAll` | `boolean` | `false` | Expands every branch on initial render. |
| `isDefaultExpandParent` | `boolean` | `true` | Includes ancestors when resolving expanded values. |
| `expandOnClickNode` | `boolean` | `true` | Toggles a branch when its row is clicked. |
| `selectedValues` / `defaultSelectedValues` | `readonly TreeValue[]` | — | Controlled or initial selected values. |
| `multiple` | `boolean` | `false` | Enables multiple selection. |
| `multipleLimit` | `number` | `Infinity` | Maximum selected values in multiple mode. |
| `checkStrictly` | `boolean` | `false` | Makes parent and child selection independent. |
| `checkOnClickNode` | `boolean` | `false` | Selects a node when its row is clicked. |
| `checkOnClickLeaf` | `boolean` | `true` | Selects a leaf when its row is clicked. |
| `showCheckbox` / `showRadio` | `boolean` | `true` / `false` | Shows checkbox or radio controls. |
| `parentEffectDisabledChild` | `boolean` | `false` | Lets parent selection affect disabled descendants. |
| `stress` | `boolean` | `false` | Emphasizes selected rows. |

### Layout, loading, and drag interaction

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `TreeSize` | provider value | Row size. |
| `disabled` | `boolean` | `false` | Disables the whole tree. |
| `height` / `maxHeight` | `number \| string` | — | Scroll container dimensions. |
| `indent` | `number` | `24` | Indentation in pixels per level. |
| `tooltip` | `boolean` | `true` | Shows the node text as a native tooltip. |
| `tooltipShowAfter` / `tooltipHideAfter` | `number` | `100` / `200` | Tooltip timing values retained for shared configuration. |
| `dynamicLoad` | `TreeDynamicLoader` | — | Loads children for an unopened branch. |
| `draggable` | `boolean` | `false` | Enables drag reordering. |
| `dragOnHandler` | `boolean` | `true` | Requires pointer drag to start from the handle. |
| `dragToLeaf` | `boolean` | `true` | Allows a dragged node to become a leaf node's child. |
| `beforeDrop` | `TreeBeforeDrop` | — | Synchronous or asynchronous guard before a drop is committed. |
| `draggableIcon` / `undraggableIcon` | `ReactNode` | — / `false` | Drag-handle content for draggable and non-draggable rows. |
| `draggableIconAlwaysVisible` | `boolean` | `false` | Keeps drag handles visible. |
| `showLine` | `boolean` | `false` | Shows connector lines for child rows. |

### Rendering and native attributes

`Tree` also accepts standard `HTMLAttributes<HTMLDivElement>` except conflicting event and `children` fields. Use `className` and `style` for the root element.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `renderNode` | `(context: TreeNodeRenderContext) => ReactNode` | node label | Renders a tree row's content. |
| `renderEmpty` | `ReactNode \| () => ReactNode` | — | Renders the empty result. |

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onTreeDataChange` | `(data: readonly TreeOption[]) => void` | Reports data produced by loading, dragging, or ref commands. |
| `onExpandedValuesChange` | `(values: TreeValue[]) => void` | Reports the requested expanded values. |
| `onSelectedValuesChange` | `(values: TreeValue[]) => void` | Reports the requested selected values. |
| `onFilterValueChange` | `(value: string) => void` | Reports filter input changes. |
| `onVisibleNodesChange` | `(nodes: TreeNormalizedNode<TreeOption>[]) => void` | Reports the current visible order. |
| `onExpand` | `(values, value, details) => void` | Runs after a branch expansion request. |
| `onSelect` | `(values, value, details) => void` | Runs after a selection request. |
| `onNodeClick` / `onNodeContextMenu` | `(event, value, node) => void` | Run for row click or context-menu interaction. |
| `onLoadError` | `(error, node) => void` | Reports a rejected dynamic load. |
| `onDropError` | `(error) => void` | Reports a rejected asynchronous drop guard. |
| `onReachTop` / `onReachBottom` | `() => void` | Run when native scrolling reaches an edge. |

## Ref

`TreeHandle` exposes `element`, `focus(value?)`, `getSelectedNodes()`, `getPartSelectedNodes()`, `getUnselectedNodes()`, `setSelectedStatus(values, selected)`, `clearSelectedValues()`, `getExpandNodes()`, `setExpandedStatus(values, expanded)`, `setAllExpandedStatus(expanded)`, `getNodesByValue(values)`, `setNodeByValue(data, value?)`, `addNodeChildrenByValue(data, value?)`, `deleteNodeByValue(value?)`, `getVisibleItems()`, and `scrollTo(value?)`.

## Accessibility

The root uses `role="tree"`, and rows use `role="treeitem"` with level, position, expanded, selected, checked, and disabled state. `ArrowUp`, `ArrowDown`, `Home`, and `End` move the active enabled row. `ArrowRight` expands a branch or moves into it; `ArrowLeft` collapses a branch or returns to its parent. `Enter` and `Space` select the active enabled row. The built-in search input keeps its normal text-entry keyboard behavior.
