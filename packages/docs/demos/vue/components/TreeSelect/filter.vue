<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeFilterMethodType, HTreeNodeData } from '@aurora/horizon-web';

const owner = ref<string | number>();
const treeData: HTreeNodeData[] = [
  {
    value: 'design',
    label: 'Design',
    children: [
      { value: 'maya', label: 'Maya Chen · Product design' },
      { value: 'ines', label: 'Ines Silva · Research' },
    ],
  },
  {
    value: 'engineering',
    label: 'Engineering',
    children: [
      { value: 'noah', label: 'Noah Williams · Platform' },
      { value: 'ana', label: 'Ana Costa · Reliability' },
    ],
  },
];
const filterMethod: HTreeFilterMethodType = (inputValue, node) =>
  String(node.label).toLowerCase().includes(inputValue.trim().toLowerCase());
</script>

<template>
  <h-tree-select
    v-model="owner"
    :tree-data="treeData"
    filterable
    clearable
    :filter-method="filterMethod"
    search-input-placeholder="Search people or disciplines"
    empty-text="No matching owner"
    placeholder="Choose an owner"
    :to-body="false"
  />
</template>
