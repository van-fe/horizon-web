<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

interface TaxonomyNode {
  code: string;
  text: string;
  items?: TaxonomyNode[];
}

const selectedValue = ref<string | number>('security-access');
const externalData: TaxonomyNode[] = [
  {
    code: 'security',
    text: 'Security controls',
    items: [
      { code: 'security-access', text: 'Access governance' },
      { code: 'security-audit', text: 'Audit evidence' },
    ],
  },
  {
    code: 'privacy',
    text: 'Privacy controls',
    items: [{ code: 'privacy-retention', text: 'Retention policy' }],
  },
];
const treeData = externalData as unknown as HTreeNodeData[];
</script>

<template>
  <div class="docs-demo">
    <h-tree-select
      v-model="selectedValue"
      :tree-data="treeData"
      :field-map="{ value: 'code', label: 'text', children: 'items' }"
      placeholder="Choose a compliance category"
      :to-body="false"
    />
    <span aria-live="polite">External key: {{ selectedValue || 'none' }}</span>
  </div>
</template>
