<script setup lang="ts">
import { computed, ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

type TagMode = 'all' | 'compact' | 'tooltip';

const tagMode = ref<TagMode>('compact');
const selectedValues = ref<Array<string | number>>(['admins', 'analysts', 'billing']);
const treeData: HTreeNodeData[] = [
  {
    value: 'internal',
    label: 'Internal users',
    children: [
      { value: 'admins', label: 'Workspace admins' },
      { value: 'analysts', label: 'Data analysts' },
      { value: 'operators', label: 'Service operators' },
    ],
  },
  {
    value: 'external',
    label: 'External users',
    children: [
      { value: 'billing', label: 'Billing contacts' },
      { value: 'partners', label: 'Solution partners' },
    ],
  },
];
const collapseTags = computed(() => tagMode.value !== 'all');
const collapseTagsTooltip = computed(() => tagMode.value === 'tooltip');
</script>

<template>
  <div class="docs-demo">
    <h-segmented v-model:active-key="tagMode" size="small">
      <h-segmented-item key="all" label="All tags" />
      <h-segmented-item key="compact" label="Compact" />
      <h-segmented-item key="tooltip" label="Tooltip" />
    </h-segmented>
    <h-tree-select
      v-model="selectedValues"
      :tree-data="treeData"
      multiple
      clearable
      :collapse-tags="collapseTags"
      :collapse-tags-tooltip="collapseTagsTooltip"
      :max-collapse-tags="2"
      placeholder="Choose audience groups"
      :to-body="false"
    />
    <span aria-live="polite">{{ selectedValues.length }} selected</span>
  </div>
</template>
