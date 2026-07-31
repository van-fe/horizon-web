<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-date-picker v-model="value" type="date" :shortcuts="shortcuts" need-confirm />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value2" type="dateRange" :shortcuts="shortcutRange" need-confirm />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { HDatePickerShortcutsType } from '@aurora/horizon-web';

const value = ref();
const value2 = ref();

const shortcuts = ref<HDatePickerShortcutsType[]>([
  {
    label: 'Last 7 days',
    value: dayjs().subtract(7, 'day'),
  }, {
    label: 'Yesterday',
    value: dayjs().subtract(1, 'day'),
  }, {
    label: 'Today',
    value: dayjs(),
  }, {
    label: 'Tomorrow',
    value: dayjs().add(1, 'day'),
  },
]);

const shortcutRange = ref<HDatePickerShortcutsType[]>([
  {
    label: 'Last Year',
    value: [dayjs().subtract(1, 'year'), dayjs()],
  }, {
    label: 'Last Month',
    value: [dayjs().subtract(1, 'month'), dayjs()],
  }, {
    label: 'Last Week',
    value: [dayjs().subtract(1, 'week'), dayjs()],
  }, {
    label: 'Next Week',
    value: [dayjs(), dayjs().add(1, 'week')],
  },
]);
</script>
