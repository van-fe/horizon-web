## Basic Usage

:::demo components/Select/basic.vue :::

## Single Selection
You can configure `show-selected-icon` to enable displaying the selected indicator

You can also configure `selected-icon` to customize the icon of the selected indicator

:::demo components/Select/single.vue :::

## Custom `dropdown icon`
You can control the `dropdown icon` by configuring `dropdown-icon`

If you pass in `false`, it can be set to empty

:::demo components/Select/icon-style.vue :::

## Multiple Selection
By default, selected items are not collapsed. You can configure `collapse-tags = true` to collapse selected items

In addition, you can configure `collapse-tags-tooltip = true` to display other selected items when hovering over `+N`, and you can quickly deselect selected items

In addition, if your `select` space is very small, it may be squeezed to only `+N`. You can configure `max-collapse-tags` to force how many selected items to display, and the rest will be collapsed

If your option content is too long, causing it to be unable to fit between selected items and `+N`, you can configure `collapse-tags-fill-up = true` to make selected items fill the space as much as possible

Starting from `2.4.0`, `collapse-tags-fill-up` is enabled by default

:::demo components/Select/multiple.vue :::

## Select All
Supports passing in `use-check-all = true` to enable select all

:::demo components/Select/check-all.vue :::

## Option Statistics
Pass in `use-statistic = true` to count multiple selections

You can set `statistic-text` to specify the statistical text

`use-statistic` takes priority over `use-check-all`

:::demo components/Select/statistic.vue :::

## Dynamic Set Collapse
You can control the collapse state by toggling `collapse-tags`. When `focus`, all are expanded, when `false`, collapsed

:::demo components/Select/dynamic-collapse.vue :::

## Grouping
You can use `h-option-group` to group, with named groups and unnamed groups
:::demo components/Select/group.vue :::

## Disabled
Set `disabled = true` to disable `h-select`

Set `disabled = true` for `h-option` to disable the current option

Set `disabled = true` for `h-option-group` to disable all options under the current group

:::demo components/Select/disabled.vue :::

## Selected Options Not Displayed
Set `selected-visible = false` to not display selected options in the panel

:::demo components/Select/hide-selected.vue :::

## Auxiliary Description Text
Set content for `h-option.description` to assist in explaining `label`
:::demo components/Select/description.vue :::

## Filter
Set `filterable = true` to enable filtering

If you need to customize the filter method, pass `filter-method`

If you need an `input` on the dropdown panel, you can configure `use-build-in-panel-filter` to enable the built-in `input` on the panel

The original implementation using slots can still be used

:::demo components/Select/filter.vue :::

## Filter Reserve Keyword
In the case of filter + multiple selection, setting `reserve-keyword` can set three modes of reserving keywords

`true`: Reserve keyword

`false`: Do not reserve keyword

`'reserve-deselect'`: Only reserve keyword when deselecting

`'reserve-special'`: Do not reserve keyword, but still reserve the filtered content. Only after the user manually clears the input text or loses focus on the input box will the filtered content change

:::demo components/Select/reserve-keyword.vue :::

## Confirm Panel
To enable the confirm panel, you need to enable `need-confirm = true`

:::demo components/Select/confirm.vue :::

## Value Conversion
Use `value-format`, pass in a function, then you can convert `modelValue`

Please note that it is still not recommended to use `value-format`. Since 2.3.0, `h-option.value` already supports `object` type

This method will be removed in `3.x`

:::demo components/Select/format-value.vue :::

## Custom Option
Through the `option.default` slot, you can customize the display form

You can also set the slot `select.optionRender` to uniformly set the display form of `option`

In addition, you can pass in `select.external-panel-style` to customize the `style` of the panel

:::demo components/Select/option.vue :::

## Option Overflow
If the option is too long, it will automatically overflow

`select.max-tag-width` has been removed, constrained by `tag` specification
:::demo components/Select/overflow.vue :::

## Remote Search
Set `show-search` to enable remote search

Listen to the `search` event to control when search results are displayed

Or you can control it by passing an async method to `search-method`

If you want to display the panel even when there are no results, set `hide-panel-when-show-search-and-empty-list = false`

:::demo components/Select/remote-search.vue :::

## Allow Create
Set `allow-create` to allow creating `option`

And use the `before-create` callback to determine whether to allow creating `option`

:::demo components/Select/creatable.vue :::

## Reach Bottom Load
You can listen to the `optionListReachBottom` event to get whether it has scrolled to the bottom, then trigger update loading

Toggling the `loading` state can change the loading state of the popup panel

:::demo components/Select/reach-bottom.vue :::

## Custom Selection Tag
Through the `select.tagRender` slot, you can customize the rendering performance of selected options in the input box

Using the `option.label` slot, you can customize the display form of text in `h-option`

:::demo components/Select/custom-tag-render.vue :::

## Selected Options to Top
You can set `selectedOptionOrderToTop = true` to enable selected options to be arranged to the top

The arrangement will only be performed after closing the panel, and the sorting will not change when actively selecting

If it is a grouping situation, it will be ranked first in the group, and will not move the entire group forward

:::demo components/Select/selected-option-order-to-top.vue :::

## Width Adaptation
By default, the width of the dropdown panel will be consistent with the `select` width.

In special cases, the `select` width may be very small, and the dropdown panel width needs to be unrestricted. You can set `fit-input-width = false`

But note that at this time, the dropdown panel width no longer has a maximum width limit, so it will be stretched by overly long child elements

In addition, the trigger itself has a minimum width of `144px`. If you need to change it, you need to modify the style

:::demo components/Select/fit-width.vue :::

## Initial Value
By default, after clearing the value, `update:modelValue` will default to `undefined`

But you can also control the default value after clearing through `initialValue`

For example, you can specify data such as `null` `[]`

**Note that empty strings are also considered non-empty values**

:::demo components/Select/initial-value.vue :::

## Event Display

This example shows all event emissions, you can check the printed events in the console

:::demo components/Select/events.vue :::

## Custom Empty Style
You can use `empty-text` to control the text displayed when the list is empty

You can also control the content displayed when empty through the slot `slots.empty`

:::demo components/Select/empty.vue :::

## Virtual Scroll
Enabling virtual scroll requires configuring the `options` field

Once this value is set, the content of the `default` slot will be ignored, and you cannot customize the display of `option` (that is, all slots related to `option` cannot be used)

This example creates 5000 elements

**Due to the special nature of the virtual scroll component, there may be blank invisible items in filtering and searching situations. You need to manually scroll up and down to restore**

:::demo components/Select/virtual-scroller.vue :::
