<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValues = ref<Array<string | number>>([]);
const treeData = shallowRef<HTreeNodeData[]>(
  Array.from({ length: 80 }, (_, sectionIndex) => ({
    value: `section-${sectionIndex + 1}`,
    label: `Knowledge section ${String(sectionIndex + 1).padStart(2, '0')}`,
    children: Array.from({ length: 25 }, (_, articleIndex) => ({
      value: `article-${sectionIndex + 1}-${articleIndex + 1}`,
      label: `Article ${String(sectionIndex + 1).padStart(2, '0')}.${String(
        articleIndex + 1,
      ).padStart(2, '0')}`,
    })),
  })),
);
</script>

<template>
  <h-tree
    v-model:selected-values="selectedValues"
    :tree-data="treeData"
    use-virtual-scroll
    :max-height="320"
    multiple
  />
</template>
