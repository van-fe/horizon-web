## Basic Usage

The DatePicker provides date selection by default.

:::demo components/DatePicker/basic.vue :::

## Confirmation Mode

By default, users press Enter to confirm the value after entering a date. Set `confirm-type="blur"` to confirm when the input loses focus or when Enter is pressed.

:::demo components/DatePicker/confirm-type.vue :::

## Clearable

Set `clearable` (enabled by default) to allow users to clear the value with the clear icon.

:::demo components/DatePicker/clearable.vue :::

## Single Trigger and Panel for Range Selection

Use `single-trigger` when the trigger container has limited space. Set `is-link-panels="false"` to stop the year and month panels from being linked. On small screens, set `single-panel` to render one panel (`year-range`, `month-range`, and `date-range` only).

:::info With a single trigger, the separator must be `-`. :::

:::demo components/DatePicker/single-trigger.vue :::

## Date Display

Only dates in the current month are shown by default. Set `show-before-after-date="true"` to show adjacent dates, or `fixed-six-rows="true"` to always display six calendar rows.

:::demo components/DatePicker/date-display.vue :::

## Year and Month Pickers

Set `type` to `year`, `year-range`, `month`, or `month-range` to enable the corresponding picker.

:::demo components/DatePicker/year-month.vue :::

## Week Picker

The week picker always displays dates from the months before and after the current month. Dayjs does not parse formatted week input, so manually changing a week string has no effect.

:::demo components/DatePicker/week.vue :::

## First Day of the Week

The week starts on Sunday by default. Set `first-day-of-week` to a value from `0` (Sunday) to `6` (Saturday) to choose another first day. Changing this setting also changes the value of the week picker.

:::demo components/DatePicker/first-day-of-week.vue :::

## Disable Year Switching

Set `show-year-button="false"` to prevent users from switching years in the date picker.

:::demo components/DatePicker/show-year-button.vue :::

## Shortcuts

Configure `shortcuts` to provide quick date selections.

:::demo components/DatePicker/shortcuts.vue :::

## Date and Time Picker

Set `type` to `datetime` or `datetime-range` to enable date and time selection. Minute and second precision is available through `date-minutes`, `date-minutes-range`, `date-seconds`, and `date-seconds-range`.

:::demo components/DatePicker/datetime.vue :::

## Formatting

DatePicker uses Dayjs internally and supports all Dayjs formats, including formats provided by the `AdvancedFormat` plugin. When omitted, the format is inferred from `type` and the current locale.

See [Supported Formats](#supported-formats).

:::info When the locale changes dynamically, only the format pattern changes. Localized tokens such as `MMM` are not converted. Do not set the locale on the globally exported `dayjs` instance. :::

:::demo components/DatePicker/format.vue :::

## Value Conversion

Use `format` to control the displayed value and `value-format` to control the `model-value` format. If `value-format` is omitted, Dayjs objects are returned.

`value-format` controls both the input format and the format returned after a user selects a date or time. The input format also depends on `type` and the selected locale.

:::error A Dayjs object prints in GMT+0 by default. The system time zone is applied during conversion. :::

:::demo components/DatePicker/value-format.vue :::

## Hover Preview

Set `hover-to-display-value="true"` to display the hovered date in the input before it is selected.

:::demo components/DatePicker/hover-to-display-value.vue :::

## Disabled Dates and Times

Use `disabled-date` and `disabled-time` to prevent dates or times from being selected. The `date` passed to `disabled-time` represents the current date, so only the time portion should be considered.

:::demo components/DatePicker/disabled-date-and-time.vue :::

## Select Now

Set `show-now` to display the current-time button. Use the `showNow` slot to replace its behavior. When `default-time` is also provided, its value takes precedence.

:::demo components/DatePicker/show-now.vue :::

## Default Panel Date

Set `panel-show-date` to lock the date initially displayed by the panel.

:::demo components/DatePicker/panel-show-date.vue :::

## Time Steps

Use `time-step`, `hour-step`, `minute-step`, and `second-step` to control the corresponding time increments.

:::demo components/DatePicker/step.vue :::

## Non-editable Input

The input is editable by default. Set `inputable="false"` to prevent manual changes.

:::demo components/DatePicker/inputable.vue :::

## Readonly

Set `readonly` to prevent changes to the selected value.

:::demo components/DatePicker/readonly.vue :::

## Tooltips

Pass `show-date-tooltip`, `show-month-tooltip`, `show-year-tooltip`, or `show-time-tooltip` to display tooltips when hovering date and time cells.

:::demo components/DatePicker/show-tooltip.vue :::

## Dot Indicator

Use `show-dot` to display a dot below date cells. It is commonly combined with `show-date-tooltip`.

:::demo components/DatePicker/show-dot.vue :::

## Default Time

Provide a default time to reduce manual input and improve the selection experience.

:::demo components/DatePicker/default-time.vue :::

## Confirmation Required

Set `need-confirm` to prevent a selection from taking effect immediately.

:::demo components/DatePicker/need-confirm.vue :::

## Custom Trigger

Use the `pickerOuter` slot to customize the trigger.

:::demo components/DatePicker/custom-trigger.vue :::

## Custom Trigger Text

Use `format-trigger-text` to customize the text displayed in the trigger. It can also define the separator for a single trigger. When the input format differs from `value-format`, editing the input cannot change the selected value; a non-`-` separator is not parsed for single triggers.

:::demo components/DatePicker/format-trigger-text.vue :::

## Custom Date Cell Content

Use the `default` slot to customize date-cell content.

:::demo components/DatePicker/default-slot.vue :::

## Custom Icons

Use `prefix-icon` and `suffix-icon` to set the input icons.

:::demo components/DatePicker/custom-icon.vue :::

## Initial Value After Clearing

Set `:initial-value="null"` to assign a default `model-value` after clearing.

:::demo components/DatePicker/initial-value.vue :::

## Render Panel Content Only

Set `show-popover-content-only="true"` to render the panel without its trigger.

:::demo components/DatePicker/show-popover-content-only.vue :::

## Basic Dayjs Configuration

DatePicker uses Dayjs internally. The following configuration is global:

:::code ../../../../horizon-web/src/utils/useDayJs.ts:::

## Type Definitions

:::code ../../../../horizon-web/src/components/DatePicker/src/utils/types.ts :::

## Supported Formats

The available date formats depend on the current locale:

:::code ../../../../horizon-web/src/locales/dateFormat.json :::
