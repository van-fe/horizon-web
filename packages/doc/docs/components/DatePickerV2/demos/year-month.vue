<template>
  <n-row align="middle">
    <n-col :span="4">
      Year:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value1" type="year" />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue1" type="year-range" />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      Month:
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value2" type="month" />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="rangeValue2" type="month-range" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const rangeValue1 = ref();
const value2 = ref();
const rangeValue2 = ref();
</script>
