### 基本用法
默认情况下，是 **时+分** 的选择器
:::demo ./demos/basic.vue :::

### 范围选择
设置 `is-range`，可以开启范围选择器
:::demo ./demos/is-range.vue :::

### 可清空
设置 `clearable`，默认开启，在有值时可以点击清空图标清空数据
:::demo ./demos/clearable.vue :::

### 单个触发器的范围选择
当触发器父容器空间有限，可以设置 `single-trigger`，即可只渲染单个触发器

另外，在默认情况下，如果选择了开始或结束时间，则时间选择器中会自动将开始或结束时间之前或之后的时间禁用，如果需要解除联动，则设置 `is-link-panels = false`

:::demo ./demos/single-trigger.vue :::

### 简单使用
设置 `type = 'time'` 即可开启简单时间选择器
:::demo ./demos/time.vue :::

### 设置秒
设置 `type = 'seconds'` 即可开启精确到秒的选择器
:::demo ./demos/seconds.vue :::

### 确认方式
默认情况下，用户在输入时间结束后，需要按下回车确认

也可以通过设置 `confirm-type="blur"` 控制在失焦或按下回车时都确认

:::demo ./demos/confirm-type.vue :::

### 设置禁选
可以通过传入 `disabled-time` 来控制时间是否不可被选择
:::demo ./demos/disabled-time.vue :::

### 快捷选择此刻
设置 `show-now`，即可在面板中显示【此刻】按钮
:::demo ./demos/show-now.vue :::

### 时间步长
设置 `time-step` `hour-step` `minute-step` `second-step`，可以控制相应时间的步长
:::demo ./demos/step.vue :::

### 不可输入
默认配置下，允许用户手动修改输入框中的数值来进行时间的切换。如果不希望用户手动输入，则可以配置 `inputable = false`
:::demo ./demos/inputable.vue :::

### 只读
不允许修改已选值的情况下，可以设置 `readonly`
:::demo ./demos/readonly.vue :::

### 限定的开始和结束时间
默认配置中，时间开始结束是 `[0 ~ 24)` (左开右闭区间)，如果需要扩增或缩减时间范围，需要设置 `start-at` 和 `end-at`
:::demo ./demos/start-end-range.vue :::

### 自定义文案
如果需要对每个日期格子自定义文案，可以设置 `format-cell-text` 和
:::demo ./demos/format-cell-text.vue :::

### 显示文字提示
如果对时间格子在悬浮时需要显示提示文字，则传入 `show-time-tooltip`
:::demo ./demos/show-time-tooltip.vue :::

### 清空后默认值
可以配置 `:initial-value="null"` 用于在清空后给 `model-value` 附默认值
:::demo ./demos/initial-value.vue :::

### 只展示面板内容
如果不希望显示触发器，直接渲染面板，可以设置 `show-popover-content-only = true`
:::demo ./demos/show-popover-content-only.vue :::

### 类型定义
:::code ../../../../lego/src/components/TimePicker/src/utils/types.ts :::
