<script setup lang="ts">
import type { HCascaderExtendOption } from '@aurora/horizon-web';
import { ref } from 'vue';
import { workspaceOptions } from './options';

const value = ref<string[]>([]);

function filterTeams(inputValue: string, paths: Array<{ label: string }>) {
  const keyword = inputValue.trim().toLocaleLowerCase();
  return paths.some(path => path.label.toLocaleLowerCase().includes(keyword));
}

function sortTeams(a: HCascaderExtendOption, b: HCascaderExtendOption) {
  return a.paths.length - b.paths.length || String(a.label).localeCompare(String(b.label));
}
</script>

<template>
  <h-cascader
    v-model="value"
    aria-label="Team search"
    placeholder="Try “design” or “release”"
    :options="workspaceOptions"
    filterable
    clearable
    :filter-method="filterTeams"
    :filter-max-result="4"
    :filter-result-sort="sortTeams"
    :to-body="false"
  />
</template>
