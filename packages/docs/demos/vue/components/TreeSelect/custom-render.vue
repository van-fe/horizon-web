<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValues = ref<Array<string | number>>(['prototype']);
const treeData: HTreeNodeData[] = [
  {
    value: 'discovery',
    label: 'Discovery',
    state: 'complete',
    children: [
      { value: 'research', label: 'Customer research', state: 'complete' },
      { value: 'prototype', label: 'Prototype', state: 'active' },
    ],
  },
  {
    value: 'delivery',
    label: 'Delivery',
    state: 'waiting',
    children: [{ value: 'beta', label: 'Private beta', state: 'waiting' }],
  },
];

function tagType(state: unknown): 'success' | 'info' | 'warning' {
  if (state === 'complete') return 'success';
  if (state === 'active') return 'info';
  return 'warning';
}
</script>

<template>
  <h-tree-select
    v-model="selectedValues"
    :tree-data="treeData"
    multiple
    collapse-tags
    :is-default-expand-all="true"
    placeholder="Choose workstreams"
    :to-body="false"
  >
    <template #treeNodeRender="{ data }">
      <span class="custom-tree-node">
        <span>{{ data.label }}</span>
        <h-tag :type="tagType(data.state)" size="small" plain>{{ data.state }}</h-tag>
      </span>
    </template>
  </h-tree-select>
</template>

<style scoped>
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  gap: var(--h-spacing-2);
}
</style>
