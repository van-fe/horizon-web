<script setup lang="ts">
import { ref } from 'vue';
import { formatSelectionCount, workspaceOptions } from './options';

const value = ref<string[][]>([
  ['product', 'design-system', 'accessibility'],
  ['engineering', 'reliability', 'observability'],
]);
const status = ref('No pending changes');
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      aria-label="Review teams"
      placeholder="Choose review teams"
      :options="workspaceOptions"
      multiple
      collapse-tags
      need-confirm
      :to-body="false"
      @confirm="status = 'Selection confirmed'"
      @cancel="status = 'Changes cancelled'"
    />
    <span aria-live="polite">{{ formatSelectionCount(value) }} · {{ status }}</span>
  </div>
</template>
