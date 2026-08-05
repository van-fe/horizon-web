<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { HDatePickerShortcutsType } from '@aurora/horizon-web';

const reportingRange = ref([dayjs().subtract(1, 'week'), dayjs()]);
const shortcuts: HDatePickerShortcutsType[] = [
  { label: 'Previous year', value: [dayjs().subtract(1, 'year'), dayjs()] },
  { label: 'Previous month', value: [dayjs().subtract(1, 'month'), dayjs()] },
  { label: 'Previous week', value: [dayjs().subtract(1, 'week'), dayjs()] },
  { label: 'Next week', value: [dayjs(), dayjs().add(1, 'week')] },
];
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker v-model="reportingRange" type="date-range" :shortcuts="shortcuts" need-confirm />
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
