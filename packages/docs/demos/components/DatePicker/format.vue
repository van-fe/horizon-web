<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-date-picker v-model="value" type="date" format="X" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h-date-picker v-model="value2" type="date-range" format="YYYY-MMM-DD [Quarter:] Q [week:] wo" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
