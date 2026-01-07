<template>
  <h-row align="middle">
    <h-col :span="4">
      Year:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value1" type="year" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue1" type="year-range" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Month:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="month" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue2" type="month-range" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Week:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value3" type="week" format="[week] ww" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Date:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value4" type="date" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue4" type="date-range" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Datetime:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value5" type="datetime" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue5" type="datetime-range" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      DateMinutes:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value6" type="date-minutes" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue6" type="date-minutes-range" need-confirm />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      DateSeconds:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value7" type="date-seconds" need-confirm />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue7" type="date-seconds-range" need-confirm />
    </h-col>
  </h-row>
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
