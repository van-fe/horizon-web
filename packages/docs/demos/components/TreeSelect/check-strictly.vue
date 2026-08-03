<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const checkStrictly = ref(true);
const selectedValues = ref<Array<string | number>>(['critical']);
const treeData: HTreeNodeData[] = [
  {
    value: 'incidents',
    label: 'Incident notifications',
    children: [
      { value: 'critical', label: 'Critical incidents' },
      { value: 'degraded', label: 'Degraded services' },
    ],
  },
  {
    value: 'changes',
    label: 'Change notifications',
    children: [{ value: 'deployments', label: 'Production deployments' }],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="checkStrictly" label="Independent nodes" />
    <h-tree-select
      v-model="selectedValues"
      :tree-data="treeData"
      :check-strictly="checkStrictly"
      multiple
      collapse-tags
      placeholder="Choose notification topics"
      :to-body="false"
    />
    <span aria-live="polite">Selected: {{ selectedValues.join(', ') || 'none' }}</span>
  </div>
</template>
