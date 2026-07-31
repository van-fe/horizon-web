## Basic Usage
Consistent with other selector components, there are `normal` `emphasize` `no-border` styles
:::demo components/Cascader/basic.vue :::

## Single Selection
In single selection mode, you can configure `show-radio` to whether to display `radio` in the node

When displaying `radio`, only clicking the `radio` of non-leaf nodes can select the current node

Combined with `check-strictly`, there will be different display logic

:::demo components/Cascader/single.vue :::

## Multiple Selection
Like `select`, the tags for multiple selection use `h-tag` and `h-tag-group` components combined

By default, selected items are not collapsed. You can configure `collapse-tags = true` to collapse selected items

In addition, you can configure `collapse-tags-tooltip = true` to display other selected items when hovering over `+N`, and you can quickly deselect selected items

In addition, if your `select` space is very small, it may be squeezed to only `+N`. You can configure `max-collapse-tags` to force how many selected items to display, and the rest will be collapsed

:::demo components/Cascader/multiple.vue :::

## Select All
Supports configuring `use-check-all-summary` to mark as `All` when all options are selected (with internationalization processing)

If you want to customize the text of `All`, you can configure `check-all-summary-text`

:::demo components/Cascader/check-all-summary.vue :::

## Parent-Child Node Selection Strict Mode
You can control whether parent-child nodes are strictly controlled by setting `check-strictly`

If set to `true`, you can select any node that is not in `disabled` state

If set to `false`, you cannot expand `disabled` nodes, and you cannot select their subordinate nodes

:::demo components/Cascader/check-strictly.vue :::

## Parent-Child Node Expand Control
After configuring `check-strictly = true`, the expand logic will also be controlled by `expand-strictly`

If set to `true`, clicking the radio or checkbox will not expand child nodes

If set to `false`, clicking the radio or checkbox will expand child nodes

Note that for single selection, you need to enable `show-radio` to be effective, otherwise child nodes will be expanded regardless

:::demo components/Cascader/expand-strictly.vue :::

## Option Statistics
Pass in `use-statistic = true` to count multiple selections

You can set `statistic-text` to specify the statistical text

:::demo components/Cascader/statistic.vue :::

## Node Display Strategy
You can choose to display the full path or display leaf nodes, default is to display the full path
:::demo components/Cascader/display-way.vue :::

## Panel Expand Method
Set `trigger = 'hover'` to open the panel on hover
:::demo components/Cascader/trigger-hover.vue :::

## Node Expand Method
You can set `expand-trigger` to modify the expand method

Default is `click`, you can change it to `hover` to expand child nodes on hover

:::demo components/Cascader/panel-trigger.vue :::

## Confirm Selection
Configure `need-confirm = true` to enable secondary confirmation after selection

:::demo components/Cascader/confirm.vue :::

## Custom Confirm Selection Content
You can control the text of confirm and cancel buttons through `confirm-button-text` `cancel-button-text`

The `confirmRender` slot also exposes two methods `cancelHandle` `confirmHandle` for use when customizing the footer

In addition, you can also use the `exposeConfirm` exposed by the `cascader` instance to perform confirm and cancel operations
:::demo components/Cascader/custom-confirm.vue :::
## panel Grouping
Due to the special nature of the `cascader` tree structure, if you want to achieve grouping effect, you can only set a node with only `groupLabel` when passing in `options` to simulate grouping

:::demo components/Cascader/panel-grouped.vue :::

## Dynamic Loading
Note that when using dynamic loading, you need to use `v-model:options` to pass in `options`

Because bidirectional synchronization of `options` data is needed here, and you need to specify dynamically loaded `option` as a non-leaf node (i.e., set `isLeaf` to `false`)

**Special note: `value` at the same level must not be repeated, otherwise the component will have exceptions when mounting child items**
:::demo components/Cascader/dynamic-load.vue :::

## Filter
Set `filterable` to enable filtering

Note that different states of `check-strictly` will affect the displayed `option` list
:::demo components/Cascader/filterable.vue :::

## Filter Select All
Supports passing in `use-filter-check-all = true` to enable select all when filtering

:::demo components/Cascader/filter-check-all.vue :::

## Filter Configuration
Configure `filter-method` to customize the filter method

`filter-max-result` can control the maximum number of displayed results

`filter-result-sort` can control the sorting function of filtered results
:::demo components/Cascader/filterable-config.vue :::

## Custom Display After Filtering
Through the `searchPanelRender` slot, you can customize the filtered content
:::demo components/Cascader/filter-render-slot.vue :::

## Filter and Confirm
Combination of `filterable` and `need-confirm` display
:::demo components/Cascader/common-search-confirm.vue :::

## Keyword Retention
Use the `reserve-keyword` configuration to control whether to retain keywords after selecting options
:::demo components/Cascader/filter-reserve-keyword.vue :::

## Empty List
Generally, `cascader` will judge whether it is a leaf node based on whether `children` is empty. If you explicitly set the `isLeaf` attribute of a node with empty `children` to `false`, an empty state will be displayed at this time
:::demo components/Cascader/empty-list.vue :::

## Empty Dataset
If `options` is an empty array, an empty state will be displayed directly

This setting also takes effect when the result set is empty in filtering situations

:::demo components/Cascader/empty.vue :::


## Field Mapping
Configure `field-map` to control mapped fields, so you can directly use custom `options` structure without changing it to `cascader` specified default fields

For `ts` type error issues, you can solve it by declaring the `HCascaderOption` type globally (using the fields in the following `demo` as an example):

```ts
import type { HCascaderOption } from '@aurora/horizon-web';

declare module '@aurora/horizon-web' {
  interface HCascaderOption {
    id?: HCascaderOption['value'];
    tag?: HCascaderOption['label'];
    tagString?: HCascaderOption['stringLabel'];
  }
}
```
:::demo components/Cascader/field-map.vue :::

## Custom Trigger Input Box Display Content
Through the `selectRender` slot, you can customize the renderer selector

:::demo components/Cascader/custom-trigger-inner.vue :::

## Custom Selected tag
Commonly used in multiple selections, use the `tagRender` slot to customize the selected `tag`

:::demo components/Cascader/custom-selected-item.vue :::

## Custom Icon
Use `expand-icon` and `selected-icon` to customize the expand icon and single selection selected icon

:::demo components/Cascader/custom-icon.vue :::

## Custom Option render
Use `itemRender` to customize the rendering of each option

For correct display of selected content and search results, when the type of `label` is specified as a function, you need to specify the value of `stringLabel` for `option`

:::demo components/Cascader/custom-option-render.vue :::

## Custom Selector
With the `default` slot, you can customize the selector

:::demo components/Cascader/custom-trigger.vue :::

## model-value Unmatched
When `model-value` cannot be found in options, its `value` will be displayed directly

:::demo components/Cascader/unmatched-value.vue :::

## Virtual Scroll
Set `use-virtual-scroll = true` to enable virtual scrolling

This shows 50k pieces of data (because parent-child level relationships need to be processed, the more levels, the greater the performance impact. This will be optimized in subsequent iterations to improve computing capabilities)

:::demo components/Cascader/virtual-scroll.vue :::

## Unselectable
When passing in `options`, you can set `selectable = false` to disallow selection of this item (but expansion is not limited)

**The following is a comparison table with disabled (the same applies to tree and tree selector):**

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

:::demo components/Cascader/selectable.vue :::
