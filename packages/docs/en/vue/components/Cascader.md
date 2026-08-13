# Cascader

Cascader selects one or more values from a hierarchical option tree. Use `v-model` for the selected value and `v-model:options` when the tree is loaded dynamically.

`HCascaderOption` requires `value: string | number` and `label: string | ((option) => VNode)`. It also supports `stringLabel`, `children`, `disabled`, `isLeaf`, `selectable`, and `groupLabel`. A value is one path (`Array<string | number>`), multiple paths, `null`, or `undefined`.

## Props

### Value, options, and selection

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `ModelValueType` | — | Bound selected path or paths |
| `initialValue` | `Array<string \| number> \| null \| symbol` | `[]` | Initial value used when `modelValue` is empty |
| `options` | `HCascaderOption[]` | — | Option tree; required |
| `multiple` | `boolean` | `false` | Enables multiple selection |
| `multipleLimit` | `number` | `Infinity` | Maximum number of selections |
| `disabled` | `boolean` | — | Disables the cascader |
| `clearable` | `boolean` | `false` | Shows the clear action |
| `checkStrictly` | `boolean` | `false` | Makes parent and child selection independent |
| `expandStrictly` | `boolean` | `true` | In strict mode, prevents selecting a branch from automatically expanding it when `true` |
| `showCheckedStrategy` | `'fullPath' \| 'leaf'` | `'fullPath'` | Label display strategy |
| `pathSeparator` | `string` | `'/'` | Separator between labels in a full path |
| `fieldMap` | `Partial<Record<keyof HCascaderOption, keyof HCascaderOption \| string>>` | — | Maps option field names |

### Trigger and presentation

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `'hover' \| 'click' \| 'never'` | `'click'` | How the outer panel opens |
| `expandTrigger` | `'hover' \| 'click'` | `'click'` | How child panels expand |
| `hoverShowDelay` / `hoverHideDelay` | `number` | `0` / `200` | Hover-trigger timing in milliseconds |
| `placeholder` | `string` | — | Trigger placeholder |
| `size` | `'large' \| 'medium' \| 'small'` | — | Trigger size |
| `inputStyle` | `'normal' \| 'emphasize' \| 'no-border'` | `'normal'` | Trigger visual style |
| `inputAttrs` | `PickerNativeInputAttrs` | — | Native ARIA, data, naming, and form attributes for the main input; Cascader keeps ownership of its tree relationships and internal behavior |
| `inputStatus` | `PickerInputStatusType` | `'normal'` | Trigger validation state |
| `maxHeight` | `string \| number` | `256` | Maximum trigger height |
| `popperClassName` | `string` | — | Class applied to the popup |
| `placement` | `PopoverProps['placement']` | `'bottom-start'` | Preferred popup placement |
| `flip` | `boolean` | `true` | Allows the popup to flip when space is limited |
| `toBody` | `boolean` | `true` | Teleports the popup to `body` |
| `popoverOptions` | `Partial<PopoverProps>` | — | Additional Popover options |
| `showPopoverContentOnly` | `boolean` | `false` | Renders only popup content |
| `expandIcon` / `dropdownIcon` / `selectedIcon` | icon input / icon input or `false` / icon input | — | Icons for expansion, trigger, and single-select leaves |

### Tags and option panels

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `collapseTags` | `boolean` | `false` | Collapses selected tags in multiple mode |
| `collapseTagsTooltip` | `boolean` | `false` | Shows collapsed tags in a tooltip |
| `maxCollapseTags` | `number` | — | Number of tags kept before collapsing |
| `collapseTagsFillUp` | `boolean` | `true` | Lets visible tags fill available space |
| `collapsedTagsProps` | `Partial<TagProps>` | — | Props for the collapsed `+N` tag |
| `useStatistic` | `boolean` | `false` | Shows a multiple-selection count |
| `statisticText` | `string` | — | Text before the selection count |
| `showRadio` | `boolean` | `false` | Shows radios in single-select mode |
| `maxPanelItemWidth` | `number \| boolean` | `254` | Maximum option-label width; `false` removes the limit |
| `showTooltip` | `boolean` | `true` | Shows a tooltip for width-limited labels; `false` wraps them |
| `optionMaxLines` | `number` | `1` | Maximum option-label lines |
| `tooltipShowAfter` / `tooltipHideAfter` | `number` | `100` / `200` | Option-tooltip timing in milliseconds |
| `panelsLoading` | `boolean \| LoadingOptions` | `false` | Loading state or `v-loading` options for panels |
| `showTagsInPanel` | `boolean` | `false` | Shows selected tags inside the panel |
| `useVirtualScroll` | `boolean` | `false` | Virtualizes long option lists |

### Filtering, confirmation, and dynamic data

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `filter` | `boolean \| HCascaderSearchParams` | `false` | Enables filtering or provides `{ filter, limit?, searchPanelWidth?, sort? }` |
| `filterable` | `boolean` | `false` | Enables trigger search |
| `filterMethod` | `HCascaderFilterFunction` | — | `(input, paths) => boolean` match function |
| `filterMaxResult` | `number` | `50` | Maximum filtered results |
| `filterResultSort` | `HCascaderFilterSortFunction` | — | `(a, b, inputValue) => number` result sorter |
| `reserveKeyword` | `boolean \| 'reserve-deselect'` | `true` | Keeps the keyword after filtered selection |
| `inputAble` | `boolean` | `false` | Enables custom trigger input when `filter` is `false` |
| `inputEmitFrequency` | `number` | `200` | Custom-input event interval in milliseconds |
| `searchIcon` | icon input or `false` | check icon | Search icon, or `false` to hide it |
| `fitInputWidth` | `boolean \| 'fit-content'` | `true` | Filter-panel width policy |
| `fitContentInputMinWidth` | `string \| number` | `1` | Minimum width for a fit-content input |
| `panelFilterOption` | `boolean` | `false` | Enables filtering within option panels |
| `panelFilterInputValue` | `string` | `''` | Controlled panel-filter text |
| `useBuildInPanelFilter` | `boolean` | `false` | Displays the built-in panel filter input |
| `panelInputPlaceholder` | `string` | — | Panel-filter placeholder |
| `searchPanelWidth` | `string \| number` | `''` | Search-results panel width |
| `useFilterCheckAll` | `boolean` | `false` | Enables select-all for filtered multiple results |
| `useCheckAllSummary` | `boolean` | `false` | Replaces an all-selected tag list with a summary |
| `checkAllSummaryText` | `string` | — | Custom all-selected summary |
| `needConfirm` | `boolean` | `false` | Requires explicit confirmation |
| `confirmButtonText` / `cancelButtonText` | `string` | localized | Confirmation button labels |
| `emptyText` | `string` | localized | Empty-state text |
| `dynamicLoad` | `(node: HCascaderDynamicLoadNode) => Promise<HCascaderOption[]>` | — | Loads children; `node` contains `level`, `options`, and optional `vnode` |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `value: ModelValueType` | Selected value changed |
| `update:options` | `options: HCascaderOption[]` | Option tree changed, including dynamic-load updates |
| `dropdownVisibleChange` | `visible: boolean` | Popup visibility changed |
| `focus` | — | Cascader received focus |
| `blur` | — | Cascader lost focus |
| `input` | `value: string` | Custom input text changed |
| `search` | `value: string` | Filter text changed |
| `change` | `selected?: boolean, option?: HCascaderExtendOption` | An option was selected or deselected |
| `clear` | — | Selection was cleared |
| `select` | `valuePath?: Array<string \| number>, option?: HCascaderExtendOption` | An option was selected |
| `deselect` | `valuePath?: Array<string \| number>, option?: HCascaderExtendOption` | An option was deselected |
| `modify` | `modelValue: ModelValueType, selected?: boolean, option?: HCascaderExtendOption` | Committed selected options changed |
| `confirm` | `modelValue: ModelValueType` | Staged selection was confirmed |
| `cancel` | `modelValue: ModelValueType` | Staged selection was cancelled |
| `panelReachBottom` | `event: Event \| undefined, parent: HCascaderOption \| null \| undefined` | A child panel reached its end |
| `click` | `event: MouseEvent` | Trigger was clicked |

## Slots

| Slot | Scope | Description |
| --- | --- | --- |
| `default` | `{ visible: Ref<boolean> }` | Replaces the complete trigger and panel composition |
| `tagRender` | `HCascaderExtendOption` | Renders one selected tag |
| `selectRender` | — | Renders the complete selected-value area |
| `itemRender` | `HCascaderExtendOption` | Renders one panel option |
| `searchPanelRender` | `{ paths: HCascaderFilterPathData[]; inputValue: string }` | Renders filtered search results |
| `empty` | — | Renders an empty option list |
| `confirmRender` | `{ cancelHandle; confirmHandle }` | Renders confirmation actions |
| `panelHeaderRender` | — | Renders panel header content |
| `panelFooterRender` | — | Renders panel footer content |
| `panelConfirmLeft` | — | Renders the left part of the confirmation area |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `confirmHandle()` | `() => void` | Confirms staged selection |
| `cancelHandle()` | `() => void` | Cancels staged selection |
| `focusOption(valuePath)` | `(valuePath: ModelValueSingleType) => void` | Focuses an option path |
| `changePanelVisible(status)` | `(status: boolean) => void` | Changes popup visibility |
| `setInputAble()` | `() => void` | Enables custom input |
| `inputChange(value)` | `(value: string \| null) => void` | Sends custom trigger text to filtering; `null` clears it |
| `clear()` | `() => void` | Clears selected values |
| `renderedModelValueTags` | `Ref<Array<VNode \| JSX.Element>>` | Rendered selected-tag nodes |
| `focus()` | `() => void` | Focuses the cascader |
| `blur()` | `() => void` | Blurs the cascader |

## Basic usage

Combine `size`, `input-style`, `disabled`, and `check-strictly` while comparing single and multiple selection. Focus and selection events are shown directly in the demo.

:::demo vue/components/Cascader/basic.vue :::

## Single selection

`show-radio` makes single selection explicit. With `check-strictly`, non-leaf nodes can also be selected.

:::demo vue/components/Cascader/single.vue :::

## Multiple-selection tags

Use `collapse-tags`, `collapse-tags-tooltip`, and `max-collapse-tags` to summarize dense selections.

:::demo vue/components/Cascader/multiple.vue :::

## Select-all summary

`use-check-all-summary` shows a concise summary after every option is selected. Replace its workflow copy with `check-all-summary-text`.

:::demo vue/components/Cascader/check-all-summary.vue :::

## Parent–child relationship

`check-strictly` controls whether parent and child nodes are selected independently or as a hierarchy.

:::demo vue/components/Cascader/check-strictly.vue :::

## Parent expansion behavior

When `check-strictly` is enabled, `expand-strictly` decides whether selecting a parent also opens its next level.

:::demo vue/components/Cascader/expand-strictly.vue :::

## Selection statistics

`use-statistic` summarizes multiple selections as a count. Use `statistic-text` for a domain-specific noun.

:::demo vue/components/Cascader/statistic.vue :::

## Selected-value strategy

`show-checked-strategy="fullPath"` preserves hierarchy context, while `leaf` shows only the destination.

:::demo vue/components/Cascader/display-way.vue :::

## Open on hover

`trigger="hover"` controls panel visibility. `hover-show-delay` and `hover-hide-delay` help prevent accidental toggles.

:::demo vue/components/Cascader/trigger-hover.vue :::

## Expand child panels

`expand-trigger` supports `click` and `hover`. Click works well for touch and keyboard use; hover favors fast pointer exploration.

:::demo vue/components/Cascader/panel-trigger.vue :::

## Confirm a selection

`need-confirm` keeps staged choices separate from the committed value and reports the result through `confirm` and `cancel`.

:::demo vue/components/Cascader/confirm.vue :::

## Custom confirmation area

Change built-in action copy, compose a footer with `confirmRender`, or call the exposed `confirmHandle` and `cancelHandle` methods.

:::demo vue/components/Cascader/custom-confirm.vue :::

## Panel groups

An option containing only `groupLabel` acts as a non-selectable heading for otherwise independent hierarchies.

:::demo vue/components/Cascader/panel-grouped.vue :::

## Dynamic loading

Dynamic loading requires `v-model:options` and `isLeaf: false` on nodes that still need children. Values must remain unique within each level.

:::demo vue/components/Cascader/dynamic-load.vue :::

## Filtering

`filterable` searches from the trigger. `panel-filter-option` filters inside the open panel. The demo compares built-in and custom panel search fields.

:::demo vue/components/Cascader/filterable.vue :::

## Select all filtered results

Enable `use-filter-check-all` in multiple mode to select every selectable node in the current result set.

:::demo vue/components/Cascader/filter-check-all.vue :::

## Filter configuration

`filter-method` defines matching, `filter-max-result` limits output, and `filter-result-sort` controls ranking.

:::demo vue/components/Cascader/filterable-config.vue :::

## Custom search results

Use `searchPanelRender` to reorganize each result while retaining readable hierarchy context.

:::demo vue/components/Cascader/filter-render-slot.vue :::

## Filter and confirm

Combine `filterable` with `need-confirm` when users should search a large dataset and commit choices together.

:::demo vue/components/Cascader/common-search-confirm.vue :::

## Preserve the search keyword

`reserve-keyword` can always preserve, always clear, or preserve only after deselection.

:::demo vue/components/Cascader/filter-reserve-keyword.vue :::

## Empty child list

When a node is explicitly non-leaf but has no children, use `empty-text` or the `empty` slot to explain the empty branch.

:::demo vue/components/Cascader/empty-list.vue :::

## Empty dataset

An empty `options` array shows an empty state. Supply workflow copy or a complete custom empty treatment.

:::demo vue/components/Cascader/empty.vue :::

## Field mapping

`field-map` maps `value`, `label`, `stringLabel`, and `children` to an existing data shape without rewriting it first.

Projects can augment `HCascaderOption` for custom TypeScript fields:

```ts
declare module '@aurora/horizon-web-vue' {
  interface HCascaderOption {
    id?: HCascaderOption['value'];
    tag?: HCascaderOption['label'];
    tagString?: HCascaderOption['stringLabel'];
    nodes?: HCascaderOption[];
  }
}
```

:::demo vue/components/Cascader/field-map.vue :::

## Custom trigger content

Use `selectRender` to turn a selected path into compact workflow language.

:::demo vue/components/Cascader/custom-trigger-inner.vue :::

## Custom selected tags

In multiple mode, `tagRender` customizes the content of each selected tag.

:::demo vue/components/Cascader/custom-selected-item.vue :::

## Custom icons

`expand-icon` controls hierarchy navigation, while `selected-icon` marks a selected leaf.

:::demo vue/components/Cascader/custom-icon.vue :::

## Custom option rendering

Use `itemRender` to customize option rows. When `label` is a render function, also provide `stringLabel` so filtering and summaries remain readable.

:::demo vue/components/Cascader/custom-option-render.vue :::

## Custom complete trigger

The default slot replaces the full trigger. Use the exposed `inputChange` method to send custom input into filtering.

:::demo vue/components/Cascader/custom-trigger.vue :::

## Unmatched values

When a saved value no longer exists in `options`, Cascader preserves the raw value. Full-path and leaf-only strategies still apply.

:::demo vue/components/Cascader/unmatched-value.vue :::

## Virtual scrolling

`use-virtual-scroll` renders only visible options. This demo uses 40 × 40 × 4, or 6,400 leaf destinations, to exercise search and multiple selection.

:::demo vue/components/Cascader/virtual-scroll.vue :::

## Unselectable and disabled nodes

`selectable: false` prevents selecting only that node while keeping descendants available. `disabled: true` disables the node and its interaction.

:::demo vue/components/Cascader/selectable.vue :::
