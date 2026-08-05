<script setup lang="ts">
import { ref } from 'vue';
import { workspaceOptions } from './options';

const strategy = ref<'fullPath' | 'leaf'>('fullPath');
const value = ref<string[][]>([['product', 'legacy-app', 'mobile-v1']]);
</script>

<template>
  <div class="docs-demo">
    <h-segmented v-model:active-key="strategy" size="small">
      <h-segmented-item value="fullPath" label="Full path" />
      <h-segmented-item value="leaf" label="Leaf only" />
    </h-segmented>
    <h-cascader
      v-model="value"
      aria-label="Saved release scope"
      :options="workspaceOptions"
      multiple
      collapse-tags
      :show-checked-strategy="strategy"
      :to-body="false"
    />
  </div>
</template>
