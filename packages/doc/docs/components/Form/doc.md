### 基础表单
在 `n-form-item` 的 `label` 属性上设置表单项的标签，默认情况下，标签展示在上方。
:::demo ./demos/basic.vue :::

### 大小
可以通过 `n-form` 控制组件大小

`size` 可以覆盖通过 `n-application` 设置的 `size`
:::demo ./demos/size.vue :::

### 提示帮助
一般在表单尾部可以设置一个 `popover` 提示，只需要给 `form-item` 配置一个 `helper` 即可

提示帮助默认放在表单的最右侧(`'right'`)，你也可以给 `helper-placement` 传入 `'after-label'` `'before-label'` 控制位置
:::demo ./demos/tips-helper.vue :::

### 标签配置
你可以通过 `label-position` 控制标签的位置，当标签位于左侧时，还可以通过 `label-justify-align` 控制标签的水平对齐方式，`label-vertical-align` 控制标签的垂直对齐方式。
:::demo ./demos/label-position.vue :::

### 行内表单
如果表单项数量较少，且都是 `n-input` 这样高度较小的简单组件，可以通过设置 `inline` 为 `true` 启用行内表单。
:::demo ./demos/inline.vue :::

### 添加验证规则
你可以给表单添加验证规则，以判断表单项的绑定值是否符合预期。  
首先给 `n-form` 组件设置 `model` 属性，这是整个表单域中所有绑定字段的集合。  
然后给需要校验的的 `n-form-item` 添加 `prop` 属性，它应该是 `model` 中的字段名，并给 `rules` 属性传入验证规则。详细用法参见 [async-validator#rules](https://github.com/yiminghe/async-validator#rules)。
:::demo ./demos/validate.vue :::

### 验证后清空验证结果
验证某个表单后，如果想清空验证结果，可以对 `n-form` 使用 `clearValidate` 去清空验证结果，也可以针对 `n-form-item` 使用`clearValidate` 去清空验证结果

:::demo ./demos/clear-validate.vue :::

### 配合验证状态控制提交按钮
可以通过监听 `validate` 来控制提交按钮是否可以点击
:::demo ./demos/validate-with-submit.vue :::

### 动态增减表单项
对于动态表单，重点是 `prop` 和 `rule` 的定义
:::demo ./demos/dynamic-change-item-amount.vue :::

### 触发验证的方式
可以通过配置 `validateTrigger` 来做到在表单元素触发某种事件时才进行验证：

- `change`: 在触发 `update:modelValue` 时验证（默认）
- `blur`: 在表单组件失焦时验证

目前支持的组件有：
- Cascader
- Checkbox
- ColorPicker
- DatePicker
- Input
- InputNumber
- Radio
- Rate
- Select
- Slider
- Switch
- Tabs
- TimePicker
- Transfer
- TreeSelect
- Upload（不包括 UploadArea）

:::demo ./demos/validate-trigger.vue :::

### 只做显示组件
在结合一些表单组件使用时（例如 `formily`），有自己的验证规则，此时就不需要 `n-form` 做验证，所以可以配置 `only-render` 来设定是否只作为渲染组件

当设置 `form.only-render` 为 `true` 且 `form-item.error` 有变化时，会立刻根据 `form-item.error` 是否为空而标注表单元素为错误状态

需要注意的是，此时 `emit.validateChange` 不会触发

:::demo ./demos/only-render.vue :::

### 使用自定义表单组件
如果使用了 `lego` 外的表单组件，但也需要用到 `n-form` `n-form-item` 的验证功能，直接使用提供的 `provide` 值来做即可

只需要 `inject('NFormItemTriggerInjectedKey')`，在表单有 `change` 或 `blur` 事件时调用即可

:::demo ./demos/custom-form.vue :::

### 内置的 required 验证

默认使用国际化配置展示必填信息

**因为国际化字符串会传给 `async-validator` 方法中，所以无法做到动态变更**

:::demo ./demos/build-in-required.vue :::

### 全局 disabled
配置 disabled 即可禁用 form 中的表单元素

:::demo ./demos/disabled.vue :::

### 间距
目前，`Form` 提供四种间距设置方式

1. `default`: 最小间距为 `20px`，`tip` `error` 互斥显示
2. `static`: 静态间距为 `20px`，`tip` `error` 互斥显示
3. `compact`: 紧凑间距，间距为 `16px`，此时错误与提示将会被隐藏
4. `dynamic`: 动态间距，最小间距为 `16px`，`tip` `error` 可以同时显示

如果对于间距 `20px` 需要自定义，则可以通过如下 `demo` 设置 `style`

:::demo ./demos/spacing.vue :::

### label 尾部插槽
在 `label-position = 'top'` 时，可以使用 `label-append` 插槽用来放置自定义内容
:::demo ./demos/label-append.vue :::

### 使用 `label` 作为必填提示
默认情况下，使用 `prop` 作为必填的提示

如果设置 `:required-use-label="true"` 则可以使用 `label` 作为必填提示

:::demo ./demos/validate-required-default-show-text.vue :::