<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-time-picker v-model="value" clearable />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-time-picker v-model="value2" is-range clearable />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
