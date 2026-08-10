<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValues = ref<Array<string | number>>(['analytics', 'reports', 'exports', 'platform']);
const treeData: HTreeNodeData[] = [
  {
    value: 'analytics',
    label: 'Analytics suite',
    children: [
      { value: 'reports', label: 'Reports' },
      { value: 'exports', label: 'Scheduled exports' },
      { value: 'dashboards', label: 'Dashboards' },
    ],
  },
  {
    value: 'platform',
    label: 'Platform suite',
    children: [
      { value: 'identity', label: 'Identity' },
      { value: 'automation', label: 'Automation' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__actions">
      <h-button
        size="small"
        @click="selectedValues = ['analytics', 'reports', 'exports', 'platform']"
      >
        Mixed values
      </h-button>
      <h-button size="small" type="normal" @click="selectedValues = ['analytics', 'platform']">
        Parents only
      </h-button>
    </div>
    <h-tree
      v-model:selected-values="selectedValues"
      :tree-data="treeData"
      multiple
      :is-default-expand-all="true"
    />
    <span aria-live="polite">{{ selectedValues.join(', ') }}</span>
  </div>
</template>
