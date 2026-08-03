<script setup lang="ts">
import { computed, ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

type KeywordMode = 'always' | 'clear' | 'deselect' | 'sticky';
type ReserveKeyword = boolean | 'reserve-deselect' | 'reserve-special';

const mode = ref<KeywordMode>('always');
const selectedValues = ref<Array<string | number>>(['typescript']);
const treeData: HTreeNodeData[] = [
  {
    value: 'engineering',
    label: 'Engineering',
    children: [
      { value: 'typescript', label: 'TypeScript' },
      { value: 'testing', label: 'Test automation' },
      { value: 'observability', label: 'Observability' },
    ],
  },
  {
    value: 'product',
    label: 'Product',
    children: [{ value: 'research', label: 'User research' }],
  },
];
const reserveKeyword = computed<ReserveKeyword>(() => {
  if (mode.value === 'clear') return false;
  if (mode.value === 'deselect') return 'reserve-deselect';
  if (mode.value === 'sticky') return 'reserve-special';
  return true;
});
</script>

<template>
  <div class="docs-demo">
    <h-segmented v-model:active-key="mode" size="small" block>
      <h-segmented-item key="always" label="Always" />
      <h-segmented-item key="clear" label="Clear" />
      <h-segmented-item key="deselect" label="Deselect" />
      <h-segmented-item key="sticky" label="Sticky" />
    </h-segmented>
    <h-tree-select
      v-model="selectedValues"
      :tree-data="treeData"
      :reserve-keyword="reserveKeyword"
      multiple
      filterable
      collapse-tags
      search-input-placeholder="Filter skills"
      placeholder="Add reviewer skills"
      :to-body="false"
    />
  </div>
</template>
