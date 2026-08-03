<template>
  <h-form label-position="left" label-vertical-disabled="middle">
    <h-form-item label="disabled">
      <h-switch v-model="disabled" status />
    </h-form-item>
  </h-form>
  <h-grid :gap="10">
    <h-grid-item :span="24">
      <h-pagination :total="50" :disabled="disabled" align="right" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
</script>

<style scoped>
</style>
