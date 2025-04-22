### 基本用法
:::demo ./demos/base.vue :::

### 日期模式
可以通过设置 `date-type` 为 `only-current` 来控制不展示非当月的日期
:::demo ./demos/date-type.vue :::

### 可以选择日期
:::demo ./demos/pickable.vue :::

### 设置横幅
可以通过 `pin-flags` 设置展示的横幅，用来展示一些活动
:::demo ./demos/pin-flag.vue :::

### 设置周、日的横幅
可以通过 `pin-flags` 设置展示的横幅，并可以精细化设置时间，用来展示一些活动

使用 `disableHours` 回调函数，返回给与的当天的不可用的小时区间
:::demo ./demos/pin-flag-week-day.vue :::

### 自定义头部
:::demo ./demos/custom-header.vue :::

### 自定义日期格子内容
:::demo ./demos/custom-date.vue :::
