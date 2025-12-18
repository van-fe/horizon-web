### 基础
通过调用 `$message` 方法即可，默认关闭时间是 3s.
:::demo ./demos/basic.vue :::

### 各种消息类型
用来显示「成功、警告、消息、错误」类的操作反馈。 当需要自定义更多属性时，Message 也可以接收一个对象为参数。
通过设置 `type`提示不同的消息类型或者通过 `$message[type]` 调用。
:::demo ./demos/type.vue :::

### 加载中消息
通过调用 `$message.loading` 使用，异步自行移除。<strong>请注意: 使用对象方式需要自行设置 `duration=0`，否则依旧按照3s后关闭.</strong>
:::demo ./demos/loading.vue :::

### 可关闭的消息提示
可以添加关闭按钮。

默认的 Message 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 showClose 设置为 true 此外，和 Notification 一样，Message 拥有可控的 duration， 默认的关闭时间为 3000 毫秒。PS: loading 类型不支持 `showClose` 属性
:::demo ./demos/closable.vue :::

### 使用 HTML 片段作为正文内容
可以添加关闭按钮。

message 还支持使用 HTML 字符串作为正文内容。
将useHTMLString属性设置为 true,message 就会被当作 HTML 片段处理。
:::demo ./demos/demo4.vue :::

### 自定义
`message` 支持自定义组件
:::demo ./demos/customize.vue :::

### 全局配置
通过 message.config 方式可配置全局默认时间和最大显示数量
:::demo ./demos/config.vue :::