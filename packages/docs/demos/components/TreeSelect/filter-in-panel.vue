<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const builtIn = ref(true);
const filterValue = ref('');
const selectedValues = ref<Array<string | number>>(['api-gateway']);
const treeData: HTreeNodeData[] = [
  {
    value: 'runtime',
    label: 'Runtime services',
    children: [
      { value: 'api-gateway', label: 'API gateway' },
      { value: 'job-runner', label: 'Background job runner' },
    ],
  },
  {
    value: 'data',
    label: 'Data services',
    children: [
      { value: 'warehouse', label: 'Analytics warehouse' },
      { value: 'event-stream', label: 'Event stream' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="builtIn" label="Use built-in panel filter" />
    <h-tree-select
      v-model="selectedValues"
      :tree-data="treeData"
      panel-filterable
      :use-build-in-panel-filter="builtIn"
      :panel-filter-input-value="filterValue"
      panel-input-placeholder="Filter resources"
      multiple
      collapse-tags
      :max-height="300"
      placeholder="Choose resources"
      :to-body="false"
    >
      <template v-if="!builtIn" #panelHeaderRender>
        <h-input v-model="filterValue" clearable placeholder="Filter resources" />
      </template>
    </h-tree-select>
  </div>
</template>
