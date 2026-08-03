<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
</script>

<template>
  <h-space>
    <h-checkbox v-model="disabled">禁用按钮</h-checkbox>
    <div>Space</div>
    <h-button :disabled="disabled">Created</h-button>
    <h-button :disabled="disabled" type="normal">Refresh</h-button>
    <h-button :disabled="disabled" type="normal" icon="full_screen" />
  </h-space>
</template>

<style scoped></style>
