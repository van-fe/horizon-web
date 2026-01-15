## Basic Usage
Basic usage of tabs. Default is `line` type, `medium` size
:::demo components/Tabs/basic.vue :::

## Status
Tab items in disabled state indicate that the tab item exists but is not available in the current situation. Set a single tab `disabled`, when `type=page` it does not take effect.
:::demo components/Tabs/disable.vue :::

## Size Type
Define four sizes `mini | small | medium | large`, applied in different scenarios, default `medium`. Define four types `line | card | segment | page`, default `line`. <span style="color: #FA541C; font-weight: bold;">Special note: When the type is `page`, the `size` attribute is not supported.</span>
:::demo components/Tabs/size-and-type.vue :::

## Tabs with Icons
You can add an icon before the tab title.
:::demo components/Tabs/icon.vue :::

## Scroll
In tight spaces, you can scroll left and right to accommodate more tabs. The example shows the performance within an element with a width of `600px`. You can control whether to automatically scroll to the active element through `focusable`
:::demo components/Tabs/scroll.vue :::


## Close and Add
By setting `n-tabs (editable)`, `n-tab (closable)` attributes, you can enable dynamic addition and deletion of tabs. Only effective in `line | card | page`; the logic of closing and adding is implemented by the business. `v2 = true`, if the deleted tab is the current tab, the first tab is selected by default
:::demo components/Tabs/editable.vue :::

## Right Additional Operation Area
You can add additional content, such as buttons, to the right of the tabs. <span style="color: #FA541C; font-weight: bold;">Special note: `segment` type does not support right operation area buttons</span>
:::demo components/Tabs/extra.vue :::

## Text Overflow
The overflow part is displayed with " ... " and a text prompt appears when the mouse moves in.
:::demo components/Tabs/text-overflow.vue :::

## Draggable Tabs
If you need to sort tabs, you can enable it by setting `draggable`.
:::demo components/Tabs/draggable.vue :::

## Use with `n-panel`
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

## v1.x Compatibility
For smoother business migration, complete compatibility has been made for v1.x version. You can set to use v2.x logic through v2. Affected logic points: <br />
1.`beforeChange` logic, after enabling, `beforeChange` returns `PromiseLike<false>` to prevent tab switching <br />
2.`emits.close`, after enabling, if the deleted tab is the active tab, the first tab is selected by default
3.`size`, after enabling, `small` size is used by default
:::demo components/Tabs/compatible.vue :::


## Design Token
:::code ./demos/design-token.scss :::
