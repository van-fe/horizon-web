<script setup lang="ts">
import { ref } from 'vue';
import { formatPath, workspaceOptions } from './options';

const expandStrictly = ref(true);
const value = ref<string[]>(['product', 'design-system']);
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="expandStrictly" label="Keep current panel open" />
    <h-cascader
      v-model="value"
      aria-label="Release scope"
      :options="workspaceOptions"
      show-radio
      check-strictly
      :expand-strictly="expandStrictly"
      :to-body="false"
    />
    <span aria-live="polite">{{ formatPath(value) }}</span>
  </div>
</template>
