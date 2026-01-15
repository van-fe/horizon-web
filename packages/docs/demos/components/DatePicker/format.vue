<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="date" format="X" />
    </h-col>
    <h-col :span="12">
      <h-date-picker v-model="value2" type="date-range" format="YYYY-MMM-DD [Quarter:] Q [week:] wo" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
