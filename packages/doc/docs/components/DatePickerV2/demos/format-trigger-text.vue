<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker-v2
        v-model="value"
        type="date"
        :format-trigger-text="formatTriggerText"
      />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2
        v-model="value2"
        type="datetimeRange"
        :single-trigger="true"
        :format-trigger-text="formatTriggerText"
        :default-time="['00:00', '23:59:59']"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DatePickerV2Props } from '@nio-fe/lego';

const value = ref();
const value2 = ref();

const formatTriggerText: DatePickerV2Props['formatTriggerText'] = (days, text) => {
  console.log('format trigger text param: ', days, text);

  if (Array.isArray(days)) {
    return days.map(day => day?.format('YYYY-MM-DD HH:mm:ss')).join(' 至 ');
  } else {
    return days?.format('YYYY-MM-DD HH:mm:ss') || '';
  }
};
</script>
