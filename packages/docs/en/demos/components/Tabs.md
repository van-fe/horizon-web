## Basic Usage
Basic usage of tabs. Default is `line` type, `medium` size
:::demo components/Tabs/basic.vue :::

## Status
Tab items in disabled state indicate that the tab item exists but is not available in the current situation. Set a single tab `disabled`, when `type=page` it does not take effect.
:::demo components/Tabs/disable.vue :::

## Size Type
Define four sizes `small | medium | large | huge`, applied in different scenarios, default `small`. Define three types `line | card | page`, default `line`. <span style="color: #FA541C; font-weight: bold;">Special note: When the type is `page`, the `size` attribute is not supported.</span>
:::demo components/Tabs/size-and-type.vue :::

## Tabs with Icons
You can add an icon before the tab title.
:::demo components/Tabs/icon.vue :::

## Scroll
In tight spaces, you can scroll left and right to accommodate more tabs. The example shows the performance within an element with a width of `600px`. You can control whether to automatically scroll to the active element through `focusable`
:::demo components/Tabs/scroll.vue :::


## Close and Add
By setting `h-tabs (editable)` and `h-tab (closable)`, you can enable dynamic addition and deletion of tabs. The application handles adding and closing; deleting the current tab selects the first available tab by default.
:::demo components/Tabs/editable.vue :::

## Right Additional Operation Area
You can add additional content, such as buttons, to the right of the tabs.
:::demo components/Tabs/extra.vue :::

## Text Overflow
The overflow part is displayed with " ... " and a text prompt appears when the mouse moves in.
:::demo components/Tabs/text-overflow.vue :::

## Draggable Tabs
If you need to sort tabs, you can enable it by setting `draggable`.
:::demo components/Tabs/draggable.vue :::

## Use with `h-panel`
Use panel component to develop tab applications
:::demo components/Tabs/with-panel.vue :::

## Before Change Callback
You can delay or prevent tab switching through `beforeChange`.
:::demo components/Tabs/before-change.vue :::

## Right-click Menu
Custom `slot` method to implement right-click menu
:::demo components/Tabs/tab-menu.vue :::

## Text Tabs
Implemented by customizing `type=line` tabs. At this time, set `indicator=false`
:::demo components/Tabs/tab-text.vue :::

## Design Token
:::code ./demos/design-token.scss :::
