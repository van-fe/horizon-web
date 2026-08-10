<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const expandValues = ref<Array<string | number>>(['engineering']);
const owner = ref<string | number>('platform');
const treeData: HTreeNodeData[] = [
  {
    value: 'product',
    label: 'Product',
    children: [
      { value: 'growth', label: 'Growth' },
      { value: 'experience', label: 'Customer experience' },
    ],
  },
  {
    value: 'engineering',
    label: 'Engineering',
    children: [
      { value: 'platform', label: 'Platform' },
      { value: 'applications', label: 'Applications' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__actions">
      <h-button size="small" @click="expandValues = ['product']">Open product</h-button>
      <h-button size="small" type="normal" @click="expandValues = ['engineering']">
        Open engineering
      </h-button>
    </div>
    <h-tree-select
      v-model="owner"
      v-model:expand-values="expandValues"
      :tree-data="treeData"
      placeholder="Choose an owning team"
      show-line
      :to-body="false"
    />
    <span aria-live="polite">Expanded: {{ expandValues.join(', ') || 'none' }}</span>
  </div>
</template>
