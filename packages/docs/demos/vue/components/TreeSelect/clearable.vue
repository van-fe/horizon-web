<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const costCenter = ref<string | number>('cc-product');
const treeData: HTreeNodeData[] = [
  {
    value: 'north-america',
    label: 'North America',
    children: [
      { value: 'cc-product', label: '4100 · Product' },
      { value: 'cc-growth', label: '4200 · Growth' },
    ],
  },
  {
    value: 'europe',
    label: 'Europe',
    children: [{ value: 'cc-platform', label: '5100 · Platform' }],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-tree-select
      v-model="costCenter"
      :tree-data="treeData"
      placeholder="Choose a cost center"
      clearable
      :to-body="false"
    />
    <span aria-live="polite">Selected: {{ costCenter || 'unallocated' }}</span>
  </div>
</template>
