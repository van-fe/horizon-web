## Basic Usage
:::demo vue/components/Pagination/basic.vue :::

## Configure Maximum Page Button Count
:::demo vue/components/Pagination/max-buttons-amount.vue :::

## Whether to Display Range Value
Set `show-range` to display the data range of the current page.
:::demo vue/components/Pagination/show-range.vue :::

## Hide Pagination When Only One Page
You can set `hide-on-single-page` to hide pagination when there is only one page
:::demo vue/components/Pagination/hide-on-single-page.vue :::

## Control Pagination Sub-elements
Set `layout` to configure displayed elements

`layout` accepts a string array or a comma-separated string.
:::demo vue/components/Pagination/layout.vue :::

## Prefix/Suffix Slots
You can configure `prefix` and `suffix` slots
:::demo vue/components/Pagination/slots.vue :::

## Custom Previous/Next Page Button Content
You can configure `prev` and `next` slots to customize the button content for previous/next page
:::demo vue/components/Pagination/prev-next.vue :::

## Simplified Mode
Configure `type` as `simple` or `simplest` to enable simplified or minimal mode
:::demo vue/components/Pagination/type.vue :::

## Disabled
Set `disabled = true` to disable globally, preventing users from clicking during data requests, which would cause page number jitter and jump errors
:::demo vue/components/Pagination/disabled.vue :::
