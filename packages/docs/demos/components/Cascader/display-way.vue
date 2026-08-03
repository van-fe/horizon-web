<script setup lang="ts">
import { ref } from 'vue';
import { formatPath, workspaceOptions } from './options';

const strategy = ref<'fullPath' | 'leaf'>('fullPath');
const value = ref<string[]>(['engineering', 'reliability', 'incident-response']);
</script>

<template>
  <div class="docs-demo">
    <h-segmented v-model:active-key="strategy" size="small">
      <h-segmented-item key="fullPath" label="Full path" />
      <h-segmented-item key="leaf" label="Leaf only" />
    </h-segmented>
    <h-cascader
      v-model="value"
      aria-label="Incident team"
      :options="workspaceOptions"
      :show-checked-strategy="strategy"
      :to-body="false"
    />
    <span aria-live="polite">{{ formatPath(value) }}</span>
  </div>
</template>
