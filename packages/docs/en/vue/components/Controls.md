## Basic Usage


:::demo vue/components/Controls/basic.vue :::

## Theme

Use `theme` to choose `light` or `dark` according to the surface underneath the controls, rather than simply mirroring the page theme.

:::demo vue/components/Controls/theme.vue :::

## Tooltip

`use-tooltip` controls explanatory labels for icon actions. Keep tooltips enabled when space is tight or actions are represented only by icons.

:::demo vue/components/Controls/tooltip.vue :::

## Disabled

Set `disabled` to lock the whole action group during loading, export, or another in-progress workflow while preserving its visual context.

:::demo vue/components/Controls/disabled.vue :::

## Automatic Adaptation

Controls decides how many actions fit in its parent and moves the remainder into an overflow menu. Change the parent width in the demo to observe the behavior.

:::demo vue/components/Controls/resize.vue :::

## Permission Filtering

Pass allowed control labels through `access-list` so only actions available to the current role render. The business security layer must still perform final authorization.

:::demo vue/components/Controls/access.vue :::
