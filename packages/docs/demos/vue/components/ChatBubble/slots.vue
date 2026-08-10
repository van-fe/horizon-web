<template>
  <section class="chat-bubble-slots-demo">
    <h-chat-bubble
      datetime="10:28"
      max-width="min(100%, 32rem)"
      aria-label="Custom assistant message at 10:28"
    >
      <template #avatar>
        <h-avatar type="work" src="AI" size="small" />
      </template>
      <template #name><strong>Horizon Assistant</strong></template>
      <template #datetime><span>10:28 UTC</span></template>
      The release summary is ready. It includes
      <strong>three verified improvements</strong>
      and one follow-up assigned to the documentation team.
      <template #status><span>Generated</span></template>
      <template #footer>
        <h-button text size="small" @click="status = 'Summary copied'">Copy summary</h-button>
      </template>
    </h-chat-bubble>
    <span class="chat-bubble-slots-demo__status" aria-live="polite">{{ status }}</span>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const status = ref('Ready');
</script>

<style scoped>
.chat-bubble-slots-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.chat-bubble-slots-demo__status {
  color: var(--h-text-brand-default);
  font-size: var(--h-text-sm);
}
</style>
