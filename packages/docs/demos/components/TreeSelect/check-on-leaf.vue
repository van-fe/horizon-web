<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const checkOnClickLeaf = ref(true);
const selectedValues = ref<Array<string | number>>(['prod-eu']);
const treeData: HTreeNodeData[] = [
  {
    value: 'production',
    label: 'Production',
    children: [
      { value: 'prod-us', label: 'US cluster' },
      { value: 'prod-eu', label: 'EU cluster' },
    ],
  },
  {
    value: 'non-production',
    label: 'Non-production',
    children: [{ value: 'staging', label: 'Shared staging' }],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="checkOnClickLeaf" label="Leaf row selects" />
    <h-tree-select
      v-model="selectedValues"
      :tree-data="treeData"
      multiple
      :check-on-click-node="false"
      :check-on-click-leaf="checkOnClickLeaf"
      placeholder="Choose release destinations"
      :to-body="false"
    />
    <span aria-live="polite">Selected: {{ selectedValues.join(', ') || 'none' }}</span>
  </div>
</template>
