Table presents structured data that users need to compare, sort, filter, or act on in bulk. Give dynamic rows a stable `row-key`, preserve the table's own horizontal scrolling at narrow widths, and provide explicit feedback for loading, empty, selection, and remote-query states.

## Basic Usage

Pass rows through `data`. Each `h-table-column` uses `title` for its header and `field` to read a value from the row. Add a cell slot only when the value needs status or actions.

:::demo components/Table/basic.vue :::

## Size

The component supports `mini`, `small`, `medium`, and `large`. Choose density with data volume, touch targets, and long localized text in mind.

:::demo components/Table/size.vue :::

## Border

`border` accepts `default`, `full`, `outer`, and `false`. Full borders suit tightly aligned financial grids, while the default horizontal separators are quieter for general lists.

:::demo components/Table/border.vue :::

## Stripe

Set `:stripe="true"` to show zebra stripes, helping users follow a row without losing their place.

:::demo components/Table/stripe.vue :::

## Row States

Use `row-class-name` to express warning, error, and completed rows. Build custom treatments from theme tokens and never rely on color alone.

:::demo components/Table/row-class-name.vue :::

## Overflow Tooltip

Long content wraps by default. To keep it on one line, set a width and enable
`show-overflow-tooltip`.

:::demo components/Table/show-overflow-tooltip.vue :::

## Fixed Header

When the table has many rows, set `height` or `max-height` to constrain its height and keep the
header fixed while the body scrolls.

:::demo components/Table/height.vue :::

## Sticky Header

Enable `header-sticky` to keep the header visible inside a custom scroll container, rather than
using the regular table scrolling behavior.

The parent element is used as the scroll container by default. If the scroll container is not the
parent, specify it with `header-sticky-container`.

:::demo components/Table/header-sticky.vue :::

## Fixed Columns

Set `fixed` on `h-table-column`.

The available values are `true`, `'left'`, and `'right'`.

:::demo components/Table/fixed.vue :::

## Resizable Columns

Set `resizable` on a column, then drag the divider at the right edge of its header to adjust the
column width.

:::demo components/Table/resizable.vue :::

## Drag to Reorder

Set `draggable` on columns to drag headers and reorder sibling columns. Add a column with
`type="drag"` to reorder sibling rows with a drag handle.

Row dragging writes the reordered data back through `v-model:data`. In a tree table, nodes can only
be reordered within the same parent.

:::demo components/Table/draggable.vue :::

## Fluid Height

When the amount of data changes dynamically, set `max-height`. A scrollbar appears when the table
height exceeds `max-height`.

:::demo components/Table/max-height.vue :::

## Multi-level Header

Nest `h-table-column` components inside another `h-table-column` to group child columns under a
parent and create a multi-level header.

Multi-level headers automatically enable full borders, and that style cannot be changed.

A child column also inherits the value of `fixed` directly from its parent.

:::demo components/Table/multiple-header.vue :::

## Column Management

Enable `use-column-manager` to provide column management.

:::demo components/Table/use-column-manager.vue :::

## Single Selection

Set `type="selection"` on `h-table-column` to add a single-selection column.

For configuration purposes, treat each selection column as an independent form control.

Without two-way binding, clicking the selector does not leave it selected.

:::demo components/Table/single.vue :::

## Multiple Selection

Set `type="selection"` and `multiple` to `true` on `h-table-column` to add a multiple-selection
column.

For configuration purposes, treat each selection column as an independent form control.

Without two-way binding, clicking a selector does not leave it selected.

:::demo components/Table/multiple.vue :::

## Column Tip

Set `tip` on `h-table-column` to add a tip to the column.

:::demo components/Table/tip.vue :::

## Sorting

Set `sortable` on a column to enable sorting.

Table provides built-in sorting through the default `Array.prototype.sort` behavior.

For special sorting requirements, such as numbers or dates, pass `sort-method` to customize
client-side sorting.

To sort by multiple columns, hold `Ctrl` or `Command` while clicking the sort icons.

Sorting can also be handled by an API. Listen for `sort-change` on either Table or a column, then
update the order of `data` in the callback.

:::demo components/Table/sort.vue :::

## Filtering

Filtering supports two forms:

1. Provide options and filter with selection controls such as `select` or `date-picker`.
2. Search directly with input controls such as `input` or `input-number`.

<br>

To handle filtering through an API, pass `:use-built-in-filter="false"` and listen for the
`filter-change` event on the column.

:::demo components/Table/filter.vue :::

## Cell and Row Editing

Set `editable` on a column to enable editing; double-clicking enters edit mode by default. The
built-in editors reuse Input, InputNumber, Select, TreeSelect, Cascader, DatePicker, and TimePicker.
You can also customize an editor through the `editor` slot.

`before-edit` and `before-commit` support asynchronous validation. If a commit fails, the editor
and its error state remain visible. Press Enter to commit or Escape to cancel.

:::demo components/Table/editable.vue :::

## Unified State and Remote Queries

`getState` and `setState` combine sorting, filtering, selection, expansion, and column order,
visibility, pinning, and width. Use `exportState` and `restoreState` to persist that state. With
`query-mode="remote"`, sorting and filtering only update the query state and emit `query-change`;
they do not process local data.

:::demo components/Table/state.vue :::

## Grouping and Aggregation

`group-by` accepts a single field, multiple hierarchical fields, or a function. `aggregations`
includes `sum`, `count`, `average`, `min`, and `max`, and also accepts custom functions. Group rows
can be expanded with the mouse or keyboard and can be combined with virtual scrolling.

:::demo components/Table/grouping.vue :::

## Custom Column Template

Customize column content through the default slot of a column.

See `HTableCellScopeSlots` in the [type definitions](#type-definitions).

:::demo components/Table/column-default-slot.vue :::

## Custom Header

Customize a column header through the `column.header` slot.

See `HTableHeaderCellScopeSlots` in the [type definitions](#type-definitions).

:::demo components/Table/column-header-slot.vue :::

## Empty State

Use `empty-text` for a concise empty result.

When users need an explanation or recovery action, compose a richer state through the `empty` slot.

:::demo components/Table/empty.vue :::

## Loading

Set `loading` to put the table in a loading state. Keep loading controls outside the masked target so users can always cancel or retry.

Loading is implemented with `v-loading`, so the default text is localized. Configure
`loading-text` to provide custom loading text.

For additional loading-state customization, pass an options object supported by `v-loading`.

:::demo components/Table/loading.vue :::

## Expandable Rows

Use expandable rows to display a child table or to keep secondary information out of the header.

:::warning If more than one column has `type="expand"`, only the `expand` slot of the first one is rendered. :::

:::demo components/Table/expand.vue :::

## Nested Tables

Building on expandable rows, nested tables can display secondary information that is itself an
array.

:::demo components/Table/nested-tables.vue :::

## Tree Table

For tree data, first configure the `row-key` prop to identify each row uniquely, then place child
data in the `children` field.

For lazy loading, set `isLeaf: false` on the row and configure the `dynamic-load` prop.

Use the `field-map` prop to customize the `children` and `isLeaf` field names.

The tree table uses `row-key` to determine which column should be expandable. If the row-key field
is not among the configured columns, the first column automatically becomes the expandable column.

You can also set `tree-expand-field` to choose the expandable column explicitly.

:::demo components/Table/tree.vue :::

## Tree Table with Single Selection

For single selection in a tree, set `type="selection"` on a column.

Set `check-strictly` to ignore parent-child relationships when selecting rows.

:::demo components/Table/tree-single-selection.vue :::

## Tree Table with Multiple Selection

For multiple selection in a tree, set `type="selection"` and `multiple` to `true` on a column.

Set `check-strictly` to ignore parent-child relationships when selecting rows.

:::demo components/Table/tree-multiple-selection.vue :::

## Summary Footer

Enable `show-summary` to display numeric statistics in the footer. Built-in and custom summaries use `Decimal.js` accumulation to avoid ordinary floating-point errors.

For multiple summary rows, set `summary-row-amount` and return a two-dimensional array from `summary-method`.

:::tip `summary-method` must always return a two-dimensional array. :::

:::demo components/Table/summary.vue :::

## Merging Rows and Columns

Pass `span-method` to merge rows and columns. It may return `[number, number]`,
`{ rowSpan?: number; colSpan?: number }`, or `void` (the default, with no merging).

When `rowSpan` or `colSpan` is `0`, the cell is hidden.

:::demo components/Table/span-method.vue :::

## Custom Index

After setting a column to `type="index"`, pass a number to `index` or pass a function to compute a
custom index.

The type of `index` is
`number | ((index: number, row: HTableTransformedRowDataType) => number)`.

:::demo components/Table/index.vue :::

## Table Layout

Configure the layout as `fixed` or `auto`. The default is `fixed`.

See [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout).

:::demo components/Table/table-layout.vue :::

## Virtual Scrolling

For large datasets, enable `virtual` so Table can use the component library's existing
`VirtualScroller` on demand. When it is disabled, Table continues to render normally without
additional runtime overhead. Fixed row heights provide the best performance; enable `dynamic` to
measure actual row heights when content may wrap.

Virtual scrolling requires both `height` and `row-key`. Use `scrollToIndex`, `scrollToRow`, and
`getVisibleRange` to control or inspect the scroll position.

:::demo components/Table/virtual.vue :::

## Large Data Processing

`virtual` only reduces DOM rendering. Optimize data operations such as sorting and filtering
separately with `data-processing`:

- `sync` runs synchronously and is suitable for small datasets or custom operations.
- `auto` automatically uses a Web Worker when the dataset reaches the threshold and only built-in
  sorting and filtering are used.
- `worker` prioritizes a Worker and transparently falls back to synchronous processing if Worker
  creation fails or an operation cannot be serialized.

The Worker receives only a lightweight projection of the fields involved in the query and returns
row indices. Original row objects, slots, and events remain on the main thread. Functions such as
`sort-method`, `sort-by`, and `filter-method` use the synchronous fallback. Results are also
preserved by synchronous fallback for tree tables, SSR, browsers without Worker support, and strict
CSP policies that block Blob-based Workers. Under a strict CSP, provide a self-hosted Worker through
`workerFactory`.

The package also exports the headless `processTableData`, `createTableDataProcessingRequest`,
`createTableDataProcessingWorkerSource`, protocol version, and related types. Use them to generate a
self-hosted Worker during your build or reuse the same columnar filtering and stable-sorting engine
in other data-management workflows.

If your application replaces `data` immutably, set `:watch-data="false"` to skip Vue's deep
traversal of large arrays. After mutating data in place, call `reloadData()`. Use
`data-processing-change`, `getDataProcessingState()`, `refreshDataProcessing()`, and
`cancelDataProcessing()` to observe or control asynchronous tasks.

An unresponsive Worker is terminated after 30 seconds by default and processing falls back to the
main thread. Configure this with `workerTimeout`, or set it to `0` to disable the timeout. After
replacing a custom `sort-method`, `sort-by`, or `filter-method` at runtime, call
`refreshDataProcessing()` to recompute immediately.

The example below uses 50,000 rows. You can switch among synchronous, automatic, and Worker modes
and combine processing with virtual scrolling.

:::demo components/Table/data-processing.vue :::

## Type Definitions

:::code ../../../../horizon-web/src/components/Table/src/utils/types.ts :::
