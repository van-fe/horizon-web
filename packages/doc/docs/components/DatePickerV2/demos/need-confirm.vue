<template>
  <n-row align="middle">
    <n-col :span="4">
      Year:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value1" type="year" need-confirm />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue1" type="year-range" need-confirm />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      Month:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value2" type="month" need-confirm />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue2" type="month-range" need-confirm />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      Week:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value3" type="week" format="[week] ww" need-confirm />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      Date:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value4" type="date" need-confirm />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue4" type="date-range" need-confirm />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      Datetime:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value5" type="datetime" need-confirm />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue5" type="datetime-range" need-confirm />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      DateMinutes:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value6" type="date-minutes" need-confirm />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue6" type="date-minutes-range" need-confirm />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      DateSeconds:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value7" type="date-seconds" need-confirm />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue7" type="date-seconds-range" need-confirm />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const rangeValue1 = ref();
const value2 = ref();
const rangeValue2 = ref();
const value3 = ref(new Date);
const value4 = ref();
const rangeValue4 = ref();
const value5 = ref();
const rangeValue5 = ref();
const value6 = ref();
const rangeValue6 = ref();
const value7 = ref();
const rangeValue7 = ref();
</script>
