<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValues = ref<Array<string | number>>(['mobile']);
const treeData: HTreeNodeData[] = [
  {
    value: 'experience',
    label: 'Experience · grouping only',
    selectable: false,
    children: [
      { value: 'web', label: 'Web experience' },
      { value: 'mobile', label: 'Mobile experience' },
    ],
  },
  {
    value: 'core',
    label: 'Core platform',
    children: [
      { value: 'identity', label: 'Identity · disabled', disabled: true },
      { value: 'data', label: 'Data platform' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="treeData"
      multiple
      :is-default-expand-all="true"
    />
    <span aria-live="polite">Selected: {{ selectedValues.join(', ') || 'none' }}</span>
  </div>
</template>
