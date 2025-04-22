### 不同尺寸
提供 `large`、`medium`、`small`三个尺寸，默认为 `medium`。
:::demo ./demos/size.vue :::

### 不同样式
提供了 `normal`  `emphasize` `no-border` 三种样式，默认为 `normal`。
:::demo ./demos/style.vue :::

### 带有步长和最大最小值的输入框
通过设置`step`和`min`, `max`可限制输入项。 

:::demo ./demos/range.vue :::

### 控制器位置、隐藏控制器
某些业务场景下，控制器位置需要变为两侧

在不需要使用控制器、仅需要过滤功能时可以设置 `controls = false`
:::demo ./demos/controls-position.vue :::

### 禁用状态
:::demo ./demos/disabled.vue :::

### 长按
在某些场景下，允许长按控制器以增加/减少值
:::demo ./demos/lang-press.vue :::

### 清空
inputNumber 允许清空
::: demo ./demos/clearable.vue :::

### 占位文字
::: demo ./demos/placeholder.vue :::

### 只读
设置了 `readonly` 后，也不显示 `controls`
::: demo ./demos/readonly.vue :::

### 前后缀
可以配置前后缀
::: demo ./demos/prefix-suffix.vue :::

### 组合式输入框
可以通过 `slots.prepend` `slots.append` 设置前后组合插槽
::: demo ./demos/prepend-append.vue :::

### 数字转化
通过 `formatter` 将数字转化为你需要的格式，然后通过 `parser` 将格式化后的字符串转化为可以处理的数字
:::demo ./demos/formatter.vue :::

### 补零
`2.4.6` 开始，如果需要补零，则需要设置 `string-mode = true`
:::demo ./demos/reserve-decimal-separator.vue :::

### 精度更新
`2.4.7` 开始，可以监听精度的更新

:::demo ./demos/precision-update.vue :::
