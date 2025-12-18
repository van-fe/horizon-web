<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
  <n-button @click="visible = !visible">Click</n-button>
  <n-dialog v-model:visible="visible" size="small">
    <div>Hello World</div>
  </n-dialog>
</template>
