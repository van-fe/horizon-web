<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { DatePickerProps } from '@aurora/horizon-web';

const reviewWindow = ref([dayjs().add(1, 'day'), dayjs().add(3, 'day')]);
const formatTriggerText: DatePickerProps['formatTriggerText'] = days => {
  if (Array.isArray(days)) {
    return days.map(day => day?.format('MMM D, YYYY HH:mm')).join(' → ');
  }
  return days?.format('ddd, MMM D, YYYY') || '';
};
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker
      v-model="reviewWindow"
      type="datetime-range"
      single-trigger
      :format-trigger-text="formatTriggerText"
      :default-time="['00:00', '23:59:59']"
    />
  </section>
</template>

<style scoped>
.date-picker-demo {
  max-inline-size: 680px;
}

@media (max-width: 390px) {
  .date-picker-demo {
    inline-size: 100%;
  }
}
</style>
