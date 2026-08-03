<template>
  <section class="chat-bubble-list-demo">
    <div class="chat-bubble-list-demo__actions">
      <h-button size="small" type="normal" plain @click="scrollToStart">First message</h-button>
      <h-button size="small" @click="scrollToBottom">Latest message</h-button>
    </div>

    <h-chat-bubble-list
      ref="listRef"
      :items="messages"
      :height="380"
      :min-item-size="72"
      :buffer="160"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const listRef = ref<{ scrollToItem: (index: number) => void; scrollToBottom: () => void }>();
const topics = [
  'Release candidate is ready for review.',
  'Accessibility verification passed for keyboard navigation.',
  'The dark-theme screenshots are attached to the handoff.',
  'One localization follow-up remains assigned to documentation.',
  'Responsive checks passed at the 390px viewport.',
];
const messages = Array.from({ length: 5000 }, (_, index) => {
  const isMine = index % 3 === 0;
  return {
    id: index,
    placement: isMine ? ('end' as const) : ('start' as const),
    variant: isMine ? ('primary' as const) : ('default' as const),
    name: isMine ? 'You' : 'Horizon Assistant',
    datetime: `${String(9 + Math.floor((index % 480) / 60)).padStart(2, '0')}:${String(index % 60).padStart(2, '0')}`,
    content:
      topics[index % topics.length] +
      (index % 7 === 0
        ? ' The full evidence remains available in the linked verification report.'
        : ''),
    ariaLabel: `Message ${index + 1} from ${isMine ? 'you' : 'Horizon Assistant'}`,
  };
});

function scrollToStart() {
  listRef.value?.scrollToItem(0);
}

function scrollToBottom() {
  listRef.value?.scrollToBottom();
}
</script>

<style scoped>
.chat-bubble-list-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.chat-bubble-list-demo__actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: var(--h-spacing-2);
}
</style>
