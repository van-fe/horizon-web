## Basic Usage

Controls commonly works with `h-hover` and `h-mask` to present contextual actions over content. The `command` event returns the selected `h-control` label.

:::demo components/Controls/basic.vue :::

## Theme

Use `theme` to choose `light` or `dark` according to the surface underneath the controls, rather than simply mirroring the page theme.

:::demo components/Controls/theme.vue :::

## Tooltip

`use-tooltip` controls explanatory labels for icon actions. Keep tooltips enabled when space is tight or actions are represented only by icons.

:::demo components/Controls/tooltip.vue :::

## Disabled

Set `disabled` to lock the whole action group during loading, export, or another in-progress workflow while preserving its visual context.

:::demo components/Controls/disabled.vue :::

## Automatic Adaptation

Controls decides how many actions fit in its parent and moves the remainder into an overflow menu. Change the parent width in the demo to observe the behavior.

:::demo components/Controls/resize.vue :::

## Permission Filtering

Pass allowed control labels through `access-list` so only actions available to the current role render. The business security layer must still perform final authorization.

:::demo components/Controls/access.vue :::
