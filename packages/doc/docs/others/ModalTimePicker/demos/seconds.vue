<template>
  <h-row>
    <h-col :span="6">
      <h-modal-time-picker v-model="value" type="seconds" />
    </h-col>
    <h-col :span="6">
      <h-modal-time-picker v-model="rangeValue" type="seconds" is-range />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
</script>
