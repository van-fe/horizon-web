<script setup lang="ts">
import { ref } from 'vue';
import { formatSelectionCount, policyOptions } from './options';

const checkStrictly = ref(true);
const value = ref<string[][]>([['team', 'delivery', 'release']]);
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="checkStrictly" label="Independent nodes" />
    <h-cascader
      v-model="value"
      aria-label="Applicable policies"
      :options="policyOptions"
      multiple
      collapse-tags
      :check-strictly="checkStrictly"
      :to-body="false"
    />
    <span aria-live="polite">{{ formatSelectionCount(value) }}</span>
  </div>
</template>
