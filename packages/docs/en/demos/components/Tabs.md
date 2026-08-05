Tabs switch between peer views within the same context. Keep labels concise and structurally consistent; when labels are numerous or long, preserve their full names while making the navigation scrollable.

## Basic Usage

Synchronize the selected tab with `v-model:active-key`. The default `line` type works well for peer navigation within a page.

:::demo components/Tabs/basic.vue :::

## Card Type

`type="card"` creates a stronger container boundary for settings, editors, and other focused workspaces.

:::demo components/Tabs/card.vue :::

## Disabled State

Set `disabled` on an `h-tab` to preserve the navigation structure while communicating that content is temporarily unavailable. The `page` type does not apply the disabled state.

:::demo components/Tabs/disable.vue :::

## Types and Sizes

Tabs supports `line`, `card`, and `page` types plus `small`, `medium`, `large`, and `huge` sizes. The `page` type ignores `size`; `underline` and `indicator` only affect `line` tabs.

:::demo components/Tabs/size-and-type.vue :::

## Tabs with Icons

Use `icon` to place an icon before a label. Icons should improve recognition rather than replace clear text.

:::demo components/Tabs/icon.vue :::

## Scrollable Tabs

When labels exceed the available width, `scrollable` enables horizontal navigation. `arrow` controls the arrow buttons, while `focusable` keeps the active tab in view.

:::demo components/Tabs/scroll.vue :::

## Add and Close

Set `editable` on `h-tabs` to expose the add action and `closable` on an `h-tab` to expose its close action. The application updates business data in the `add` and `close` handlers.

:::demo components/Tabs/editable.vue :::

## Extra Actions

The `extra` slot places view-level actions such as refresh and reset beside the tab list and provides the current tab size.

:::demo components/Tabs/extra.vue :::

## Long Labels and Overflow

When a label supplied through `label` is truncated, a Tooltip automatically reveals its complete name. Custom label slots own their structure and truncation rules, so compose a Tooltip there when needed.

:::demo components/Tabs/text-overflow.vue :::

## Draggable Tabs

Enable `draggable` to reorder tabs. The `sort` event provides the source and target positions plus the ordered key list. An individual tab can opt out through its own `draggable` prop.

:::demo components/Tabs/draggable.vue :::

## Use with Panels

Tabs provides navigation only. Bind the same active key to `h-tabs` and `h-panels` to coordinate navigation with visible content.

:::demo components/Tabs/with-panel.vue :::

## Before-change Guard

`before-change` prevents navigation when it returns `false` or `Promise<false>`. Use it for unsaved work, permission checks, or asynchronous confirmation.

:::demo components/Tabs/before-change.vue :::

## Context Menu

Compose Dropdown inside a custom label slot to offer actions such as duplicate and close. The application still owns the tab collection.

:::demo components/Tabs/tab-menu.vue :::

## Text-style Tabs

Disable `indicator` and `underline`, then compose Tag in the label slot to create compact filter navigation.

:::demo components/Tabs/tab-text.vue :::

## Equal-width Page Tabs

`type="page"` lays out page-level labels across the available width and suits steps or primary views. Keep long labels understandable at narrow widths or provide their full text.

:::demo components/Tabs/width.vue :::

## Custom Labels

The default `h-tab` slot exposes `state` and `activeKey`, allowing counts, states, and tooltips while retaining Tabs selection and keyboard behavior.

:::demo components/Tabs/slot.vue :::

## Design Token

:::code ./demos/design-token.scss :::
