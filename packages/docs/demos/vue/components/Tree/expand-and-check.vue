<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const expandOnClickNode = ref(true);
const checkOnClickNode = ref(false);
const selectedValues = ref<Array<string | number>>(['staging']);
const expandValues = ref<Array<string | number>>(['environments']);
const treeData: HTreeNodeData[] = [
  {
    value: 'environments',
    label: 'Deployment environments',
    children: [
      {
        value: 'non-production',
        label: 'Non-production',
        children: [
          { value: 'development', label: 'Development' },
          { value: 'staging', label: 'Staging' },
        ],
      },
      { value: 'production', label: 'Production' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="expandOnClickNode" label="Row expands" />
      <h-switch v-model="checkOnClickNode" label="Row selects" />
    </div>
    <h-tree
      v-model:selected-values="selectedValues"
      v-model:expand-values="expandValues"
      :tree-data="treeData"
      :expand-on-click-node="expandOnClickNode"
      :check-on-click-node="checkOnClickNode"
      multiple
    />
    <span aria-live="polite">
      {{ selectedValues.length }} selected · {{ expandValues.length }} expanded
    </span>
  </div>
</template>
