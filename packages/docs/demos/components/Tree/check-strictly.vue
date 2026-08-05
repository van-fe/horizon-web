<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const checkStrictly = ref(false);
const selectedValues = ref<Array<string | number>>(['payment-failures']);
const treeData: HTreeNodeData[] = [
  {
    value: 'billing',
    label: 'Billing notifications',
    children: [
      { value: 'payment-failures', label: 'Payment failures' },
      { value: 'receipts', label: 'Receipt delivery' },
    ],
  },
  {
    value: 'operations',
    label: 'Operations notifications',
    children: [{ value: 'incidents', label: 'Incident updates' }],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="checkStrictly" label="Independent nodes" />
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="treeData"
      :check-strictly="checkStrictly"
      multiple
      :is-default-expand-all="true"
    />
    <span aria-live="polite">Selected: {{ selectedValues.join(', ') || 'none' }}</span>
  </div>
</template>
