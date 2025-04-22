### 常规状态
输入框样式
:::demo ./demos/demo1.vue :::

### 密码输入框
`type`设置为`password`时输入框将隐藏输入内容，点击右侧的眼睛图标可以查看输入内容

PS: 在`password`状态设置`show-password`为`true`的情况下，`suffix-icon`将会失效
:::demo ./demos/password.vue :::

### 禁用状态
在`disabled`状态将不能输入
:::demo ./demos/disabled.vue :::

### 可清空
设置 `clearable`，即可在有值时显示清空图标
:::demo ./demos/clearable.vue :::

### 输入状态
传入`status=error`，将显示错误状态
:::demo ./demos/status.vue :::

### 尺寸
组件提供了 `small` `medium` `large`三种尺寸，默认为`medium`
:::demo ./demos/size.vue :::

### 图标和前后缀
通过`prefix-icon`和`suffix-icon`设置图标

通过`prefix`和`suffix` `slot`可以设置前缀和后缀内容，可用于设置带有action的icon
:::demo ./demos/icon.vue :::

### 组合式输入框
通过`prepend`和`append` `slot`可以为输入框添加一个前置或后置元素  
`--n-input-bg--prepend-append: transparent` 为了解决图标和前后缀的背景色问题
:::demo ./demos/mixed.vue :::

### 多行输入框
将`type`设置为`textarea`时，输入框将会变为多行输入框

通过`resize`可以设置多行输入框是否可拖拽
:::demo ./demos/textarea.vue :::

### 字数限制
通过`maxlength`和`showLimit`可显示输入框的字数限制

注意: 启用了 `enable-out-of-exceeded` 后，不会限制字数，所以表单验证需要结合 `n-form` 的 `max` 设置
:::demo ./demos/limit.vue :::

### 搜索输入框
搜索输入框，可对输入内容进行一键清空
:::demo ./demos/search.vue :::

### Input Events
可对输入框绑定事件，具体事件见下方说明
:::demo ./demos/event.vue :::
