## 基本用法
默认情况下，是日期选择器
:::demo components/DatePicker/basic.vue :::

## 确认方式
默认情况下，用户在输入日期结束后，需要按下回车确认

也可以通过设置 `confirm-type="blur"` 控制在失焦或按下回车时都确认

:::demo components/DatePicker/confirm-type.vue :::

## 可清空
设置 `clearable`，默认开启，在有值时可以点击清空图标清空数据
:::demo components/DatePicker/clearable.vue :::

## 单个触发器、面板的范围选择
当触发器父容器空间有限，可以设置 `single-trigger`，即可只渲染单个触发器

另外，在默认情况下，切换面板的年、月会自动显示一前一后，如果希望不联动，需要设置 `is-link-panels = false`

如果屏幕尺寸较小，无法容纳两个面板，则可以设置 `single-panel` 启用单面板 (仅限 `year-range` `month-range` `date-range`)

:::info 单个触发器时，连字符只能是 <code>-</code> :::

:::demo components/DatePicker/single-trigger.vue :::

## 显示日期的方式
默认情况下，只会显示当前月的日期，如果希望显示前后日期，可以设置 `show-before-after-date = true`

如果希望始终显示 6 行日期格子，则设置 `fixed-six-rows = true`

:::demo components/DatePicker/date-display.vue :::

## 年、月选择器
设置 `type = 'year' | 'year-range' | 'month' | 'month-range'` 即可开启年、年范围、月、月范围选择器

:::demo components/DatePicker/year-month.vue :::

## 周选择器
周选择器会强制显示当前月前后的日期格子

另外 `dayjs` 不会解析周的格式化输入，所以手动更改周的字符串是无效的

:::demo components/DatePicker/week.vue :::

## 一周开始的星期
默认情况下，一周会以周日为开始星期，如果希望以其他星期开始，则设置 `first-day-of-week = 0 | 1 | 2 | 3 | 4 | 5 | 6`

需要注意的是，在修改开始星期时，对于周选择器会更改其值

:::demo components/DatePicker/first-day-of-week.vue :::

## 禁止切换年
如果不希望用户在日选择时左右切换年份，则设置 `show-year-button = false`
:::demo components/DatePicker/show-year-button.vue :::

## 快捷选择
通过配置 `shortcuts` 配置快捷选择日期功能
:::demo components/DatePicker/shortcuts.vue :::

## 日期+时间选择器
设置 `type = 'datetime' | 'datetimeRange` 即可开启日期+时间的选择器

时间列也可以精确到分和秒，即 `type = 'date-minutes' | 'date-minutes-range' | 'date-seconds' | 'date-seconds-range'`

:::demo components/DatePicker/datetime.vue :::

## 格式化
`date-picker` 内置使用 `dayjs` 作为数据处理，所以支持所有 `dayjs` 支持的格式化方案

另外也支持插件 `AdvancedFormat` 所支持的格式

如果默认不填写，则会根据 `type` 和国际化配置进行自动约束

详见 [格式化格式](#格式化格式)

:::info 在动态切换国际化时，只会影响 format 的格式，而对于一些带有国际化的关键字（例如: MMM）暂时不会做翻译转换。因为实测做转换后，旧的 DatePicker 组件会有意外的数据处理行为，所以也<b>不要给全局导出的 <code>dayjs</code> 对象设置国际化</b> :::
:::demo components/DatePicker/format.vue :::

## 值的转化
`format` 可以控制展示的格式，而如果希望 `model-value` 的格式是另一种格式，可以填入 `value-format`。如果不填写，则会返回 `Dayjs` 格式

`value-format` 不仅会作用于读入 `model-value` 时格式的设置，也会影响用户选择日期时间后的值的返回格式

如果不填写 `value-format`，`model-value` 的读入格式会根据选择器的 `type` 和国际化选择的区域有关，详见 [格式化格式](#格式化格式)

:::error 注意！<code>Dayjs</code> 对象直接打印时，时区默认是格林威治时间（GMT+0)，<b>在做转化时才会根据系统所在地理位置处理时区</b>:::

:::demo components/DatePicker/value-format.vue :::

## 悬浮预览日期
如果希望在鼠标悬浮时，就将悬浮的日期提前显示到输入框中，则可以设置 `hover-to-display-value = true`
:::demo components/DatePicker/hover-to-display-value.vue :::

## 设置禁选
可以通过传入 `disabled-date` `disabled-time` 来控制日期或时间是否不可被选择

需要注意一点：**`disabled-time`给予的 date 是当前日期，所以需要忽略年月日，只考虑时分秒的禁用**
:::demo components/DatePicker/disabled-date-and-time.vue :::

## 快捷选择此刻
设置 `show-now`，即可在面板中显示【此刻】按钮

如果希望此刻是另外的功能，则传入 `showNow` 插槽来自定义

如果额外设置了 `default-time`，则优先使用 `default-time` 所设置的值

:::demo components/DatePicker/show-now.vue :::

## 默认面板日期
设置 `panel-show-date` 即可将面板的默认展示日期锁定
:::demo components/DatePicker/panel-show-date.vue :::

## 时间步长
设置 `time-step` `hour-step` `minute-step` `second-step`，可以控制相应时间的步长
:::demo components/DatePicker/step.vue :::

## 不可输入
默认配置下，允许用户手动修改输入框中的数值来进行时间的切换。如果不希望用户手动输入，则可以配置 `inputable = false`
:::demo components/DatePicker/inputable.vue :::

## 只读
不允许修改已选值的情况下，可以设置 `readonly`
:::demo components/DatePicker/readonly.vue :::

## 显示文字提示
如果对日期、时间格子在悬浮时需要显示提示文字，则传入 `show-date-tooltip`、`show-month-tooltip`、`show-year-tooltip` 或 `show-time-tooltip`
:::demo components/DatePicker/show-tooltip.vue :::

## 标定圆点
设置 `show-dot`，可以配置格子是否有原点标注，通常可以和 `show-date-tooltip` 结合使用
:::demo components/DatePicker/show-dot.vue :::

## 默认时间
在选择日期时，如果有对时间期望，则可以给定一个默认的时间，减少用户手动选择的复杂，提升交互效率
:::demo components/DatePicker/default-time.vue :::

## 需要确认
如果需要用户在选择之后不是立刻生效，则可以设置 `need-confirm` 拦截
:::demo components/DatePicker/need-confirm.vue :::

## 自定义触发器
使用 `pickerOuter` 插槽，可以自定义触发器
:::demo components/DatePicker/custom-trigger.vue :::

## 自定义触发器文案
使用 `format-trigger-text` 可以自定义触发器中展示的文案

对于单个触发器，可以使用此方法自定义展示分隔符

使用了 `format-trigger-text` 时，如果输入的值和 `value-format` 不一致的话，是无法通过修改输入框内容改变选值

且对于单个触发器，如果分隔符不是 `-`，也不会对用户输入行为进行解析

:::demo components/DatePicker/format-trigger-text.vue :::

## 自定义日期格子内容
使用 `default` 插槽，可以自定义日期格子的内容
:::demo components/DatePicker/default-slot.vue :::

## 自定义图标
使用 `prefix-icon` `suffix-icon` 设置前后缀图标
:::demo components/DatePicker/custom-icon.vue :::

## 清空后默认值
可以配置 `:initial-value="null"` 用于在清空后给 `model-value` 附默认值
:::demo components/DatePicker/initial-value.vue :::

## 只展示面板内容
如果不希望显示触发器，直接渲染面板，可以设置 `show-popover-content-only = true`
:::demo components/DatePicker/show-popover-content-only.vue :::

## Dayjs 基础配置
组件内置使用 `dayjs`，以下是基础配置（全局通用）：
:::code ../../../../horizon-web/src/utils/useDayJs.ts:::

## 类型定义
:::code ../../../../horizon-web/src/components/DatePicker/src/utils/types.ts :::

## 格式化格式
根据当前的国际化配置，会有相应不同的日期格式展示形式
:::code ../../../../horizon-web/src/locales/dateFormat.json :::
