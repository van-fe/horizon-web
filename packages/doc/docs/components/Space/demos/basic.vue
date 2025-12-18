<script setup lang="tsx">
import { ref } from 'vue';

const disabled = ref(false);
</script>

<template>
  <n-space>
    <n-checkbox v-model="disabled">禁用</n-checkbox>
    <div>Space</div>
    <n-button :disabled="disabled">Created</n-button>
    <n-button :disabled="disabled" type="normal">Refresh</n-button>
    <n-button :disabled="disabled" type="normal" icon="full_screen" />
  </n-space>
</template>

<style scoped></style>
