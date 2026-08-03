<script setup lang="ts">
import { h, ref } from 'vue';
import type { HTreeHighlightMethod, HTreeNodeData } from '@aurora/horizon-web';

const filterValue = ref('risk');
const selectedValues = ref<Array<string | number>>([]);
const treeData: HTreeNodeData[] = [
  {
    value: 'operational',
    label: 'Operational risk',
    children: [
      { value: 'supplier', label: 'Supplier risk review' },
      { value: 'capacity', label: 'Capacity risk assessment' },
    ],
  },
  {
    value: 'financial',
    label: 'Financial controls',
    children: [{ value: 'fraud', label: 'Fraud risk review' }],
  },
];
const highlightMethod: HTreeHighlightMethod = (inputValue, node) => {
  const label = node.stringLabel ?? String(node.label);
  if (!inputValue) return label;
  const escaped = inputValue.replace(/[.*+?^()|[\]\\]/g, '\\$&');
  const matcher = new RegExp(`(${escaped})`, 'ig');
  return h(
    'span',
    label
      .split(matcher)
      .map((part, index) =>
        part.toLowerCase() === inputValue.toLowerCase()
          ? h('mark', { class: 'tree-highlight-match', key: index }, part)
          : part,
      ),
  );
};
</script>

<template>
  <h-tree
    v-model:filter-value="filterValue"
    v-model:selected-values="selectedValues"
    :tree-data="treeData"
    filterable
    :highlight-method="highlightMethod"
    :filter-input-props="{ clearable: true, placeholder: 'Filter risk controls' }"
    :max-height="300"
    multiple
  />
</template>

<style scoped>
:deep(.tree-highlight-match) {
  border-radius: var(--h-radius-s);
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-default);
}
</style>
