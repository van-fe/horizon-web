<script setup lang="ts">
import { ref } from 'vue';
import { workspaceOptions } from './options';

const value = ref<string[][]>([
  ['product', 'design-system', 'components'],
  ['engineering', 'web-platform', 'developer-experience'],
  ['operations', 'finance', 'planning'],
]);
</script>

<template>
  <h-cascader
    v-model="value"
    aria-label="Review teams"
    :options="workspaceOptions"
    multiple
    use-statistic
    statistic-text="Review teams"
    :to-body="false"
  />
</template>
