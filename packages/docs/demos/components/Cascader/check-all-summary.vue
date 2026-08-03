<script setup lang="ts">
import { ref } from 'vue';
import { allWorkspaceLeafPaths, formatSelectionCount, workspaceOptions } from './options';

const value = ref<string[][]>(allWorkspaceLeafPaths.map(path => [...path]));
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      aria-label="Review teams"
      :options="workspaceOptions"
      multiple
      collapse-tags
      use-check-all-summary
      check-all-summary-text="All review teams"
      :to-body="false"
    />
    <span aria-live="polite">{{ formatSelectionCount(value) }}</span>
  </div>
</template>
