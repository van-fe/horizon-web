<template>
  <h-form label-position="left">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="small"></h-radio>
        <h-radio label="medium"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="dot">
      <h-radio-group v-model="dot">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-steps v-model="value" :progress-dot="dot" clickable label-align="left" :size="size">
    <h-step title="Succeeded" subtitle="This step is finished" />
    <h-step title="Disabled" :disabled="true" subtitle="This step is disabled" />
    <h-step title="Future step" subtitle="This is available" />
    <h-step title="Future step" subtitle="This is available" />
  </h-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(1);
const size = ref('medium');
const dot = ref(false);
</script>
