<script setup lang="ts">
import { ref } from 'vue';
import { formatSelectionCount, policyOptions } from './options';

const value = ref<string[][]>([['team', 'delivery', 'release']]);
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      aria-label="Policy owners"
      placeholder="Search policy areas"
      :options="policyOptions"
      multiple
      filterable
      collapse-tags
      use-filter-check-all
      :to-body="false"
    />
    <span aria-live="polite">{{ formatSelectionCount(value) }}</span>
  </div>
</template>
