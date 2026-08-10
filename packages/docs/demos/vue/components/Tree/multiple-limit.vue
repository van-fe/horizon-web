<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const limit = 3;
const selectedValues = ref<Array<string | number>>(['maya', 'omar']);
const treeData: HTreeNodeData[] = [
  {
    value: 'platform',
    label: 'Platform team',
    children: [
      { value: 'maya', label: 'Maya Chen' },
      { value: 'omar', label: 'Omar Khan' },
      { value: 'ines', label: 'Ines Park' },
    ],
  },
  {
    value: 'data',
    label: 'Data team',
    children: [
      { value: 'sam', label: 'Sam Lee' },
      { value: 'ana', label: 'Ana Silva' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="treeData"
      multiple
      :multiple-limit="limit"
      check-strictly
      :is-default-expand-all="true"
    />
    <span aria-live="polite">{{ selectedValues.length }} / {{ limit }} selected</span>
  </div>
</template>
