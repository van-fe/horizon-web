<template>
  <n-row>
    <n-col :span="6">
      <n-time-picker-v2 v-model="value" start-at="8" end-at="32" :format-cell-text="formatCellText" :format-trigger-text="formatTriggerText" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@nio-fe/lego';
import type { TimePickerV2Props } from '@nio-fe/lego';

const value = ref();

const formatCellText: TimePickerV2Props['formatCellText'] = (unit, value) => {
  if (unit === 'hours') {
    if ((Number(value)) > 23) {
      return `次日 ${(Number(value) - 24).toString().padStart(2, '0')}`;
    }
  }

  return value;
};

const formatTriggerText: TimePickerV2Props['formatTriggerText'] = (day, text) => {
  if (day.diff(dayjs().startOf('day'), 'hours') > 23) {
    return `次日 ${text}`;
  } else return text;
};
</script>
