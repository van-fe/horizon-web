<script setup lang="ts">
import { ref, watch } from 'vue';

type PickerType = 'year' | 'year-range' | 'month' | 'month-range';

const type = ref<PickerType>('month');
const value = ref<string | string[]>('2026-08');

watch(type, nextType => {
  value.value = nextType === 'year' ? '2027' : nextType === 'month' ? '2026-08' : [];
});
</script>

<template>
  <section class="date-picker-year-month">
    <h-segmented v-model:active-key="type" size="small">
      <h-segmented-item value="year" label="Year" />
      <h-segmented-item value="year-range" label="Year range" />
      <h-segmented-item value="month" label="Month" />
      <h-segmented-item value="month-range" label="Month range" />
    </h-segmented>
    <h-date-picker v-model="value" :type="type" />
  </section>
</template>

<style scoped>
.date-picker-year-month {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-year-month :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-year-month {
    inline-size: 100%;
  }
}
</style>
