<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

type DateTimeType = 'datetime' | 'date-minutes' | 'date-seconds';

const type = ref<DateTimeType>('datetime');
const value = ref(dayjs().add(1, 'day').hour(10).minute(30).second(20));
</script>

<template>
  <section class="date-picker-datetime">
    <h-segmented v-model:active-key="type" size="small">
      <h-segmented-item value="datetime" label="Date & time" />
      <h-segmented-item value="date-minutes" label="Minutes" />
      <h-segmented-item value="date-seconds" label="Seconds" />
    </h-segmented>
    <h-date-picker v-model="value" :type="type" />
  </section>
</template>

<style scoped>
.date-picker-datetime {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-datetime :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-datetime {
    inline-size: 100%;
  }
}
</style>
