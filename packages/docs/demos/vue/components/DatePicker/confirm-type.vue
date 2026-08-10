<script setup lang="ts">
import { computed, ref } from 'vue';

type ConfirmMode = 'enter' | 'blur';

const mode = ref<ConfirmMode>('enter');
const value = ref();
const status = ref('Type a date to test confirmation');
const confirmType = computed(() => (mode.value === 'blur' ? 'blur' : undefined));
</script>

<template>
  <section class="date-picker-confirm-type">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item value="enter" label="Enter" />
      <h-segmented-item value="blur" label="Blur or Enter" />
    </h-segmented>
    <h-date-picker
      v-model="value"
      type="date"
      :confirm-type="confirmType"
      placeholder="Type a date"
      @change="status = `${mode === 'blur' ? 'Blur' : 'Enter'} confirmed the date`"
    />
    <p aria-live="polite">{{ status }}</p>
  </section>
</template>

<style scoped>
.date-picker-confirm-type {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-confirm-type :deep(.h-date-picker) {
  inline-size: 100%;
}

.date-picker-confirm-type p {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .date-picker-confirm-type {
    inline-size: 100%;
  }
}
</style>
