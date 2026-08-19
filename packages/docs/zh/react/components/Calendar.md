# Calendar 日历

Calendar 通过年、月、周、日四种视图展示日程，支持日期选择、禁用时段、日程横幅、拖拽创建、自定义区域以及受控或非受控状态。

## 基础用法

使用 `value` 与 `mode` 管理受控状态，或使用 `defaultValue` 与 `defaultMode` 保留本地状态。视图切换器可以展示任意组合。

:::react-demo react/components/Calendar/base.tsx :::

## 年视图

年视图提供紧凑的全年概览，并支持自定义月份标题和日期选择。

:::react-demo react/components/Calendar/year.tsx :::

## 当前周期日期

`dateType` 控制月视图使用完整六行布局，还是只展示自然覆盖的当前周期。

:::react-demo react/components/Calendar/date-type.tsx :::

## 选择与禁用日期

开启 `pickable` 后可以选择日期，`disabledDate` 用于阻止不可用日期被选择。

:::react-demo react/components/Calendar/pickable.tsx :::

## 月视图日程横幅

`pinFlags` 展示带日期范围的里程碑；`onPinFlagClick` 处理可点击横幅，`onPinFlagsChange` 接收日程更新提案。

:::react-demo react/components/Calendar/pin-flag.tsx :::

## 周与日日程

时间轴视图展示小时日程。拖拽通过 `onCreatePinFlag` 提交创建提案，`disabledHours` 描述不可用时间段。

:::react-demo react/components/Calendar/pin-flag-week-day.tsx :::

## 自定义头部

`renderHeader` 用于加入与当前日程直接相关的工具；`CalendarHandle` 可执行导航命令。

:::react-demo react/components/Calendar/custom-header.tsx :::

## 自定义日期内容

日期 renderer 会收到日期、当前视图、选中状态、是否属于当前周期以及禁用状态。

:::react-demo react/components/Calendar/custom-date.tsx :::

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `CalendarValue` | 当前日期 | 受控日期或本地初始日期。 |
| `mode` / `defaultMode` | `CalendarMode` | `'month'` | 受控视图或本地初始视图。 |
| `modeSwitchable` | `boolean` | `false` | 是否展示视图切换器。 |
| `modeSwitchableList` | `readonly CalendarMode[]` | `['year','month','week']` | 可用视图。 |
| `dateType` | `'full' \| 'only-current'` | `'full'` | 月视图日期填充策略。 |
| `hourFormat` | `'12' \| '24'` | `'12'` | 时间轴小时格式。 |
| `defaultStartHour` | `number` | `8` | 时间轴初始滚动小时。 |
| `pickable` | `boolean` | `false` | 是否允许选择日期。 |
| `disabledDate` | `(date: Date) => boolean` | — | 禁用指定日期。 |
| `disabledHours` | `(date: Date) => readonly [Date, Date][]` | — | 描述不可用时间范围。 |
| `pinFlags` / `defaultPinFlags` | `readonly CalendarPinFlag<ReactNode>[]` | `[]` | 受控日程或本地初始日程。 |
| `pinFlagsShowTime` | `boolean` | `false` | 是否展示横幅时间。 |
| `enableCreatePinFlags` | `boolean` | `false` | 是否允许在时间轴拖拽创建日程。 |
| `autoFit` | `boolean` | `false` | 是否填满可用块尺寸。 |
| `currentTimeLine` | `boolean` | `true` | 是否展示当前时间线。 |

## 回调与渲染区域

`onValueChange(date, details)`、`onModeChange(mode)`、`onPinFlagsChange(flags)`、`onPinFlagClick(flag)` 和 `onCreatePinFlag(flag)` 用于接收用户提案。日期区域通过 `renderDateCell`、`renderDateCellTitle`、`renderDateCellAppend`、`renderMonthHeader`、`renderWeekDayHeader`、`renderDayHeader`、`renderTimezone` 与 `renderHeader` 自定义。

## Ref 与无障碍

`CalendarHandle` 暴露 `element`、`previous()`、`next()`、`today()`、`setDate(value)` 和 `setMode(mode)`。月与年日期使用 grid 语义，选择和禁用状态通过 ARIA 暴露，头部操作使用原生按钮与选择框。`HorizonWebProvider.calendarLabels` 可自定义无障碍标签。
