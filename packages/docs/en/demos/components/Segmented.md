## Basic usage

Use `active-key` or `v-model:active-key` to read the current option. Segmented works best for a small set of mutually exclusive views.

:::demo components/Segmented/basic.vue :::

## Block mode

With `block`, the options share the available parent width, which suits toolbars with a stable number of steps.

:::demo components/Segmented/block.vue :::

## Disabled options

Set `disabled` on an individual `SegmentedItem`. The demo also shows an external state locking every option.

:::demo components/Segmented/disabled.vue :::

## Horizontal scrolling

For longer lists, combine `scrollable`, `arrow`, and `focusable`. Keep the list concise; Tabs are usually better for complex navigation.

:::demo components/Segmented/scroll.vue :::

## Controlled mode

An external control and Segmented can share the same `active-key`, keeping both surfaces synchronized.

:::demo components/Segmented/controlled.vue :::

## Sizes

The available sizes are `small`, `medium`, `large`, and `huge`.

:::demo components/Segmented/size.vue :::

## Dynamic options

Update the `SegmentedItem` list reactively to append options. Prevent duplicate requests and clear pending timers when the demo unmounts.

:::demo components/Segmented/load-more.vue :::

## Custom content

Use the item default slot to combine an icon, primary label, and supporting text. The `state` slot value indicates whether the item is active.

:::demo components/Segmented/customize.vue :::

## Icons and badges

`icon` can be combined with text and badges. When icons stand alone, the surrounding context should still explain their meaning.

:::demo components/Segmented/icon.vue :::

## Form mode

Enable `form` inside `HForm` so Segmented participates in validation and error presentation.

:::demo components/Segmented/form.vue :::
