<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-time-picker v-model="value" type="seconds" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-time-picker v-model="rangeValue" type="seconds" is-range />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
</script>
