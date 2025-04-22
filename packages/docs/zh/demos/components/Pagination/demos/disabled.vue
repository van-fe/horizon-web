<template>
  <n-form label-position="left" label-vertical-disabled="middle">
    <n-form-item label="disabled">
      <n-switch v-model="disabled" status />
    </n-form-item>
  </n-form>
  <n-row :gutter="10" disabled="middle">
    <n-col :span="24">
      <n-pagination :total="50" :disabled="disabled" align="right" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
</script>

<style scoped>
</style>
