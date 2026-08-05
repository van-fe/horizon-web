<script setup lang="ts">
import { ref } from 'vue';
import { formatPath, workspaceOptions } from './options';

const checkStrictly = ref(true);
const value = ref<string[]>(['product', 'growth']);
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="checkStrictly" label="Allow parent selection" />
    <h-cascader
      v-model="value"
      aria-label="Release owner"
      placeholder="Choose a release owner"
      show-radio
      :check-strictly="checkStrictly"
      :options="workspaceOptions"
      :to-body="false"
    />
    <span aria-live="polite">{{ formatPath(value) }}</span>
  </div>
</template>
