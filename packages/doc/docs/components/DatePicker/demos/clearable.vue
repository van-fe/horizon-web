<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" clearable />
    </h-col>
    <h-col :span="6">
      <h-date-picker v-model="value2" type="dateRange" clearable />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
