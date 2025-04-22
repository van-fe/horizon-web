<template>
  <n-form label-position="left">
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio label="small"></n-radio>
        <n-radio label="medium"></n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="dot">
      <n-radio-group v-model="dot">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-steps v-model="value" :progress-dot="dot" clickable label-align="left" :size="size">
    <n-step title="Succeeded" subtitle="This step is finished" />
    <n-step title="Disabled" :disabled="true" subtitle="This step is disabled" />
    <n-step title="Future step" subtitle="This is available" />
    <n-step title="Future step" subtitle="This is available" />
  </n-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(1);
const size = ref('medium');
const dot = ref(false);
</script>
