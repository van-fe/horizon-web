<script setup lang="ts">
import { computed, ref } from 'vue';

type TextareaMode = 'fixed' | 'resizable' | 'auto' | 'bounded';
type TextareaConfig = {
  rows: number;
  resize: 'none' | 'vertical';
  autoSize: boolean | { minRows: number; maxRows: number };
};

const mode = ref<TextareaMode>('bounded');
const value = ref('Checkout latency increased after the regional rollout.');
const config = computed<TextareaConfig>(() => {
  if (mode.value === 'resizable') return { rows: 4, resize: 'vertical', autoSize: false };
  if (mode.value === 'auto') return { rows: 2, resize: 'none', autoSize: true };
  if (mode.value === 'bounded') {
    return { rows: 3, resize: 'none', autoSize: { minRows: 3, maxRows: 6 } };
  }
  return { rows: 4, resize: 'none', autoSize: false };
});
</script>

<template>
  <section class="input-textarea-demo">
    <label>
      <span>Height behavior</span>
      <h-select v-model="mode" aria-label="Textarea height behavior">
        <h-option label="Fixed" value="fixed" />
        <h-option label="Resizable" value="resizable" />
        <h-option label="Auto size" value="auto" />
        <h-option label="Bounded auto size" value="bounded" />
      </h-select>
    </label>
    <h-input
      v-model="value"
      type="textarea"
      :rows="config.rows"
      :resize="config.resize"
      :auto-size="config.autoSize"
      aria-label="Incident summary"
    />
  </section>
</template>

<style scoped>
.input-textarea-demo,
.input-textarea-demo label {
  display: grid;
  gap: var(--h-spacing-2);
}

.input-textarea-demo {
  gap: var(--h-spacing-3);
  max-inline-size: 640px;
}

.input-textarea-demo label {
  max-inline-size: 240px;
}

.input-textarea-demo span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
