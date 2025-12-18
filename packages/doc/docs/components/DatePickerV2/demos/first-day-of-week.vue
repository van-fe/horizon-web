<template>
  <n-form>
    <n-form-item label="first day of week">
      <n-input-number v-model="firstDayOfWeek" :min="0" :max="6" style="width: 200px" />
    </n-form-item>
    <n-form-item label="show before and after date">
      <n-switch v-model="showBeforeAfterDate" status />
    </n-form-item>
    <n-form-item label="fixed six rows">
      <n-switch v-model="fixedSixRows" status />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value" type="date" :first-day-of-week="firstDayOfWeek" :show-before-after-date="showBeforeAfterDate" :fixed-six-rows="fixedSixRows" />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="values" type="date-range" :first-day-of-week="firstDayOfWeek" :show-before-after-date="showBeforeAfterDate" :fixed-six-rows="fixedSixRows" />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value2" type="week" placeholder="week picker" format="[Week:] wo" :first-day-of-week="firstDayOfWeek" :show-before-after-date="showBeforeAfterDate" :fixed-six-rows="fixedSixRows" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DatePickerV2Props } from '@nio-fe/lego';

const value = ref();
const values = ref();
const value2 = ref();
const firstDayOfWeek = ref<DatePickerV2Props['firstDayOfWeek']>(0);
const showBeforeAfterDate = ref(true);
const fixedSixRows = ref(false);
</script>
