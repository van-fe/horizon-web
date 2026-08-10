<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValue = ref<string | number>('prod-eu');
const treeData: HTreeNodeData[] = [
  {
    value: 'production',
    label: 'Production · grouping only',
    selectable: false,
    children: [
      { value: 'prod-us', label: 'US cluster' },
      { value: 'prod-eu', label: 'EU cluster' },
    ],
  },
  {
    value: 'testing',
    label: 'Testing · grouping only',
    selectable: false,
    children: [
      { value: 'staging', label: 'Shared staging' },
      { value: 'preview', label: 'Preview environments · disabled', disabled: true },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-tree-select
      v-model="selectedValue"
      :tree-data="treeData"
      show-radio
      show-line
      placeholder="Choose a release destination"
      :to-body="false"
    />
    <span aria-live="polite">Selected: {{ selectedValue || 'none' }}</span>
  </div>
</template>
