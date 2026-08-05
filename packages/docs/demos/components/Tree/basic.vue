<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValues = ref<Array<string | number>>(['release-notes']);
const treeData: HTreeNodeData[] = [
  {
    value: 'product',
    label: 'Product handbook',
    children: [
      { value: 'principles', label: 'Product principles' },
      { value: 'release-notes', label: 'Release notes' },
      { value: 'roadmap', label: 'Public roadmap' },
    ],
  },
  {
    value: 'engineering',
    label: 'Engineering handbook',
    children: [
      { value: 'architecture', label: 'Architecture decisions' },
      { value: 'operations', label: 'Operations playbooks' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="treeData"
      show-radio
      show-line
      :is-default-expand-all="true"
    />
    <span aria-live="polite">Selected: {{ selectedValues[0] || 'none' }}</span>
  </div>
</template>
