<script setup lang="ts">
import { h, ref } from 'vue';
import type { HTreeHighlightMethod, HTreeNodeData } from '@aurora/horizon-web';

const selectedValue = ref<string | number>();
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
          ? h('mark', { class: 'tree-select-highlight-match', key: index }, part)
          : part,
      ),
  );
};
</script>

<template>
  <h-tree-select
    v-model="selectedValue"
    :tree-data="treeData"
    filterable
    clearable
    :highlight-method="highlightMethod"
    search-input-placeholder="Search risk controls"
    placeholder="Choose a risk control"
    :to-body="false"
  />
</template>

<style scoped>
:deep(.tree-select-highlight-match) {
  border-radius: var(--h-radius-s);
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-default);
}
</style>
