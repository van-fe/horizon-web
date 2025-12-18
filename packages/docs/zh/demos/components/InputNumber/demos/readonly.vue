<script setup lang="ts">
import { ref } from 'vue';

const value = ref(32);
</script>

<template>
  <n-row :gutter="12">
    <n-col :span="8">
      <n-input-number v-model="value" readonly />
    </n-col>
  </n-row>
</template>
