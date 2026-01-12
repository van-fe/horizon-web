<script setup lang="ts">
import { ref } from 'vue';

const value = ref(32);
</script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <h-input-number v-model="value" readonly />
    </h-col>
  </h-row>
</template>
