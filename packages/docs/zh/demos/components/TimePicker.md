## 基本用法

时间选择器支持三种尺寸、不同输入框样式以及禁用状态。绑定字符串时请同时指定 `value-format`。

:::demo components/TimePicker/basic.vue :::

## 时间范围

开启 `is-range` 可在一个选择器中维护开始与结束时间。默认联动面板会避免选择逆序范围。

:::demo components/TimePicker/is-range.vue :::

## 可清空

通过 `clearable` 控制清空入口，并监听清空与变更事件，为单值和范围选择提供即时反馈。

:::demo components/TimePicker/clearable.vue :::

## 确认方式

`confirm-type="enter"` 在按下回车时确认，`confirm-type="blur"` 在输入框失焦时确认。可根据表单节奏选择合适方式。

:::demo components/TimePicker/confirm-type.vue :::

## 禁用时间

`disabled-time` 接收当前时间，并返回是否禁用。示例将单值和范围选择都限制在 09:30–18:00。

:::demo components/TimePicker/disabled-time.vue :::

## 自定义单元格与触发文本

使用 `format-cell-text` 改写面板选项，用 `format-trigger-text` 改写输入框展示文本，适合跨日或带业务含义的时段。

:::demo components/TimePicker/format-cell-text.vue :::

## 清空后的初始值

设置 `:initial-value="null"` 后，清空操作会让绑定值回到 `null`。示例同时展示单值和范围值的类型变化。

:::demo components/TimePicker/initial-value.vue :::

## 是否允许输入

`inputable` 控制用户能否直接键入时间；关闭后仍可通过面板选择，适合必须从候选项中选取的场景。

:::demo components/TimePicker/inputable.vue :::

## 只读

`readonly` 保留完整时间展示但阻止修改，适合已审批或由系统生成的时间记录。

:::demo components/TimePicker/readonly.vue :::

## 秒级选择

使用 `type="seconds"` 展示时、分、秒三列，并通过 `second-step` 控制秒选项间隔。

:::demo components/TimePicker/seconds.vue :::

## 快捷选择当前时间

开启 `show-now` 可在面板中提供“此刻”操作。该能力同时适用于单值和范围选择。

:::demo components/TimePicker/show-now.vue :::

## 只展示面板内容

`show-popover-content-only` 会省略触发输入框，只渲染选择面板，适合嵌入设置页、抽屉或其他固定区域。

:::demo components/TimePicker/show-popover-content-only.vue :::

## 时间选项提示

`show-time-tooltip` 可针对具体时间返回提示内容。示例只为协作时段展示说明，避免每个选项都产生视觉噪声。

:::demo components/TimePicker/show-time-tooltip.vue :::

## 单触发器范围选择

`single-trigger` 使用一个输入框展示完整范围；设置 `:is-link-panels="false"` 可关闭开始与结束面板联动。

:::demo components/TimePicker/single-trigger.vue :::

## 限定候选时间范围

通过 `start-at` 和 `end-at` 缩短或扩展面板候选区间。`end-at="30"` 可将窗口延伸至次日 06:00。

:::demo components/TimePicker/start-end-range.vue :::

## 时间步长

单列模式使用 `time-step`；分钟与秒模式可分别设置 `hour-step`、`minute-step` 和 `second-step`。

:::demo components/TimePicker/step.vue :::

## 单列时间模式

设置 `type="time"` 后，组件以固定分钟间隔生成单列候选项，单值与范围选择均可使用。

:::demo components/TimePicker/time.vue :::

## 组合多个时间项

组件没有 `multiple` 属性。需要维护多个独立时间时，可在业务层渲染多个时间选择器，并自行提供新增、删除和排序逻辑。

:::demo components/TimePicker/multiple.vue :::

## 类型定义

:::code ../../../../horizon-web/src/components/TimePicker/src/utils/types.ts :::
