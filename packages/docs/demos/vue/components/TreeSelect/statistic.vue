<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const selectedValues = ref<Array<string | number>>(['owners', 'operators', 'security']);
const treeData: HTreeNodeData[] = [
  {
    value: 'operations',
    label: 'Operations',
    children: [
      { value: 'owners', label: 'Service owners' },
      { value: 'operators', label: 'On-call operators' },
    ],
  },
  {
    value: 'governance',
    label: 'Governance',
    children: [
      { value: 'security', label: 'Security reviewers' },
      { value: 'privacy', label: 'Privacy reviewers' },
    ],
  },
];
</script>

<template>
  <h-tree-select
    v-model="selectedValues"
    :tree-data="treeData"
    multiple
    :use-statistic="true"
    statistic-text="Recipients"
    placeholder="Choose recipients"
    :to-body="false"
  />
</template>
