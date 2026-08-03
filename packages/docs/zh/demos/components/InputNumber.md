## 不同尺寸

组件提供 `large`、`medium`、`small` 三种尺寸，默认使用 `medium`。根据设置步骤、常规表单或紧凑策略行的密度选择尺寸。

:::demo components/InputNumber/size.vue :::

## 不同样式

`input-style` 支持 `normal`、`emphasize`、`no-border`。外观可以与 `disabled`、`clearable` 等状态组合，切换时绑定值保持同步。

:::demo components/InputNumber/style.vue :::

## 范围与步长

通过 `min`、`max` 和 `step` 限制数值；`precision` 控制小数位，`step-strictly` 要求结果是步长的整数倍。边界与当前结果应在界面中清晰可见。

:::demo components/InputNumber/range.vue :::

## 控制器位置

`controls-position="right"` 使用紧凑的右侧控制器，`between` 将减号和加号放在两端；设置 `controls="false"` 可保留纯数字输入能力。

:::demo components/InputNumber/controls-position.vue :::

## 禁用状态

`disabled` 会阻止输入、步进和焦点操作。对于外部同步的数字，应说明锁定来源；如允许临时解锁，也要同步反馈当前状态。

:::demo components/InputNumber/disabled.vue :::

## 长按

设置 `enable-lang-press` 后，可以按住控制器连续增减。`lang-press-frequency` 控制重复频率，较短间隔适合大批量调整，但仍需保留单次点击能力。

:::demo components/InputNumber/lang-press.vue :::

## 可清空

设置 `clearable` 后，可以将可选数值恢复为空值并触发 `clear`。空值应具有明确的业务含义，例如回退到自动策略。

:::demo components/InputNumber/clearable.vue :::

## 占位文字

当绑定值为 `null` 或 `undefined` 时，`placeholder` 可说明未提供数值时采用的默认策略。占位文字不能替代字段标签。

:::demo components/InputNumber/placeholder.vue :::

## 只读

`readonly` 保留字段内容和焦点能力，但不允许编辑，同时隐藏控制器。它适合已审批但仍需查看或选择的数值。

:::demo components/InputNumber/readonly.vue :::

## 前后缀

通过 `prefix-icon`、`suffix-icon` 或 `prefix`、`suffix` 插槽补充货币、百分比、积分等单位和说明。前后缀不应掩盖字段本身的标签。

:::demo components/InputNumber/prefix-suffix.vue :::

## 组合式输入框

`prepend` 和 `append` 插槽可附加币种、单位或语义文本。插槽中的 Select 等交互控件需要独立的无障碍名称，并在窄屏保持可操作。

:::demo components/InputNumber/prepend-append.vue :::

## 数字格式化

`formatter` 决定展示字符串，`parser` 将编辑内容还原为模型可处理的数字或字符串。两者必须互相对应，避免展示格式进入业务计算。

:::demo components/InputNumber/formatter.vue :::

## 保留小数末尾零

JavaScript 数值不会保留小数末尾的零。需要展示和返回固定格式时，设置 `string-mode` 并配合 `precision`，模型即可保留例如 `1.2000` 的精确字符串。

:::demo components/InputNumber/reserve-decimal-separator.vue :::

## 动态更新精度

`precision` 可以响应式更新，适合由币种、测量标准或用户偏好决定的小数位数。数字模式和字符串模式会采用相同显示精度，但返回类型不同。

:::demo components/InputNumber/precision-update.vue :::

## 固定精度

`precision` 指定提交后保留的小数位数。整数、货币和高精度测量可以分别使用 0、2 或更多位；`step` 的小数位不应超过 `precision`。

:::demo components/InputNumber/precision.vue :::
