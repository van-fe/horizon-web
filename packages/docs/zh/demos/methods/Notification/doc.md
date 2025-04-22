### Basic

可以通过设置 `title` 和 `content` 属性来设置通知的标题和正文内容。

默认情况下，组件会自动关闭，通过`duration`属性可以设置关闭的时间间隔，接收`Number`类型，当设置`duration > 0` 时，视为过相应时间自动关闭；设置为`duration <= 0` 时，视为不自动关闭，需要用户自行点击 x 或者 `close` 方法去手动关闭。

:::demo ./demos/basic.vue :::

### Content

`content` 支持传入 HTML 字符串来作为正文内容。 将 `useHTML` 属性设置为 true，`content` 属性就会被当作 HTML 片段处理。

当然，也可以把 `content` 传入一个 `render` 函数，就可以实现动态更新content显示。

:::demo ./demos/content.vue :::

### Types
我们提供了五种不同类型的提醒框：normal、success、warning、info 和error。

使用 `type` 属性设置其类型， 支持五个选项：`normal`、`success`、`warning`、`info` 和 `error`， 默认为 `normal`。

:::demo ./demos/different-types.vue :::

### Placement
Notification 可以从屏幕四角中的任意一角弹出

使用 `placement` 属性设置其弹出位置， 支持四个选项：`top-right`、`top-left`、`bottom-right` 和 `bottom-left`， 默认为 `top-right`。

:::demo ./demos/placement.vue :::

### Offset

使用 `offset` 设置偏移量，相对屏幕顶部或底部的偏移量，使用 `gap` 设置相邻Notification实例之间的间距。

:::demo ./demos/offset.vue :::

### Width

使用 `width` 设置自定义宽度。

:::demo ./demos/width.vue :::

### Buttons

操作按钮可以为用户提供处理通知的按钮

使用 `show-confirm-button`、`show-cancel-button`分别设置OK按钮和Cancel按钮显示，使用`confirmButtonProps`可以设置button相关属性，例如防抖操作。

:::demo ./demos/operation.vue :::

### Show close

通过`show-close`属性可以设置关闭按钮是否显示。

:::demo ./demos/close.vue :::

### Close/CloseAll

异步调用 `$notify` 会返回当前 Notification 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法，也可调用 `closeAll` 方法关闭所有实例。

:::demo ./demos/methods.vue :::

### $notify 重载
`$notify` 包含 5 个重载方法，`resolve、reject` 会传入操作类型。
```ts
function $notify (content: string): Promise<string>;
function $notify (content: string, options: OptionsType): Promise<string>;
function $notify (content: string, title: string): Promise<string>;
function $notify (content: string, title: string, options: OptionsType): Promise<string>;
function $notify (options: OptionsType): Promise<string>;
