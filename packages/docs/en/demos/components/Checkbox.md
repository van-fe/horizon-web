## Basic Usage

Use `v-model` to manage an individual checkbox. The demo exposes both the selected count and the latest change so the binding result stays visible.

:::demo components/Checkbox/basic.vue :::

## Bordered Style

Set `border` to enlarge the interactive target. Use `size` to adjust the bordered control for forms or touch-oriented settings.

:::demo components/Checkbox/border.vue :::

## Button Style

Use `h-checkbox-button` inside `h-checkbox-group` for compact multi-select filters, with one group-level `v-model` maintaining the selected values.

:::demo components/Checkbox/button.vue :::

## Indeterminate State

`indeterminate` controls only the visual state and is commonly paired with select-all logic. Keep the parent value synchronized with the number of selected children.

:::demo components/Checkbox/indeterminate.vue :::

## Checkbox Group

`h-checkbox-group` manages related choices together. Set `disabled` on the group to present inherited values that users cannot edit.

:::demo components/Checkbox/group.vue :::

## Disabled States

Disabled controls can remain unchecked, indeterminate, or checked, and can also use `border`. They preserve meaning without responding to input.

:::demo components/Checkbox/disabled.vue :::

## Invert Selection

Call the exposed `toggle()` method on each Checkbox to invert a collection. The demo shows component refs and an asynchronous bulk action.

:::demo components/Checkbox/inverse.vue :::
