<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const team = ref<string | number>('design-systems');
const treeData: HTreeNodeData[] = [
  {
    value: 'product',
    label: 'Product',
    children: [
      { value: 'research', label: 'Research' },
      { value: 'design-systems', label: 'Design systems' },
    ],
  },
  {
    value: 'engineering',
    label: 'Engineering',
    children: [
      { value: 'platform', label: 'Platform' },
      { value: 'reliability', label: 'Site reliability' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-tree-select
      v-model="team"
      :tree-data="treeData"
      placeholder="Choose a primary team"
      show-line
      :to-body="false"
    />
    <span aria-live="polite">Selected: {{ team || 'none' }}</span>
  </div>
</template>
