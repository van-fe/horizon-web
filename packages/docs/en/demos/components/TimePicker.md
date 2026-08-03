## Input Box Style

Basic time selection control, you can configure the input box style by setting the `inputStyle` attribute.

:::demo components/TimePicker/basic.vue :::

## Single Column, Double Column and Triple Column Modes
You can set the time selection mode by setting the `type` attribute, for example: `time`, `minutes` and `seconds` set single column, double column and triple column modes respectively.
:::demo components/TimePicker/time.vue :::

## Time Range
Set time range selection by setting the `is-range` attribute.
:::demo components/TimePicker/is-range.vue :::

## Time Disabled Selection
Set the disabled selection of the time control by setting the `disabledTime` attribute.
:::demo components/TimePicker/disabled-time.vue :::

## Custom Time Interval
The `pickerOptions` attribute can custom set the start, end and interval of the time control. Note: Custom time cells do not support repetition.
:::demo components/TimePicker/step.vue :::

## Custom Prefix and Suffix Content
You can set the icons of the input box through `prefixIcon` and `suffixIcon`, and you can also set prefix and suffix content through slots `prefix` and `suffix`.
:::demo components/TimePicker/basic.vue :::

## Bottom Extension Area
The component provides 2 functional buttons by default: cancel and confirm. You can customize the number and functions of buttons through the `footer` slot.
:::demo components/TimePicker/confirm-type.vue :::

## Custom Time Element Text
Customize the text displayed in the trigger through the `formatTriggerText` attribute, and customize the text of each time element through the `formatCellText` attribute.
:::demo components/TimePicker/format-cell-text.vue :::

## Insufficient Space
When the space at the display position is insufficient, when all directions cannot be satisfied, you can prevent the popover from being cut off through `preventOverflow`

You can adjust the flip position by setting fallbackPlacements. For example, if the top and bottom positions are not enough to display and you want to display on the left, you can set fallbackPlacements to ['top', 'bottom', 'left']

:::demo components/TimePicker/show-popover-content-only.vue :::
