<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" :show-popover-content-only="true" />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="value2" is-range :show-popover-content-only="true" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
