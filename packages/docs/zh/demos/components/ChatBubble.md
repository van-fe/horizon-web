## 何时使用

用于在聊天、客服或智能助手场景中展示单条消息。组件只负责消息展示，发送、重试和消息列表管理应由业务层处理。

## 基本用法

通过 `placement` 控制消息排列方向，使用 `variant="primary"` 强调当前用户的消息。

:::demo components/ChatBubble/basic.vue :::

## 自定义内容

可以通过插槽自定义正文、头像、名称、时间、状态和底部操作区域。

:::demo components/ChatBubble/slots.vue :::

## 虚拟滚动消息列表

`HChatBubbleList` 复用组件库的动态尺寸虚拟滚动能力，只渲染可视区域附近的消息。它支持不等高气泡，并暴露 `scrollToItem(index)` 和 `scrollToBottom()` 方法。

:::demo components/ChatBubble/virtual-list.vue :::
