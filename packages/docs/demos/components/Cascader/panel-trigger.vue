<script setup lang="ts">
import { ref } from 'vue';
import { formatPath, workspaceOptions } from './options';

const trigger = ref<'click' | 'hover'>('click');
const value = ref<string[]>(['product', 'design-system', 'components']);
</script>

<template>
  <div class="docs-demo">
    <h-segmented v-model:active-key="trigger" size="small">
      <h-segmented-item key="click" label="Click" />
      <h-segmented-item key="hover" label="Hover" />
    </h-segmented>
    <h-cascader
      v-model="value"
      aria-label="Release team"
      :options="workspaceOptions"
      :expand-trigger="trigger"
      :to-body="false"
    />
    <span aria-live="polite">{{ formatPath(value) }}</span>
  </div>
</template>
