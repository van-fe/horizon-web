<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-time-picker v-model="value" is-range single-trigger />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-time-picker v-model="value2" is-range single-trigger placeholder="Do Not Link Panels" :is-link-panels="false" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
