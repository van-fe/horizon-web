## 常规状态
输入框样式
:::demo components/Input/demo1.vue :::

## 密码输入框
`type`设置为`password`时输入框将隐藏输入内容，点击右侧的眼睛图标可以查看输入内容

PS: 在`password`状态设置`show-password`为`true`的情况下，`suffix-icon`将会失效
:::demo components/Input/password.vue :::

## 禁用状态
在`disabled`状态将不能输入
:::demo components/Input/disabled.vue :::

## 可清空
设置 `clearable`，即可在有值时显示清空图标
:::demo components/Input/clearable.vue :::

## 输入状态
传入`status=error`，将显示错误状态
:::demo components/Input/status.vue :::

## 尺寸
组件提供了 `small` `medium` `large`三种尺寸，默认为`medium`
:::demo components/Input/size.vue :::

## 图标和前后缀
通过`prefix-icon`和`suffix-icon`设置图标

通过`prefix`和`suffix` `slot`可以设置前缀和后缀内容，可用于设置带有action的icon
:::demo components/Input/icon.vue :::

## 组合式输入框
通过`prepend`和`append` `slot`可以为输入框添加一个前置或后置元素  
`--h-input-background-prepend-append: transparent` 为了解决图标和前后缀的背景色问题
:::demo components/Input/mixed.vue :::

## 嵌入复合组件
通过 `embedded` 复用 Input 的输入、焦点、禁用和输入法行为，同时不渲染默认外观。配合 `fit-content` 可让输入框宽度随内容变化，适合 Picker、标签输入等复合表单组件。
:::demo components/Input/embedded.vue :::

## 多行输入框
将`type`设置为`textarea`时，输入框将会变为多行输入框

通过`resize`可以设置多行输入框是否可拖拽
:::demo components/Input/textarea.vue :::

## 字数限制
通过`maxlength`和`showLimit`可显示输入框的字数限制

注意: 启用了 `enable-out-of-exceeded` 后，不会限制字数，所以表单验证需要结合 `h-form` 的 `max` 设置
:::demo components/Input/limit.vue :::

## 搜索输入框
搜索输入框，可对输入内容进行一键清空
:::demo components/Input/search.vue :::

## Input Events
可对输入框绑定事件，具体事件见下方说明
:::demo components/Input/event.vue :::
