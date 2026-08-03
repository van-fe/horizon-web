<script setup lang="ts">
import { computed, ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const expandValues = ref<Array<string | number>>(['platform']);
const architectureTree: HTreeNodeData[] = [
  {
    value: 'platform',
    label: 'Platform',
    children: [
      {
        value: 'runtime',
        label: 'Runtime',
        children: [
          { value: 'gateway', label: 'API gateway' },
          { value: 'scheduler', label: 'Job scheduler' },
        ],
      },
      { value: 'identity', label: 'Identity' },
    ],
  },
  {
    value: 'data',
    label: 'Data',
    children: [
      { value: 'warehouse', label: 'Warehouse' },
      { value: 'pipelines', label: 'Pipelines' },
    ],
  },
];
const expandedSummary = computed(() =>
  expandValues.value.length ? expandValues.value.join(' › ') : 'All branches collapsed',
);

function openPlatform() {
  expandValues.value = ['platform', 'runtime'];
}

function openData() {
  expandValues.value = ['data'];
}

function collapseAll() {
  expandValues.value = [];
}
</script>

<template>
  <div class="tree-expand-values-demo" aria-label="Controlled architecture expansion">
    <h-space wrap>
      <h-button size="small" @click="openPlatform">Open platform</h-button>
      <h-button size="small" type="normal" @click="openData">Open data</h-button>
      <h-button size="small" type="normal" @click="collapseAll">Collapse all</h-button>
    </h-space>

    <p aria-live="polite">Expanded: {{ expandedSummary }}</p>

    <h-tree
      v-model:expand-values="expandValues"
      :tree-data="architectureTree"
      :is-default-expand-parent="true"
      show-line
    />
  </div>
</template>

<style scoped>
.tree-expand-values-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.tree-expand-values-demo p {
  margin: 0;
  color: var(--h-text-secondary);
}
</style>
