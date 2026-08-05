
## Basic Usage

Use `v-model` for the current date and `mode-switchable` to expose the views a task needs.

:::demo components/Calendar/base.vue :::

## Year View

`mode="year"` provides an annual overview. Combine it with `pickable` to choose a concrete milestone date.

:::demo components/Calendar/year.vue :::

## Current-period Dates

`date-type="only-current"` hides adjacent-month dates in month mode and can be combined with year, week, and day switching.

:::demo components/Calendar/date-type.vue :::

## Selection and Disabled Dates

`pickable` enables selection and `disable-date` blocks unavailable dates. The demo reports selection above the calendar.

:::demo components/Calendar/pickable.vue :::

## Month Pin Flags

`pin-flags` displays multi-day milestones. With creation enabled, dragging creates a temporary flag and `creat-finish-flag-callback` decides whether to discard, retain, or modify it.

:::demo components/Calendar/pin-flag.vue :::

## Week and Day Pin Flags

Timeline views use `disable-hours` for unavailable ranges and can control flag spacing or crossing disabled time.

:::demo components/Calendar/pin-flag-week-day.vue :::

## Custom Header

The `header` slot is appropriate for filters and tools directly related to the current schedule.

:::demo components/Calendar/custom-header.vue :::

## Custom Date-cell Content

`dateCellAppend` adds compact content while preserving the date title and pin-flag area. Move extra detail into a Popover when needed.

:::demo components/Calendar/custom-date.vue :::
