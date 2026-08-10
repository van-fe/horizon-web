<script setup lang="ts">
import { ref } from 'vue';
import type { HTreeNodeData } from '@aurora/horizon-web';

const radioValue = ref<Array<string | number>>(['design']);
const checkboxValues = ref<Array<string | number>>(['design', 'security']);
const treeData: HTreeNodeData[] = [
  {
    value: 'reviewers',
    label: 'Review roles',
    children: [
      { value: 'design', label: 'Design review' },
      { value: 'security', label: 'Security review' },
      { value: 'localization', label: 'Localization review' },
    ],
  },
];
</script>

<template>
  <div class="docs-demo__grid">
    <h-tree
      v-model:selected-values="radioValue"
      :tree-data="treeData"
      show-radio
      :is-default-expand-all="true"
      aria-label="Radio selection"
    />
    <h-tree
      v-model:selected-values="checkboxValues"
      :tree-data="treeData"
      multiple
      show-checkbox
      :is-default-expand-all="true"
      aria-label="Checkbox selection"
    />
  </div>
</template>
