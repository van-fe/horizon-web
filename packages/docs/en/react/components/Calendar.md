# Calendar

Calendar presents schedules in year, month, week, and day views. It supports date selection, disabled periods, schedule flags, pointer creation, custom regions, and controlled or uncontrolled state.

## Basic usage

Use `value` and `mode` for controlled state, or `defaultValue` and `defaultMode` for local state. The view selector can expose any combination of the four views.

:::react-demo react/components/Calendar/base.tsx :::

## Year view

The year view provides a compact annual overview and supports custom month headings and date selection.

:::react-demo react/components/Calendar/year.tsx :::

## Current-period dates

`dateType` controls whether the month grid keeps a complete six-row layout or only the natural current period.

:::react-demo react/components/Calendar/date-type.tsx :::

## Selection and disabled dates

Enable `pickable` to select dates. `disabledDate` prevents unavailable cells from being selected.

:::react-demo react/components/Calendar/pickable.tsx :::

## Month schedule flags

`pinFlags` renders dated milestones. Use `onPinFlagClick` for interactive flags and `onPinFlagsChange` to accept schedule updates.

:::react-demo react/components/Calendar/pin-flag.tsx :::

## Week and day schedules

Timeline views display hourly schedules. Pointer dragging can create a proposal through `onCreatePinFlag`, while `disabledHours` describes unavailable periods.

:::react-demo react/components/Calendar/pin-flag-week-day.tsx :::

## Custom header

`renderHeader` adds schedule-specific tools. A `CalendarHandle` ref exposes navigation commands without reaching into the DOM.

:::react-demo react/components/Calendar/custom-header.tsx :::

## Custom date content

Use date renderers for concise content that belongs inside a cell. Each renderer receives the date, current view, selected state, current-period state, and disabled state.

:::react-demo react/components/Calendar/custom-date.tsx :::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `CalendarValue` | current date | Controlled date or initial local date. |
| `mode` / `defaultMode` | `CalendarMode` | `'month'` | Controlled view or initial local view. |
| `modeSwitchable` | `boolean` | `false` | Shows the view selector. |
| `modeSwitchableList` | `readonly CalendarMode[]` | `['year','month','week']` | Available views. |
| `dateType` | `'full' \| 'only-current'` | `'full'` | Month-grid filler policy. |
| `hourFormat` | `'12' \| '24'` | `'12'` | Timeline hour labels. |
| `defaultStartHour` | `number` | `8` | Initial timeline scroll hour. |
| `pickable` | `boolean` | `false` | Enables date selection. |
| `disabledDate` | `(date: Date) => boolean` | — | Disables a date. |
| `disabledHours` | `(date: Date) => readonly [Date, Date][]` | — | Describes unavailable time ranges. |
| `pinFlags` / `defaultPinFlags` | `readonly CalendarPinFlag<ReactNode>[]` | `[]` | Controlled schedules or initial local schedules. |
| `pinFlagsShowTime` | `boolean` | `false` | Shows a flag time label. |
| `enableCreatePinFlags` | `boolean` | `false` | Enables pointer creation in timeline views. |
| `autoFit` | `boolean` | `false` | Fills the available block size. |
| `currentTimeLine` | `boolean` | `true` | Shows the current-time marker. |

## Callbacks and renderers

`onValueChange(date, details)`, `onModeChange(mode)`, `onPinFlagsChange(flags)`, `onPinFlagClick(flag)`, and `onCreatePinFlag(flag)` report user proposals. Date regions are customized with `renderDateCell`, `renderDateCellTitle`, `renderDateCellAppend`, `renderMonthHeader`, `renderWeekDayHeader`, `renderDayHeader`, `renderTimezone`, and `renderHeader`.

## Ref and accessibility

`CalendarHandle` exposes `element`, `previous()`, `next()`, `today()`, `setDate(value)`, and `setMode(mode)`. Month and year dates use grid semantics, selectable cells expose `aria-selected`, disabled dates expose `aria-disabled`, and header controls remain native buttons and select elements. `HorizonWebProvider.calendarLabels` customizes accessible control labels.
