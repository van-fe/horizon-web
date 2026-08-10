<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const checkOnClickLeaf = ref(true);
const selectedValues = ref<Array<string | number>>([]);
const treeData: HTreeNodeData[] = [
  {
    value: 'regions',
    label: 'Release regions',
    children: [
      {
        value: 'americas',
        label: 'Americas',
        children: [
          { value: 'us-east', label: 'US East' },
          { value: 'ca-central', label: 'Canada Central' },
        ],
      },
      {
        value: 'europe',
        label: 'Europe',
        children: [{ value: 'eu-west', label: 'EU West' }],
      },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="checkOnClickLeaf" label="Leaf row selects" />
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="treeData"
      :check-on-click-leaf="checkOnClickLeaf"
      multiple
      :is-default-expand-all="true"
    />
    <span aria-live="polite">Selected: {{ selectedValues.join(', ') || 'none' }}</span>
  </div>
</template>
