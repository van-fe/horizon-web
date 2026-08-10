<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const expandOnClickNode = ref(true);
const checkOnClickNode = ref(false);
const selectedValues = ref<Array<string | number>>(['analytics']);
const treeData: HTreeNodeData[] = [
  {
    value: 'data-products',
    label: 'Data products',
    children: [
      { value: 'analytics', label: 'Analytics workspace' },
      { value: 'warehouse', label: 'Managed warehouse' },
    ],
  },
  {
    value: 'developer-products',
    label: 'Developer products',
    children: [{ value: 'registry', label: 'Artifact registry' }],
  },
];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="expandOnClickNode" label="Row expands" />
      <h-switch v-model="checkOnClickNode" label="Row selects" />
    </div>
    <h-tree-select
      v-model="selectedValues"
      :tree-data="treeData"
      multiple
      :expand-on-click-node="expandOnClickNode"
      :check-on-click-node="checkOnClickNode"
      placeholder="Choose catalog products"
      :to-body="false"
    />
    <span aria-live="polite">Selected: {{ selectedValues.join(', ') || 'none' }}</span>
  </div>
</template>
