## Basic
By calling the `$message` method, the default close time is 3s.
:::demo vue/methods/Message/basic.vue :::

## Various Message Types
Used to display operation feedback of "success, warning, message, error" types. When you need to customize more properties, Message can also receive an object as a parameter.
Set `type` to prompt different message types or call through `$message[type]`.
:::demo vue/methods/Message/type.vue :::

## Loading Message
Use by calling `$message.loading`, automatically removed asynchronously. <strong>Please note: When using the object method, you need to set `duration=0` yourself, otherwise it will still close after 3s.</strong>
:::demo vue/methods/Message/loading.vue :::

## Closable Message Prompt
You can add a close button.

The default Message cannot be manually closed. If you need manual close functionality, you can set showClose to true. In addition, like Notification, Message has a controllable duration, and the default close time is 3000 milliseconds. PS: The loading type does not support the `showClose` attribute
:::demo vue/methods/Message/closable.vue :::

## Using HTML Fragments as Body Content
You can add a close button.

message also supports using HTML strings as body content.
Set the useHTMLString attribute to true, and message will be treated as an HTML fragment.
:::demo vue/methods/Message/demo4.vue :::

## Custom
`message` supports custom components
:::demo vue/methods/Message/customize.vue :::

## Global Configuration
You can configure global default time and maximum display number through message.config
:::demo vue/methods/Message/config.vue :::
