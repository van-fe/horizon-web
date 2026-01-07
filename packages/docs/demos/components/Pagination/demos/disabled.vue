<template>
  <h-form label-position="left" label-vertical-disabled="middle">
    <h-form-item label="disabled">
      <h-switch v-model="disabled" status />
    </h-form-item>
  </h-form>
  <h-row :gutter="10" disabled="middle">
    <h-col :span="24">
      <h-pagination :total="50" :disabled="disabled" align="right" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
</script>

<style scoped>
</style>
