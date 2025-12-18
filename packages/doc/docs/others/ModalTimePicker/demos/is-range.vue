<template>
  <n-row>
    <n-col :span="6">
      <n-modal-time-picker v-model="value" is-range />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
</script>
