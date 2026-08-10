<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const limit = 3;
const selectedValues = ref<Array<string | number>>(['us-east', 'eu-central']);
const treeData: HTreeNodeData[] = [
  {
    value: 'americas',
    label: 'Americas',
    children: [
      { value: 'us-east', label: 'US East · Virginia' },
      { value: 'us-west', label: 'US West · Oregon' },
      { value: 'ca-central', label: 'Canada Central · Toronto' },
    ],
  },
  {
    value: 'emea',
    label: 'Europe & Middle East',
    children: [
      { value: 'eu-central', label: 'EU Central · Frankfurt' },
      { value: 'eu-west', label: 'EU West · Dublin' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo">
    <h-tree-select
      v-model="selectedValues"
      :tree-data="treeData"
      multiple
      :multiple-limit="limit"
      collapse-tags
      placeholder="Choose up to three regions"
      :to-body="false"
    />
    <span aria-live="polite">{{ selectedValues.length }} / {{ limit }} selected</span>
  </div>
</template>
