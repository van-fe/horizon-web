<script setup lang="ts">
import { ref } from 'vue';
import { formatSelectionCount, policyOptions } from './options';

const value = ref<string[][]>([
  ['company', 'security', 'access-review'],
  ['company', 'people', 'remote-work'],
]);
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      class="cascader-selectable-demo__picker"
      aria-label="Policy set"
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

<style scoped>
.cascader-selectable-demo__picker {
  min-width: 0;
  max-width: 100%;
}
</style>
