<script setup lang="ts">
import { computed, ref } from 'vue';
import { workspaceOptions } from './options';

const value = ref<string[]>(['engineering', 'web-platform', 'frontend']);
const selectedTeam = computed(() => value.value.at(-1)?.replaceAll('-', ' ') ?? 'Not assigned');
</script>

<template>
  <h-cascader
    v-model="value"
    aria-label="Release owner"
    :options="workspaceOptions"
    :to-body="false"
  >
    <template #selectRender>Owner · {{ selectedTeam }}</template>
  </h-cascader>
</template>
