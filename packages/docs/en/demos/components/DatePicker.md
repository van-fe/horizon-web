## Input Box Style

Basic date selection control, you can configure the input box style by setting the `inputStyle` attribute.

:::demo components/DatePicker/demo16.vue :::

## Basic Usage

Basic date selection control, you can configure shortcut options by setting the `shortcuts` attribute, configure whether to show or hide the year button by setting the `show-year-button` attribute (shown by default), and customize the sorting from Monday to Sunday through `first-day-of-week`.

:::demo components/DatePicker/demo1.vue :::

## Other Date Units

By extending the base component, you can configure year and month selection by setting the `type` attribute.

:::demo components/DatePicker/demo13.vue :::

## Date Time

You can set 3 types of modes by setting the `type` attribute: `datetime, dateminutes, dateseconds`.

The `pickerOptions` attribute can set the start, end and interval of date and time, only valid when `type` is `datetime, dateminutes, dateseconds`.

:::demo components/DatePicker/demo2.vue :::

## Date Range

You can set 3 types of modes by setting the `type` attribute: `daterange, monthrange, yearrange`.

Date range can also be selected using single month mode, just set `type=daterange,panelNumber=1`.

When selecting month range, the two panels are linked by default. Set `unlink-panels=true` to unlink the two panels

:::demo components/DatePicker/demo14.vue :::

## Date Time Range

You can set 3 types of modes by setting the `type` attribute: `datetimerange, dateminutesrange, datesecondsrange`.
You can set the default start and end time of the date through `defaultTime`. If not set, the default selection starts from 00:00:00.

:::demo components/DatePicker/demo15.vue :::

## Custom Date Panel Display

You can set whether to display the previous and next months and whether to fix 6 rows by setting the `showBeforeAfterDate` and `fixedSixRows` attributes.

By default, the previous and next month dates are not displayed, and the date rows are not fixed.

:::demo components/DatePicker/demo3.vue :::

## Custom Type Component

The trigger defaults to an input box. For other types, you can combine them yourself through the `reference` slot.

You can embed different types of date panels into the page by setting `show-embed=true` combined with type; the `showHeader` attribute can set whether to display the year and month switching operation buttons; displayed by default, switch the date year and month by calling the component's `changeYear` and `changeMonth` methods. Note: The lower version `type='panel'` will be deprecated in later major versions, and it is not recommended to use it anymore.

:::demo components/DatePicker/demo4.vue :::

## Custom Cell

You can customize the display of the current cell through the default slot `default`.

:::demo components/DatePicker/demo5.vue :::
The slot value type is as follows

```ts
interface DateGridType {
  $date: Dayjs;
  date: Date;
  text: number|string|undefined;
  isToday: boolean;
  isNotCurrent?: boolean;
  isCurrent: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isBegin?: boolean;
  isEnd?: boolean;
  isRange?: boolean;
  isCurrentLastDate?: boolean;
  isDot?: boolean;
}
```

## Date Time Disabled Selection

You can set disabled date and time selection by setting the `disabledDate` and `disabledTime` attributes. `disabledSwitchButton` can be used with `disabledDate` to set whether to hide the disabled dates, that is, the month and year buttons cannot be clicked to switch to select disabled months. Note: The `pick` event and when `type="datetime/dateminutes/dateseconds"`, the `disabledTime` method adds three new parameters `years, months, date`. The old parameters `year,month,day` are still retained and will be deprecated in later major versions. It is strongly recommended to use `years, months, date`


:::demo components/DatePicker/demo6.vue :::

## Date Time Tooltip

You can set date and time tooltips by setting the `showDateTooltip` and `showTimeTooltip` attributes.

:::demo components/DatePicker/demo7.vue :::

## Bottom Extension Area

The component provides 4 functional buttons by default: today/now, cancel, confirm. You can customize the number and functions of buttons through the `footer` slot.

Set whether the bottom operation area is displayed through the `footerButton` attribute. Controls with time selection are displayed by default.

:::demo components/DatePicker/demo8.vue :::

## Date Format

You can set the display format of the input box through `format`, and set the format of the bound value through `value-format`. By default, the component accepts and returns Date objects.

:::demo components/DatePicker/demo9.vue :::

## Custom Prefix and Suffix Content

You can set the icons of the input box through `prefixIcon` and `suffixIcon`, and you can also set prefix and suffix content through slots `prefix` and `suffix`.

:::demo components/DatePicker/demo10.vue :::

## Default Panel Date and Default Time

You can set the default panel date when the picker opens through `defaultPickerValue`; set the default specific time after the picker selects a date through `defaultTime`. If not set, the default time starts from 00:00:00.

:::demo components/DatePicker/demo11.vue :::

## Insufficient Space
When the space at the display position is insufficient, when all directions cannot be satisfied, you can prevent the popover from being cut off through `preventOverflow`

You can adjust the flip position by setting fallbackPlacements. For example, if the top and bottom positions are not enough to display and you want to display on the left, you can set fallbackPlacements to ['top', 'bottom', 'left']

:::demo components/DatePicker/demo17.vue :::

## DatePicker Supported Date Formats
By default, the component accepts and returns Date objects. The following are available format strings. You can also refer to [Dayjs](https://day.js.org/docs/en/display/format#list-of-all-available-formats). Note: `Format` symbols: Both year `Y` and `y` are supported, and both day `D` and `d` are supported. `y` and `d` will be deprecated in later major versions. It is strongly recommended to use `dayjs` format
Taking UTC August 7, 2014 06:07:08 as an example:

| Format        | Type  | Description           | Example            |
|-----------|-----|--------------|---------------|
| YYYY      | Year   |              | 2014          |
| M         | Month   | No padding          | 8             |
| MM        | Month   |              | 08            |
| D         | Day   | No padding          | 7             |
| DD        | Day   |              | 07            |
| H         | Hour  | 24-hour format; no padding    | 6             |
| HH        | Hour  | 24-hour format        | 06            |
| m         | Minute  | No padding          | 7             |
| mm        | Minute  |              | 07            |
| s         | Second   | No padding          | 8             |
| ss        | Second   |              | 08            |
| timestamp | Timestamp (milliseconds) | Formatted as number type | 1407362828000 |
| X | Timestamp (seconds) | Formatted as number type | 1407362828 |

## DatePicker Default Conversion Format

| Type                    | Default Value                   |
|-----------------------|-----------------------|
| date/daterange        | 'YYYY/MM/DD'          |
| datetime/dateminutes  | 'YYYY/MM/DD HH:mm'    |
| dateseconds           | 'YYYY/MM/DD HH:mm:ss' |
