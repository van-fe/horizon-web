<script setup lang="ts">
import { computed, ref } from 'vue';
import { formatSelectionCount, workspaceOptions } from './options';

type TagMode = 'all' | 'compact' | 'tooltip';

const mode = ref<TagMode>('compact');
const value = ref<string[][]>([
  ['product', 'design-system', 'accessibility'],
  ['product', 'growth', 'retention'],
  ['engineering', 'web-platform', 'frontend'],
]);
const collapseTags = computed(() => mode.value !== 'all');
const collapseTagsTooltip = computed(() => mode.value === 'tooltip');
</script>

<template>
  <div class="docs-demo">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item value="all" label="All tags" />
      <h-segmented-item value="compact" label="Compact" />
      <h-segmented-item value="tooltip" label="Tooltip" />
    </h-segmented>
    <h-cascader
      v-model="value"
      aria-label="Review teams"
      :options="workspaceOptions"
      multiple
      clearable
      :collapse-tags="collapseTags"
      :collapse-tags-tooltip="collapseTagsTooltip"
      :max-collapse-tags="2"
      :to-body="false"
    />
    <span aria-live="polite">{{ formatSelectionCount(value) }}</span>
  </div>
</template>
