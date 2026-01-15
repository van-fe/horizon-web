<template>
  <h-row>
    <h-col :span="6">
      <h-time-picker v-model="value" is-range single-trigger />
    </h-col>
    <h-col :span="6">
      <h-time-picker v-model="value2" is-range single-trigger placeholder="Do Not Link Panels" :is-link-panels="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
