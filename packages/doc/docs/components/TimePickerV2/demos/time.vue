<template>
  <n-row>
    <n-col :span="6">
      <n-time-picker-v2 v-model="value" type="time" />
    </n-col>
    <n-col :span="6">
      <n-time-picker-v2 v-model="rangeValue" type="time" is-range />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
</script>
