<script setup lang="ts">
import { ref } from 'vue';
import { workspaceOptions } from './options';

type FilterMode = 'trigger' | 'built-in' | 'custom';

const mode = ref<FilterMode>('trigger');
const value = ref<string[]>(['product', 'growth', 'retention']);
const panelKeyword = ref('');
</script>

<template>
  <div class="docs-demo">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item value="trigger" label="Trigger" />
      <h-segmented-item value="built-in" label="Panel" />
      <h-segmented-item value="custom" label="Custom" />
    </h-segmented>
    <h-cascader
      v-model="value"
      aria-label="Search teams"
      placeholder="Search teams"
      :options="workspaceOptions"
      :filterable="mode === 'trigger'"
      :panel-filter-option="mode !== 'trigger'"
      :use-build-in-panel-filter="mode === 'built-in'"
      :panel-filter-input-value="panelKeyword"
      panel-input-placeholder="Filter teams"
      :to-body="false"
    >
      <template v-if="mode === 'custom'" #panelHeaderRender>
        <h-input
          v-model="panelKeyword"
          aria-label="Filter panel teams"
          placeholder="Filter teams"
        />
      </template>
    </h-cascader>
  </div>
</template>
