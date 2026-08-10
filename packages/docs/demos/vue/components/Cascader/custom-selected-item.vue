<script setup lang="ts">
import { ref } from 'vue';
import { formatSelectionCount, workspaceOptions } from './options';

const value = ref<string[][]>([
  ['product', 'design-system', 'accessibility'],
  ['engineering', 'reliability', 'observability'],
]);
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      aria-label="Release reviewers"
      placeholder="Choose reviewers"
      :options="workspaceOptions"
      multiple
      clearable
      :to-body="false"
    >
      <template #tagRender="option">
        <h-tag :key="String(option.value)" is-pure>Team · {{ option.label }}</h-tag>
      </template>
    </h-cascader>
    <span aria-live="polite">{{ formatSelectionCount(value) }}</span>
  </div>
</template>
