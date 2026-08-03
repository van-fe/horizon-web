<script setup lang="ts">
import { ref } from 'vue';

const value = ref(32);
</script>

<template>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <h-input-number v-model="value" readonly />
    </h-grid-item>
  </h-grid>
</template>
