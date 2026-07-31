<template>
  <div class="chat-list">
    <h-chat-bubble
      avatar="https://avatars.githubusercontent.com/u/20601764?v=4"
      name="Horizon Assistant"
      datetime="10:24"
      content="你好！这是一个支持长文本自动换行的聊天气泡。"
      aria-label="Horizon Assistant 的消息"
    />
    <h-chat-bubble
      placement="end"
      variant="primary"
      name="You"
      datetime="10:25"
      status="已读"
      content="很好，也可以展示我发送的消息。"
      aria-label="我发送的消息"
    />
  </div>
</template>

<style scoped>
.chat-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
</style>
