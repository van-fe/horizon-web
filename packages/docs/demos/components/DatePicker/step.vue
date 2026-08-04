<script setup lang="ts">
import { computed, ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

type StepMode = 'hour' | 'minute' | 'second';

const mode = ref<StepMode>('minute');
const value = ref(dayjs().add(1, 'day').hour(9));
const type = computed(() => {
  if (mode.value === 'hour') return 'datetime';
  if (mode.value === 'second') return 'date-seconds';
  return 'date-minutes';
});
</script>

<template>
  <section class="date-picker-step">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item value="hour" label="60 minutes" />
      <h-segmented-item value="minute" label="5 minutes" />
      <h-segmented-item value="second" label="10 seconds" />
    </h-segmented>
    <h-date-picker
      v-model="value"
      :type="type"
      :time-step="mode === 'hour' ? 60 : undefined"
      :hour-step="mode === 'hour' ? 1 : 3"
      :minute-step="mode === 'hour' ? 1 : 5"
      :second-step="mode === 'second' ? 10 : 1"
    />
  </section>
</template>

<style scoped>
.date-picker-step {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-step :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-step {
    inline-size: 100%;
  }
}
</style>
