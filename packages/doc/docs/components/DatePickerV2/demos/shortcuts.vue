<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker v-model="value" type="date" :shortcuts="shortcuts" need-confirm />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value2" type="dateRange" :shortcuts="shortcutRange" need-confirm />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@nio-fe/lego';
import type { NDatePickerShortcutsType } from '@nio-fe/lego';

const value = ref();
const value2 = ref();

const shortcuts = ref<NDatePickerShortcutsType[]>([
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

const shortcutRange = ref<NDatePickerShortcutsType[]>([
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
