## Basic Usage
By setting `height`, when the content height exceeds this height, a scrollbar will be displayed
:::demo components/Scrollbar/basic.vue :::

## Size
In pages, drawers, popups, and containers, it is recommended to use `medium`

In dropdown popups and editors, it is recommended to use `small`
:::demo components/Scrollbar/size.vue :::

## Horizontal Scroll
When the width is greater than the container width, a horizontal scrollbar will be displayed
:::demo components/Scrollbar/horizon.vue :::

## Maximum Height
By setting `max-height`, you can control not to display the scrollbar when it is less than the set `max-height`
:::demo components/Scrollbar/max-height.vue :::

## Always Display Scrollbar
You can set `always = true` to control the scrollbar to always be displayed

But note that if the scroll size itself is smaller than the container size, the scrollbar will still not be displayed
:::demo components/Scrollbar/always.vue :::

## Manual Scroll Setting
Through the exposed `setScrollTop` and `setScrollLeft` methods, you can set the scrollbar scrolling
:::demo components/Scrollbar/manual.vue :::

## Minimum Size
Set `minSize` to ensure that when there is a lot of scroll content, the scrollbar can still be easily clicked
:::demo components/Scrollbar/min-size.vue :::
