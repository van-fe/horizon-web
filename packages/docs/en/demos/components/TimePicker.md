## Basic usage


:::demo components/TimePicker/basic.vue :::

## Time range

Enable `is-range` to maintain a start and end time in one picker. Linked panels prevent an inverted range by default.

:::demo components/TimePicker/is-range.vue :::

## Clearable values

Use `clearable` to control the clear action, and handle clear and change events to provide immediate feedback for single and range values.

:::demo components/TimePicker/clearable.vue :::

## Confirmation behavior

`confirm-type="enter"` confirms on Enter, while `confirm-type="blur"` confirms when the input loses focus. Choose the behavior that matches the form workflow.

:::demo components/TimePicker/confirm-type.vue :::

## Disabled times

`disabled-time` receives the current time and returns whether it is unavailable. The example constrains both single and range pickers to 09:30–18:00.

:::demo components/TimePicker/disabled-time.vue :::

## Custom cell and trigger text

Use `format-cell-text` for panel options and `format-trigger-text` for the value displayed in the input, such as business periods that extend past midnight.

:::demo components/TimePicker/format-cell-text.vue :::

## Initial value after clearing

With `:initial-value="null"`, clearing returns the bound value to `null`. The example exposes the value type for both single and range pickers.

:::demo components/TimePicker/initial-value.vue :::

## Direct input

`inputable` controls whether users can type a time directly. Turn it off when values must be chosen from the panel options.

:::demo components/TimePicker/inputable.vue :::

## Read-only values

`readonly` preserves the complete time display while preventing edits, which suits approved or system-generated records.

:::demo components/TimePicker/readonly.vue :::

## Seconds

Use `type="seconds"` to display hour, minute, and second columns, and control the second interval with `second-step`.

:::demo components/TimePicker/seconds.vue :::

## Select the current time

Enable `show-now` to add a “now” action to the panel. It is available for both single and range selection.

:::demo components/TimePicker/show-now.vue :::

## Panel content only

`show-popover-content-only` omits the trigger input and renders only the selection panel, making it suitable for settings pages, drawers, and other fixed regions.

:::demo components/TimePicker/show-popover-content-only.vue :::

## Tooltips for time options

`show-time-tooltip` can return contextual help for individual options. The example only annotates collaboration hours to avoid unnecessary visual noise.

:::demo components/TimePicker/show-time-tooltip.vue :::

## Range with a single trigger

`single-trigger` displays the complete range in one input. Set `:is-link-panels="false"` when the start and end panels should move independently.

:::demo components/TimePicker/single-trigger.vue :::

## Candidate time range

Use `start-at` and `end-at` to shorten or extend the candidate interval. `end-at="30"` extends the window to 06:00 on the following day.

:::demo components/TimePicker/start-end-range.vue :::

## Time steps

Single-column mode uses `time-step`. Minute and second modes can set `hour-step`, `minute-step`, and `second-step` independently.

:::demo components/TimePicker/step.vue :::

## Single-column time mode

With `type="time"`, the component generates one column of options at a fixed minute interval for both single and range selection.

:::demo components/TimePicker/time.vue :::

## Compose multiple time entries

The component does not provide a `multiple` prop. To manage independent times, render multiple picker instances at the application layer and own the add, remove, and ordering behavior there.

:::demo components/TimePicker/multiple.vue :::

## Type definitions

:::code ../../../../horizon-web/src/components/TimePicker/src/utils/types.ts :::
