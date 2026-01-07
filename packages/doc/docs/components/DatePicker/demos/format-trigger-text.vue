<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker
        v-model="value"
        type="date"
        :format-trigger-text="formatTriggerText"
      />
    </h-col>
    <h-col :span="6">
      <h-date-picker
        v-model="value2"
        type="datetimeRange"
        :single-trigger="true"
        :format-trigger-text="formatTriggerText"
        :default-time="['00:00', '23:59:59']"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DatePickerProps } from '@aurora/horizon-web';

const value = ref();
const value2 = ref();

const formatTriggerText: DatePickerProps['formatTriggerText'] = (days, text) => {
  console.info('format trigger text param: ', days, text);

  if (Array.isArray(days)) {
    return days.map(day => day?.format('YYYY-MM-DD HH:mm:ss')).join(' 至 ');
  } else {
    return days?.format('YYYY-MM-DD HH:mm:ss') || '';
  }
};
</script>
