## Basic Usage
:::demo components/Pagination/basic.vue :::

## Configure Maximum Page Button Count
Control the maximum number of page buttons through `pager-count`
:::demo components/Pagination/max-buttons-amount.vue :::

## Whether to Display Range Value
Set `show-total` to control whether to display range value
:::demo components/Pagination/show-range.vue :::

## Hide Pagination When Only One Page
You can set `hide-on-single-page` to hide pagination when there is only one page
:::demo components/Pagination/hide-on-single-page.vue :::

## Control Pagination Sub-elements
Set `layout` to configure displayed elements

Starting from `2.0.0-beta.4`, `layout` can not only receive string arrays, but also strings separated by commas
:::demo components/Pagination/layout.vue :::

## Prefix/Suffix Slots
You can configure `prefix` and `suffix` slots
:::demo components/Pagination/slots.vue :::

## Custom Previous/Next Page Button Content
You can configure `prev` and `next` slots to customize the button content for previous/next page
:::demo components/Pagination/prev-next.vue :::

## Simplified Mode
Configure `type` as `simple` or `simplest` to enable simplified or minimal mode
:::demo components/Pagination/type.vue :::

## Disabled
Set `disabled = true` to disable globally, preventing users from clicking during data requests, which would cause page number jitter and jump errors
:::demo components/Pagination/disabled.vue :::
