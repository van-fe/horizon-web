## Basic Usage
Pass to `tree-data` according to the structure of `HTreeData` to generate a tree structure

**Note: `value` in `tree-data` must be unique throughout the entire tree**

:::demo components/Tree/basic.vue :::

## Emphasis Color
You can set `stress = true` to set the font color and background of selected items to brand color, making them more prominent
:::demo components/Tree/stress.vue :::

## Radio and Checkbox
Configure `show-checkbox` (enabled by default) and `shwo-radio` (disabled by default) to control the selection component displayed before options
:::demo components/Tree/checkbox-and-radio.vue :::

## Prefix Icon
Set `prefix-icon` to set the prefix icon
:::demo components/Tree/prefix-icon.vue :::

## Parent-Child Association
Set `check-strictly` to control whether selection is associated at the hierarchy level

For single selection, if `check-strictly = true` is set, non-leaf nodes can also be selected

:::demo components/Tree/check-strictly.vue :::

## Expand and Selection Control
Through `expand-on-click-node` configuration, you can control whether to allow expanding child nodes when clicking the entire node row (default is `true`)

`check-on-click-node` controls whether to allow selecting child nodes when clicking the entire node row (default is `false`)

**`check-on-click-node` is only effective for multiple selection**

**But if single selection is configured with `check-strictly = true`, please also note the configuration of `expand-on-click-node` `check-on-click-node` to optimize click operations**

:::demo components/Tree/expand-and-check.vue :::

## Optimize Selection Operation
Starting from `2.3.5`, by default, when clicking a leaf node, the node is automatically selected

If you still want to control that leaf nodes are only selected when clicking the `checkbox`, you can set `check-on-click-leaf = false`

For single selection, `check-on-click-leaf` is only effective when `show-radio = true`, otherwise it will be selected on click regardless

:::demo components/Tree/check-on-leaf.vue :::

## Control Expand
Through `expand-values`, you can control the expanded fields, or use two-way binding to get the expanded values

If you don't want to automatically expand the parent, you need to set `is-default-expand-parent = false`
:::demo components/Tree/expand-values.vue :::

## Default Expand All
Set `is-default-expand-all = true` to expand all data

But note that if the data is obtained asynchronously, you need to render after getting the data

In the `demo`, `v-if` is used for processing

And it is only effective during initialization. Later changes to `tree-data` will not be processed

:::demo components/Tree/default-expand-all.vue :::

## Control Selection
Through `selected-values`, you can control the selected items, or use two-way binding to get the selected values
:::demo components/Tree/selected-values.vue :::

## Disabled
In the `tree-data` data, setting `disabled = true` for an item can disable that item

But if you want to disable the entire tree, you can directly give `disabled = true` to `h-tree`

But regardless of the disable method, it will not affect the expand function

The disabled state of child levels will also be affected by the parent-child association configuration

If in multiple selection state, you want the parent node selection to be able to change the selected state of disabled child nodes, then `parent-effect-disabled-child` needs to be set to `true`

:::demo components/Tree/disabled.vue :::

## Custom Expand Icon
You can configure `fold-icon` to customize the expand icon

If you need to use clockwise rotation `90°` during the expand state switching process, leave `expand-icon` empty

If the expand state cannot be displayed using animation, please also set both `expand-icon` and `fold-icon`

:::demo components/Tree/expand-icon.vue :::

## Filter
The `Tree` component has built-in filtering capability. Set `filterable = true` to enable filtering
:::demo components/Tree/filter.vue :::

## Filter and Highlight
The default highlight color is brand color. If you want to process search results, you can process them through `highlightMethod`
:::demo components/Tree/highlight-filter.vue :::

## Dynamic Load
If a node's child nodes need to use dynamic loading, you need to set the node's `isLeaf` attribute to `false`
:::demo components/Tree/dynamic-load.vue :::

## Multiple Selection Limit
If you want to limit the number of user selections in multiple selection, configure `multiple-limit`
:::demo components/Tree/multiple-limit.vue :::

## Custom Node
You can customize node rendering through the `treeNodeRender` slot

You can also set `label` to `((option: HTreeData) => VNode)` type when passing in `tree-data` to customize a fixed node. At this time, the priority is higher than the `treeNodeRender` slot

:::demo components/Tree/custom-render.vue :::

## Field Mapping
Use `field-map` to customize mapped fields

In this example, `label` uses `text`, `value` uses `key`, `children` uses `items`

**Note: It is forbidden to override fields with original meanings in the new mapping definition. For example, you cannot use `value` as the field mapping of `label`, otherwise it will cause errors**

For `ts` type error issues, you can solve it by declaring the `HTreeExtendsData` type globally (using the fields in the following `demo` as an example):

```ts
import type { HTreeExtendsData } from '@aurora/horizon-web';

declare module '@aurora/horizon-web' {
  interface HTreeExtendsData {
    key?: string;
    text?: string;
    items?: HTreeExtendsData[];
  }
}
```

:::demo components/Tree/field-map.vue :::

## Controlled Mode
The component provides very rich methods that can be used to operate the tree component
:::demo components/Tree/controls.vue :::

## Virtual Scroll
In the case of large data volumes, too many nodes will cause performance degradation, so you can use virtual scrolling capability

You need to configure `use-virtual-scroll = true`, and either `height` or `max-height` can enable virtual scrolling

This shows 50k pieces of data (because parent-child level relationships need to be processed, the more levels, the greater the performance impact. This will be optimized in subsequent iterations to improve computing capabilities)

:::demo components/Tree/virtual-scroll.vue :::

## Drag Sort
Set `draggable = true` to enable drag sort

By default, you can only drag when the mouse is pressed on the drag icon. You can configure `drag-on-handler = false` to make the entire row draggable

If you want to prevent dragging the current node under a leaf node and generating a child node during dragging, you need to set `dragToLeaf = false`

You can set `before-drop` to intercept the drag result

:::demo components/Tree/draggable.vue :::

## Optimize selected-values Data Processing
Before version `2.3.4 (inclusive)`, in multiple selection, if both [non-leaf nodes] and their child [leaf nodes] are passed to `selected-values`, only [leaf nodes] will be selected. But the refactored version of `2.3.5` did not adapt to this `BUG` logic

Starting from `2.4.6`, logic adaptation will be made for this previous `BUG`:

1. If [non-leaf nodes] are selected, it will check whether their [child level] (excluding child level and beyond) are selected. If selected, the selection state of [that non-leaf node] will be ignored (i.e., the half-selected state of `Component`, `Basic`)
2. But if the [child level] of [non-leaf nodes] are not selected, all child nodes under it will be selected (i.e., the selected state of `Data` and its child levels)

:::demo components/Tree/optimize-selected-values.vue :::

## Unselectable
When passing in `options`, you can set `selectable = false` to disallow selection of this item (but expansion is not limited)

**The following is a comparison table with disabled (cascading selection and tree selector are the same):**

<table class="md-table text-center">
    <thead>
        <tr>
            <th rowspan="2"></th>
            <th rowspan="2">Setting Object</th>
            <th rowspan="2" width="120">Mouse Selection Object</th>
            <th>disabled = true</th>
            <th>selectable = false</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th rowspan="9" width="120">Parent-Child Node Association</th>
            <th rowspan="3" width="80">Root Node</th>
            <th width="80">Current Root Node</th>
            <td>Cannot select, interact</td>
            <td>Cannot select, interact</td>
        </tr>
        <tr>
            <th width="80">Child Node</th>
            <td>Cannot select, interact</td>
            <td>Can freely select and interact, and can associate the state of its descendant nodes</td>
        </tr>
        <tr>
            <th width="80">Leaf Node</th>
            <td>Cannot select, interact</td>
            <td colspan="2">Can select and interact</td>
        </tr>
        <tr>
            <th rowspan="3" width="80">Child Node</th>
            <th width="80">Root Node</th>
            <td>Can select, interact <br> But cannot change the state of descendant nodes with <code>disabled</code> set</td>
            <td>Can select, interact <br> But cannot change the state of descendant nodes with <code>unselectable</code> set</td>
        </tr>
        <tr>
            <th width="80">Current Child Node</th>
            <td>Cannot select, interact</td>
            <td>Cannot select, interact</td>
        </tr>
        <tr>
            <th width="80">Leaf Node</th>
            <td>Cannot select, interact</td>
            <td>Can select and interact</td>
        </tr>
        <tr>
            <th rowspan="3" width="80">Leaf Node</th>
            <th width="80">Root Node</th>
            <td>Can select, interact <br> But cannot change the state of descendant nodes with <code>disabled</code> set</td>
            <td>Can select, interact <br> But cannot change the state of descendant nodes with <code>unselectable</code> set</td>
        </tr>
        <tr>
            <th width="80">Child Node</th>
            <td>Can select, interact <br> But cannot change the state of descendant nodes with <code>disabled</code> set</td>
            <td>Can select, interact <br> But cannot change the state of descendant nodes with <code>unselectable</code> set</td>
        </tr>
        <tr>
            <th width="80">Current Leaf Node</th>
            <td>Cannot select, interact</td>
            <td>Cannot select, interact</td>
        </tr>
        <tr>
            <th rowspan="3" width="120">Parent-Child Node Not Associated</th>
            <th>Root Node</th>
            <td rowspan="3" colspan="3">Cannot select, interact itself, other nodes are not interfered</td>
        </tr>
        <tr>
            <th>Child Node</th>
        </tr>
        <tr>
            <th>Leaf Node</th>
        </tr>
    </tbody>
</table>

If single selection is enabled, it is best to use it with `show-radio = true`, otherwise the display form cannot see the difference
:::demo components/Tree/selectable.vue :::
