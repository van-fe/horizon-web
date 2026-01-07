<template>
  <p>
    <a-icon :name="value === 1 ? 'close' : 'check'" />
  </p>

  <h-button @click="value = value === 1 ? 2 : 1">修改</h-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(1);
</script>
