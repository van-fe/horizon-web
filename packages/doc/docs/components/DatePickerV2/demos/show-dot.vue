<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value" :show-dot="isShowDot" :show-date-tooltip="showDateTooltip" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref();

function isShowDot(date: Dayjs, panelType: 'day' | 'month' | 'year') {
  if (panelType !== 'day') {
    return false;
  }

  return [0, 6].includes(date.day());
}

function showDateTooltip(date: Dayjs) {
  return {
    show: [0, 6].includes(date.day()),
    content: 'Have a Rest',
  };
}
</script>
