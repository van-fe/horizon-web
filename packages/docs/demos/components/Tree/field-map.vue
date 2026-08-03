<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

interface TaxonomyNode {
  key: string;
  text: string;
  items?: TaxonomyNode[];
}

const selectedValues = ref<Array<string | number>>(['tax-eu']);
const externalData: TaxonomyNode[] = [
  {
    key: 'tax',
    text: 'Tax domains',
    items: [
      { key: 'tax-us', text: 'US sales tax' },
      { key: 'tax-eu', text: 'EU value-added tax' },
    ],
  },
  {
    key: 'privacy',
    text: 'Privacy domains',
    items: [{ key: 'privacy-gdpr', text: 'GDPR' }],
  },
];
const treeData = externalData as unknown as HTreeNodeData[];
</script>

<template>
  <div class="docs-demo">
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="treeData"
      :field-map="{ value: 'key', label: 'text', children: 'items' }"
      multiple
      :is-default-expand-all="true"
    />
    <span aria-live="polite">External keys: {{ selectedValues.join(', ') || 'none' }}</span>
  </div>
</template>
