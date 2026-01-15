<template>
  <h-row align="middle">
    <h-col :span="4">
      Year:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value1" type="year" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue1" type="year-range" />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="4">
      Month:
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="month" />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="rangeValue2" type="month-range" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const rangeValue1 = ref();
const value2 = ref();
const rangeValue2 = ref();
</script>
