<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const showRadio = ref(true);
const department = ref<string | number>('customer-success');
const treeData: HTreeNodeData[] = [
  {
    value: 'customer',
    label: 'Customer organization',
    children: [
      { value: 'customer-success', label: 'Customer success' },
      { value: 'support', label: 'Technical support' },
    ],
  },
  {
    value: 'operations',
    label: 'Operations',
    children: [{ value: 'finance', label: 'Finance' }],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="showRadio" label="Show radios" />
    <h-tree-select
      v-model="department"
      :tree-data="treeData"
      :show-radio="showRadio"
      :check-on-click-leaf="true"
      placeholder="Choose a department"
      :to-body="false"
    />
    <span aria-live="polite">Selected: {{ department || 'none' }}</span>
  </div>
</template>
