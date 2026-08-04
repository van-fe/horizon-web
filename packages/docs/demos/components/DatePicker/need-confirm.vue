<script setup lang="ts">
import { ref, watch } from 'vue';
import { dayjs } from '@aurora/horizon-web';

type PickerType = 'date' | 'date-range' | 'datetime';

const type = ref<PickerType>('date-range');
const date = dayjs().add(1, 'day').hour(10).minute(30);
const value = ref<unknown>([date, date.add(2, 'day')]);

watch(type, nextType => {
  value.value = nextType === 'date-range' ? [date, date.add(2, 'day')] : date;
});
</script>

<template>
  <section class="date-picker-need-confirm">
    <h-segmented v-model:active-key="type" size="small">
      <h-segmented-item value="date" label="Date" />
      <h-segmented-item value="date-range" label="Range" />
      <h-segmented-item value="datetime" label="Date & time" />
    </h-segmented>
    <h-date-picker v-model="value" :type="type" need-confirm />
  </section>
</template>

<style scoped>
.date-picker-need-confirm {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-need-confirm :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-need-confirm {
    inline-size: 100%;
  }
}
</style>
