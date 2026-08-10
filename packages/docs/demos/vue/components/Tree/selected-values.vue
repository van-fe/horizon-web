<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValues = ref<Array<string | number>>(['color', 'typography']);
const treeData: HTreeNodeData[] = [
  {
    value: 'foundations',
    label: 'Foundations',
    children: [
      { value: 'color', label: 'Color system' },
      { value: 'typography', label: 'Typography scale' },
      { value: 'spacing', label: 'Spacing tokens' },
    ],
  },
  {
    value: 'components',
    label: 'Components',
    children: [
      { value: 'forms', label: 'Form controls' },
      { value: 'navigation', label: 'Navigation' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__actions">
      <h-button size="small" @click="selectedValues = ['color', 'typography', 'spacing']">
        Foundations
      </h-button>
      <h-button size="small" type="normal" @click="selectedValues = ['forms', 'navigation']">
        Components
      </h-button>
    </div>
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="treeData"
      multiple
      :is-default-expand-all="true"
    />
    <span aria-live="polite">Bound values: {{ selectedValues.join(', ') || 'none' }}</span>
  </div>
</template>
