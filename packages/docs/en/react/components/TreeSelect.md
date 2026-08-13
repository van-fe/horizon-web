# TreeSelect

TreeSelect picks one or more values from a hierarchical tree inside a popup. It supports controlled and uncontrolled state, text filtering, staged confirmation, dynamic branches, field mapping, custom rendering, and the same keyboard tree navigation used by standalone Tree.

## Basic selection and ref

Pass `treeData` for controlled data or `defaultTreeData` for an uncontrolled data source. A `TreeSelectHandle` ref can focus or open the trigger, clear a selection, inspect selected nodes, and call tree commands.

:::react-demo react/components/TreeSelect/basic.tsx :::

## Multiple selection and filtering

Enable `multiple` with `showCheckbox`. `filterable` searches the hierarchy from the trigger; `collapseTags`, `maxCollapseTags`, and `collapseTagsTooltip` keep a long selection readable.

:::react-demo react/components/TreeSelect/multiple-filter.tsx :::

## Controlled confirmation

With `needConfirm`, tree interactions update a draft. Confirmation commits it through `onValueChange`; cancellation restores the committed value. `value` and `open` can both remain controlled by the application.

:::react-demo react/components/TreeSelect/controlled-confirm.tsx :::

## Field mapping, dynamic loading, and rendering

`fieldMap` adapts existing source fields to the tree model. Mark an unloaded branch with `isLeaf: false`, provide `dynamicLoad`, and use `onTreeDataChange` to accept the immutable data update. `renderNode` receives normalized node state without changing the source object.

:::react-demo react/components/TreeSelect/field-map-dynamic.tsx :::

## Value and option models

A single selection is a `TreeValue` (`string` or `number`). Multiple selection uses `TreeValue[]`; `null` or `undefined` represents no selection. Every resolved value must be unique across the full tree.

`TreeSelectOption` provides `value`, `label`, optional `children`, `disabled`, `selectable`, `isLeaf`, and other tree fields. Application-specific fields can remain on the object and be read through `originOption` in a renderer.

## Props

### Value, popup, and filtering

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `TreeSelectModelValue` | — | Controlled value or initial uncontrolled value. |
| `initialValue` | `TreeSelectModelValue` | `[]` | Fallback committed by clear. |
| `open` / `defaultOpen` | `boolean` | — / `false` | Controlled popup state or its uncontrolled initial state. |
| `filterValue` / `defaultFilterValue` | `string` | — / `''` | Controlled filter text or its uncontrolled initial value. |
| `trigger` | `'click' \| 'hover' \| 'never'` | `'click'` | Popup trigger mode. |
| `disabled` | `boolean` | `false` | Disables trigger and tree interaction. |
| `clearable` | `boolean` | `false` | Shows the clear action for a non-empty selection. |
| `filterable` | `boolean` | `false` | Makes the trigger searchable. |
| `filterMethod` | `TreeFilterMethod` | default label match | Matches normalized tree nodes. |
| `filterToHideChildren` | `boolean` | `true` | Hides non-matching children during filtering. |
| `expandFilteredTree` | `boolean` | `true` | Expands branches containing matches. |
| `reserveKeyword` | `boolean \| 'reserve-deselect' \| 'reserve-special'` | `true` | Retains or clears the trigger keyword after selection. |
| `panelFilterable` | `boolean` | `false` | Shows a dedicated filter input inside the popup. |
| `panelInputPlaceholder` | `string` | Provider value | Panel filter input placeholder. |

### Tree data, expansion, and selection

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `treeData` / `defaultTreeData` | `readonly TreeSelectOption[]` | — / `[]` | Controlled data or initial uncontrolled data. |
| `fieldMap` | `TreeFieldMap` | — | Maps semantic tree fields to source-data fields. |
| `expandValues` / `defaultExpandedValues` | `readonly TreeValue[]` | — | Controlled expanded values or their initial uncontrolled state. |
| `isDefaultExpandAll` | `boolean` | `false` | Expands all initial branches. |
| `isDefaultExpandParent` | `boolean` | `true` | Includes ancestors when resolving initial expansion. |
| `expandOnClickNode` | `boolean` | `true` | Toggles branch expansion from its row. |
| `multiple` | `boolean` | `false` | Enables multiple selection. |
| `multipleLimit` | `number` | `Infinity` | Maximum selected values in multiple mode. |
| `checkStrictly` | `boolean` | `false` | Makes parent and child selection independent. |
| `checkOnClickNode` | `boolean` | `false` | Selects a branch from its full row. |
| `checkOnClickLeaf` | `boolean` | `true` | Selects a leaf from its full row. |
| `showCheckbox` / `showRadio` | `boolean` | `true` / `false` | Shows explicit multiple- or single-selection controls. |
| `parentEffectDisabledChild` | `boolean` | `false` | Lets parent selection affect disabled descendants. |
| `stress` | `boolean` | `false` | Emphasizes selected rows. |
| `dynamicLoad` | `TreeDynamicLoader` | — | Loads children for an expanded `isLeaf: false` branch. |

### Trigger, tags, and popup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | Provider value | Trigger placeholder. |
| `size` / `treeSize` | `ChoiceSize` / `TreeSize` | Provider value | Trigger and tree-row sizes. |
| `inputVariant` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | Trigger visual variant. |
| `inputStatus` | `'normal' \| 'error' \| 'warning' \| 'success'` | `'normal'` | Trigger validation status. |
| `inputProps` | `Omit<InputHTMLAttributes<HTMLInputElement>, 'value' \| 'onChange' \| 'onClick'>` | — | Native trigger input attributes. |
| `placement` | `PopoverPlacement` | `'bottom-start'` | Preferred popup placement. |
| `portal` / `portalContainer` | `boolean` / `PortalTarget` | `true` / `'body'` | Portal behavior and destination. |
| `distance` / `skidding` | `number` | `4` / — | Main- and cross-axis popup offsets. |
| `hoverShowDelay` / `hoverHideDelay` | `number` | `0` / `200` | Hover trigger delays in milliseconds. |
| `panelWidth` | `string \| number` | — | Popup inline size. |
| `fitInputWidth` | `boolean \| 'fit-content'` | `true` | Popup width policy. |
| `popupClassName` / `panelStyle` | `string` / `CSSProperties` | — | Popup class and inline styles. |
| `collapseTags` | `boolean` | `false` | Collapses multiple-selection tags. |
| `maxCollapseTags` | `number` | — | Maximum tags shown before the summary. |
| `collapseTagsTooltip` | `boolean` | `false` | Shows hidden tag labels in a native tooltip. |
| `useStatistic` / `statisticText` | `boolean` / `string` | `false` / Provider value | Displays a selection-count summary. |
| `needConfirm` | `boolean` | `false` | Stages changes until confirmation. |
| `confirmText` / `cancelText` | `string` | Provider value | Confirmation action labels. |
| `confirmButtonProps` / `cancelButtonProps` | `Partial<ButtonProps>` | — | Confirmation action properties. |

Tree layout, drag sorting, tooltips, lines, height constraints, and drop guards use the corresponding Tree props: `height`, `maxHeight`, `indent`, `tooltip`, `draggable`, `dragOnHandler`, `dragToLeaf`, `beforeDrop`, `draggableIcon`, `undraggableIcon`, `draggableIconAlwaysVisible`, and `showLine`.

## Renderers

| Prop | Type | Description |
| --- | --- | --- |
| `renderTrigger` | `(context: TreeSelectTriggerContext) => ReactNode` | Renders the complete trigger; spread `context.triggerProps` onto one focusable element. |
| `renderTag` | `(tag: TreeSelectTagData) => ReactNode` | Renders one selected tag. |
| `renderSelection` | `(nodes, tags) => ReactNode` | Renders the selected-value area. |
| `renderNode` | `(context: TreeNodeRenderContext) => ReactNode` | Renders one normalized tree row. |
| `panelHeader` / `panelFooter` | `ReactNode` | Popup header and footer content. |
| `emptyContent` | `ReactNode` | Empty-state content. |

## Callbacks

| Callback | Type | Description |
| --- | --- | --- |
| `onValueChange` | `(value: TreeSelectModelValue) => void` | Reports a committed value proposal. |
| `onOpenChange` | `(open, details) => void` | Reports a popup state proposal and its reason. |
| `onFilterValueChange` | `(value: string) => void` | Reports trigger or panel filter text. |
| `onExpandedValuesChange` | `(values: TreeValue[]) => void` | Reports an expansion proposal. |
| `onTreeDataChange` | `(data: readonly TreeSelectOption[]) => void` | Reports immutable data produced by loading, dragging, or commands. |
| `onExpand` / `onSelect` | Tree callback signatures | Run after one expansion or selection interaction. |
| `onNodeClick` / `onNodeContextMenu` | Tree callback signatures | Run for node pointer interactions. |
| `onLoadError` / `onDropError` | error callback | Report dynamic-load or asynchronous drop failures. |
| `onConfirm` / `onCancel` | `(value, event?) => void` | Run after a staged session is accepted or discarded. |
| `onClear` | `(value) => void` | Runs after clear proposes its fallback value. |

## Ref

`TreeSelectHandle` exposes `input`, `popup`, `focus()`, `blur()`, `open()`, `close()`, `clear()`, `confirm()`, `cancel()`, `setFilterValue(value)`, `getPendingValue()`, and `updatePosition()`. It also exposes the Tree inspection and mutation commands: `getSelectedNodes()`, `getPartSelectedNodes()`, `getUnselectedNodes()`, `setSelectedStatus()`, `clearSelectedValues()`, `getExpandNodes()`, `setExpandedStatus()`, `setAllExpandedStatus()`, `getNodesByValue()`, `setNodeByValue()`, `addNodeChildrenByValue()`, `deleteNodeByValue()`, `getVisibleItems()`, and `scrollTo()`.

## Provider and accessibility

`HorizonWebProvider` supplies `treeSelectLabels` for placeholder, empty state, tree name, selection count, and tag removal. Confirmation labels use `pickerLabels`. Instance props override provider text.

The default input uses `role="combobox"`, declares a tree popup, and owns the active popup tree through `aria-controls`. Arrow keys move focus into and through enabled tree items; branch expansion, selection, Home, End, and Escape preserve native Tree and popup behavior. When supplying `renderTrigger`, apply `triggerProps` to exactly one focusable element so ownership, keyboard handling, disabled state, and focus remain intact.
