<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" type="time" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="rangeValue" type="time" is-range />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
</script>
