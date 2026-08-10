<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValues = ref<Array<string | number>>(['collection-18-item-7']);
const treeData: HTreeNodeData[] = Array.from({ length: 80 }, (_, collectionIndex) => ({
  value: `collection-${collectionIndex + 1}`,
  label: `Collection ${String(collectionIndex + 1).padStart(2, '0')}`,
  children: Array.from({ length: 25 }, (_, articleIndex) => ({
    value: `collection-${collectionIndex + 1}-item-${articleIndex + 1}`,
    label: `Article ${String(articleIndex + 1).padStart(2, '0')} · Operational reference`,
  })),
}));
</script>

<template>
  <h-tree-select
    v-model="selectedValues"
    :tree-data="treeData"
    multiple
    collapse-tags
    filterable
    :use-virtual-scroll="true"
    :height="288"
    placeholder="Search the knowledge base"
    :to-body="false"
  />
</template>
