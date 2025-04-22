### 输入框样式

基本的时间选择控件，可以通过设置 `inputStyle` 属性来配置输入框样式。

:::demo ./demos/demo8.vue :::

### 单列、双列和三列模式
可以通过设置 `type` 属性来设置时间选择的模式，例如：`time`、`minutes`和`seconds`分别设置单列、双列和三列模式。
:::demo ./demos/demo1.vue :::

### 时间范围
通过设置 `is-range` 属性来设置时间范围选择。
:::demo ./demos/demo7.vue :::

### 时间禁选
通过设置 `disabledTime` 属性来设置时间控件的禁选。
:::demo ./demos/demo2.vue :::

### 自定义时间间隔
`pickerOptions`属性可以自定义设置时间控件的开始、结束和间隔，注：自定义时间单元格不支持重复。
:::demo ./demos/demo3.vue :::

### 自定义前缀、后缀内容
通过`prefixIcon`、`suffixIcon`可以输入框的图标，也可以通过插槽`prefix`、`suffix`设置前缀、后缀内容。
:::demo ./demos/demo4.vue :::

### 底部扩展区
组件默认提供取消、确认2种功能按钮。可通过插槽`footer`自定义按钮数量和功能。
:::demo ./demos/demo5.vue :::

### 自定义时间元素文案
通过属性`formatTriggerText`自定义触发器中显示文案，通过属性`formatCellText`自定义时间元素每一项文案。
:::demo ./demos/demo6.vue :::

### 空间不够
当显示位置的空间不够时，当所有方向没法满足时候可以通过 `preventOverflow` 阻止popover被切断

可以通过设置fallbackPlacements来调整flip的位置，比如上下位置都不够展示，希望能够展示到左边，可以设置fallbackPlacements为 ['top', 'bottom', 'left']

:::demo ./demos/demo9.vue :::
