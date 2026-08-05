Calendar 用于查看和规划年、月、周、日维度的信息。复杂日程应将控件、当前状态与日历预览清晰分区。

## 基础用法

使用 `v-model` 控制当前日期，并通过 `mode-switchable` 开放需要的视图。

:::demo components/Calendar/base.vue :::

## 年视图

`mode="year"` 展示全年概览；结合 `pickable` 可选择具体里程碑日期。

:::demo components/Calendar/year.vue :::

## 当前周期日期

`date-type="only-current"` 在月视图中隐藏相邻月份日期，并可与年、周、日模式切换组合。

:::demo components/Calendar/date-type.vue :::

## 日期选择与禁用

`pickable` 开启选择，`disable-date` 可屏蔽不可选日期。示例将选择结果直接显示在日历上方。

:::demo components/Calendar/pickable.vue :::

## 月视图横幅

`pin-flags` 展示跨日里程碑；启用创建后可拖动生成临时横幅，并由 `creat-finish-flag-callback` 决定丢弃、保留或修改。

:::demo components/Calendar/pin-flag.vue :::

## 周、日视图横幅

在时间轴中可通过 `disable-hours` 屏蔽时间区间，并控制横幅间距及是否允许跨越禁用时段。

:::demo components/Calendar/pin-flag-week-day.vue :::

## 自定义头部

`header` 插槽适合放置与当前日程直接相关的筛选或工具。

:::demo components/Calendar/custom-header.vue :::

## 自定义日期格内容

`dateCellAppend` 在保留日期标题和横幅区域的同时追加紧凑内容；更多信息可按需放入 Popover。

:::demo components/Calendar/custom-date.vue :::
