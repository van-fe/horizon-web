ChatBubble displays one message in chat, support, or assistant experiences. Sending, retrying, and message-data management remain application responsibilities.

## Basic Conversation

`placement` controls direction and `variant="primary"` emphasizes the current user. Name, time, status, and `aria-label` provide complete context.

:::demo components/ChatBubble/basic.vue :::

## Custom Slots

Customize the body, avatar, name, time, status, and footer actions. The demo reports footer-action results below the message.

:::demo components/ChatBubble/slots.vue :::

## Virtualized Message List

`HChatBubbleList` renders only messages near the viewport, supports variable-height content, and exposes `scrollToItem(index)` and `scrollToBottom()`.

:::demo components/ChatBubble/virtual-list.vue :::
