<template>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Year:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value1" type="year" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue1" type="year-range" />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Month:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value2" type="month" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="rangeValue2" type="month-range" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref();
const rangeValue1 = ref();
const value2 = ref();
const rangeValue2 = ref();
</script>
