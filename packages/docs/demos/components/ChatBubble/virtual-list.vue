<template>
  <h-chat-bubble-list
    ref="listRef"
    :items="messages"
    :height="420"
    :min-item-size="72"
    :buffer="160"
  >
    <template #before>
      <div class="history-tip">已加载 10,000 条消息</div>
    </template>
  </h-chat-bubble-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const listRef = ref<{ scrollToBottom: () => void }>();
const messages = Array.from({ length: 10000 }, (_, index) => {
  const isMine = index % 3 === 0;
  return {
    id: index,
    placement: isMine ? ('end' as const) : ('start' as const),
    variant: isMine ? ('primary' as const) : ('default' as const),
    name: isMine ? 'You' : 'Horizon Assistant',
    datetime: `10:${String(index % 60).padStart(2, '0')}`,
    content: `第 ${index + 1} 条消息${index % 5 === 0 ? '，这是一段用于演示动态高度测量的较长内容。' : ''}`,
  };
});

onMounted(() => listRef.value?.scrollToBottom());
</script>

<style scoped>
.history-tip {
  padding: 8px;
  color: var(--h-text-tertiary);
  text-align: center;
}
</style>
