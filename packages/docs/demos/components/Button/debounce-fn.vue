<template>
  <section class="button-debounce-demo">
    <div class="button-debounce-demo__controls">
      <span>While saving</span>
      <h-segmented v-model:active-key="debounceType" size="small" block>
        <h-segmented-item value="disabled" label="disabled" />
        <h-segmented-item value="loading" label="loading" />
        <h-segmented-item value="none" label="none" />
      </h-segmented>
    </div>

    <h-space wrap>
      <h-button :debounce-fn="saveDebounced" :debounce-type="debounceType">Guarded save</h-button>
      <h-button type="normal" plain @click="saveData('Standard save')">Standard save</h-button>
    </h-space>

    <p class="button-debounce-demo__status" aria-live="polite">
      {{ status }} · {{ completed }} completed / {{ attempts }} requested
    </p>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

const debounceType = ref<'disabled' | 'loading' | 'none'>('disabled');
const attempts = ref(0);
const completed = ref(0);
const status = ref('Ready to save');
const timers = new Set<number>();

function saveData(source: string) {
  attempts.value += 1;
  status.value = `${source} is running…`;

  return new Promise<void>(resolve => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      completed.value += 1;
      status.value = `${source} completed`;
      resolve();
    }, 1200);

    timers.add(timer);
  });
}

const saveDebounced = () => saveData('Guarded save');

onBeforeUnmount(() => {
  timers.forEach(timer => window.clearTimeout(timer));
  timers.clear();
});
</script>

<style scoped>
.button-debounce-demo {
  display: grid;
  gap: var(--h-spacing-5);
}

.button-debounce-demo__controls {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-3);
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.button-debounce-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 520px) {
  .button-debounce-demo__controls {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
