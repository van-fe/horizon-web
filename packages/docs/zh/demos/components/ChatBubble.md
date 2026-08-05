ChatBubble 用于聊天、客服或智能助手中的单条消息展示。发送、重试和消息数据管理仍由业务层负责。

## 基础对话

`placement` 控制消息方向，`variant="primary"` 强调当前用户消息；名称、时间、状态和 `aria-label` 提供完整上下文。

:::demo components/ChatBubble/basic.vue :::

## 自定义插槽

正文、头像、名称、时间、状态和底部操作都可自定义。示例将底部操作结果显示在消息下方。

:::demo components/ChatBubble/slots.vue :::

## 虚拟滚动消息列表

`HChatBubbleList` 只渲染可视区域附近的消息，支持不等高内容，并暴露 `scrollToItem(index)` 与 `scrollToBottom()`。

:::demo components/ChatBubble/virtual-list.vue :::
