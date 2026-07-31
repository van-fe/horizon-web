<template>
  <h-form>
    <h-form-item label="first day of week">
      <h-input-number v-model="firstDayOfWeek" :min="0" :max="6" style="width: 200px" />
    </h-form-item>
    <h-form-item label="show before and after date">
      <h-switch v-model="showBeforeAfterDate" status />
    </h-form-item>
    <h-form-item label="fixed six rows">
      <h-switch v-model="fixedSixRows" status />
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-date-picker v-model="value" type="date" :first-day-of-week="firstDayOfWeek" :show-before-after-date="showBeforeAfterDate" :fixed-six-rows="fixedSixRows" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="values" type="date-range" :first-day-of-week="firstDayOfWeek" :show-before-after-date="showBeforeAfterDate" :fixed-six-rows="fixedSixRows" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value2" type="week" placeholder="week picker" format="[Week:] wo" :first-day-of-week="firstDayOfWeek" :show-before-after-date="showBeforeAfterDate" :fixed-six-rows="fixedSixRows" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DatePickerProps } from '@aurora/horizon-web';

const value = ref();
const values = ref();
const value2 = ref();
const firstDayOfWeek = ref<DatePickerProps['firstDayOfWeek']>(0);
const showBeforeAfterDate = ref(true);
const fixedSixRows = ref(false);
</script>
