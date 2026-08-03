<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeFilterMethodType, HTreeNodeData } from '@aurora/horizon-web';

const filterValue = ref('');
const selectedValues = ref<Array<string | number>>([]);
const treeData: HTreeNodeData[] = [
  {
    value: 'product',
    label: 'Product',
    children: [
      { value: 'maya', label: 'Maya Chen · Product lead' },
      { value: 'ines', label: 'Ines Park · Researcher' },
    ],
  },
  {
    value: 'engineering',
    label: 'Engineering',
    children: [
      { value: 'sam', label: 'Sam Lee · Staff engineer' },
      { value: 'ana', label: 'Ana Silva · Frontend engineer' },
    ],
  },
];
const filterMethod: HTreeFilterMethodType = (inputValue, node) =>
  String(node.label).toLowerCase().includes(inputValue.trim().toLowerCase());
</script>

<template>
  <h-tree
    v-model:filter-value="filterValue"
    v-model:selected-values="selectedValues"
    :tree-data="treeData"
    filterable
    :filter-method="filterMethod"
    :filter-input-props="{ clearable: true, placeholder: 'Find a teammate' }"
    :max-height="300"
    show-radio
  />
</template>
