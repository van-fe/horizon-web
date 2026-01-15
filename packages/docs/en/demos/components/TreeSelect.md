## Basic Usage
Combines `Picker` and `Tree` components, so most configurations of the `Tree` component can be passed directly

**Considering operational convenience, `TreeSelect` temporarily does not allow drag sorting**

**Note: `value` in `tree-data` must be unique throughout the entire tree**

:::demo components/TreeSelect/basic.vue :::

## Clearable
Set `clearable = true` to clear selected items when there is a value
:::demo components/TreeSelect/clearable.vue :::

## Single Selection
You can enable `show-radio` to make `Radio` components appear before leaf nodes
:::demo components/TreeSelect/single.vue :::

## Multiple Selection
Like `select`, the tags for multiple selection use `n-tag` and `n-tag-group` components combined

By default, selected items are not collapsed. You can configure `collapse-tags = true` to collapse selected items

In addition, you can configure `collapse-tags-tooltip = true` to display other selected items when hovering over `+N`, and you can quickly deselect selected items

In addition, if your `select` space is very small, it may be squeezed to only `+N`. You can configure `max-collapse-tags` to force how many selected items to display, and the rest will be collapsed

:::demo components/TreeSelect/multiple.vue :::

## Multiple Selection Limit
If you want to limit the number of user selections in multiple selection, configure `multiple-limit`
:::demo components/TreeSelect/multiple-limit.vue :::

## Parent-Child Node Strict Mode

You can control whether parent-child nodes are strictly controlled by setting `check-strictly`

If set to `true`, you can select any node that is not in `disabled` state

If set to `false`, you cannot expand `disabled` nodes, and you cannot select their subordinate nodes

:::demo components/TreeSelect/check-strictly.vue :::

## Expand and Selection Control
Through `expand-on-click-node` configuration, you can control whether to allow expanding child nodes when clicking the entire node row (default is `true`)

`check-on-click-node` controls whether to allow selecting child nodes when clicking the entire node row (default is `false`)

**`check-on-click-node` is only effective for multiple selection**

**But if single selection is configured with `check-strictly = true`, please also note the configuration of `expand-on-click-node` `check-on-click-node` to optimize click operations**

:::demo components/TreeSelect/expand-and-check.vue :::

## Optimize Selection Operation
Starting from `2.3.5`, by default, when clicking a leaf node, the node is automatically selected

If you still want to control that leaf nodes are only selected when clicking the `checkbox`, you can set `check-on-click-leaf = false`

For single selection, `check-on-click-leaf` is only effective when `show-radio = true`, otherwise it will be selected on click regardless

:::demo components/TreeSelect/check-on-leaf.vue :::

## Control Expand
Through `expand-values`, you can control the expanded fields, or use two-way binding to get the expanded values

If you don't want to automatically expand the parent, you need to set `is-default-expand-parent = false`

:::demo components/TreeSelect/expand-values.vue :::

## Default Expand All
Set `is-default-expand-all = true` to expand all data

But note that if the data is obtained asynchronously, you need to render after getting the data

In the `demo`, `v-if` is used for processing

And it is only effective during initialization. Later changes to `tree-data` will not be processed

:::demo components/TreeSelect/default-expand-all.vue :::

## Disabled
In the `tree-data` data, setting `disabled = true` for an item can disable that item

But if you want to disable the entire tree, you can directly give `disabled = true` to `n-tree`

But regardless of the disable method, it will not affect the expand function

The disabled state of child levels will also be affected by the parent-child association configuration

If in multiple selection state, you want the parent node selection to be able to change the selected state of disabled child nodes, then `parent-effect-disabled-child` needs to be set to `true`

:::demo components/TreeSelect/disabled.vue :::

## Custom Expand Icon
You can configure `fold-icon` to customize the expand icon

If you need to use clockwise rotation `90°` during the expand state switching process, leave `expand-icon` empty

If the expand state cannot be displayed using animation, please also set both `expand-icon` and `fold-icon`

:::demo components/TreeSelect/expand-icon.vue :::

## Option Statistics
Pass in `use-statistic = true` to count multiple selections

You can set `statistic-text` to specify the statistical text

:::demo components/TreeSelect/statistic.vue :::

## Filter
Set `filterable = true` to enable filtering
:::demo components/TreeSelect/filter.vue :::

## Filter Reserve Keyword
In the case of filter + multiple selection, setting `reserve-keyword` can set three modes of reserving keywords

`true`: Reserve keyword

`false`: Do not reserve keyword

`'reserve-deselect'`: Only reserve keyword when deselecting

`'reserve-special'`: Do not reserve keyword, but still reserve the filtered content. Only after the user manually clears the input text or loses focus on the input box will the filtered content change

:::demo components/TreeSelect/reserve-keyword.vue :::

## Filter in Panel
If you don't want to filter input directly in the trigger, `TreeSelect` provides two methods (both require enabling `panel-filterable` first):

1. Built-in input panel: Enable `use-build-in-panel-filter`
2. Use custom slot: Place your input box through the `slots.panelPrefix` slot, then pass in the filtered content through `panel-filter-input-value`

:::demo components/TreeSelect/filter-in-panel.vue :::

## Filter and Highlight
The default highlight color is brand color. If you want to process search results, you can process them through `highlightMethod`
:::demo components/TreeSelect/highlight-filter.vue :::

## Dynamic Load
If a node's child nodes need to use dynamic loading, you need to set the node's `isLeaf` attribute to `false`
:::demo components/TreeSelect/dynamic-load.vue :::

## Custom Node
You can customize node rendering through the `treeNodeRender` slot

You can also set `label` to `((option: NTreeData) => VNode)` type when passing in `tree-data` to customize a fixed node. At this time, the priority is higher than the `treeNodeRender` slot

:::demo components/TreeSelect/custom-render.vue :::

## Field Mapping
Use `field-map` to customize mapped fields

In this example, `label` uses `text`, `value` uses `key`, `children` uses `items`

**Note: It is forbidden to override fields with original meanings in the new mapping definition. For example, you cannot use `value` as the field mapping of `label`, otherwise it will cause errors**

For `ts` type error issues, you can solve it by declaring the `NTreeExtendsData` type globally (using the fields in the following `demo` as an example):

```ts
import type { NTreeExtendsData } from '@aurora/horizon-web';

declare module '@aurora/horizon-web' {
  interface NTreeExtendsData {
    key?: string;
    text?: string;
    items?: NTreeExtendsData[];
  }
}
```

:::demo components/TreeSelect/field-map.vue :::

## Virtual Scroll
In the case of large data volumes, too many nodes will cause performance degradation, so you can use virtual scrolling capability

You need to configure `use-virtual-scroll = true`, and either `height` or `max-height` can enable virtual scrolling

:::demo components/TreeSelect/virtual-scroll.vue :::

## Unselectable
When passing in `options`, you can set `selectable = false` to disallow selection of this item (but expansion is not limited)

Unlike `disabled`, this configuration only affects the interaction between itself and the user, and will be affected by the selection state of parent and child levels to display different states

If single selection is enabled, it is best to use it with `show-radio = true`, otherwise the display form cannot see the difference
:::demo components/TreeSelect/selectable.vue ::

