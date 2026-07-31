## When to Use

Use ChatBubble to display a single message in chat, support, or assistant experiences. Sending, retrying, and message-list management remain the responsibility of the application.

## Basic Usage

Use `placement` to align a message and `variant="primary"` to emphasize the current user's message.

:::demo components/ChatBubble/basic.vue :::

## Custom Content

Slots can customize the message body, avatar, name, time, status, and footer actions.

:::demo components/ChatBubble/slots.vue :::

## Virtualized Message List

`HChatBubbleList` reuses the library's dynamic-size virtual scroller and only renders messages near the viewport. It supports variable-height bubbles and exposes `scrollToItem(index)` and `scrollToBottom()`.

:::demo components/ChatBubble/virtual-list.vue :::
