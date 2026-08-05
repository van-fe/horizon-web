<script setup lang="ts">
import { computed, ref } from 'vue';
import { workspaceOptions } from './options';

type KeywordMode = 'always' | 'clear' | 'deselect';
type ReserveKeyword = boolean | 'reserve-deselect';

const mode = ref<KeywordMode>('always');
const value = ref<string[][]>([]);
const reserveKeyword = computed<ReserveKeyword>(() => {
  if (mode.value === 'clear') return false;
  if (mode.value === 'deselect') return 'reserve-deselect';
  return true;
});
</script>

<template>
  <div class="docs-demo">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item value="always" label="Always" />
      <h-segmented-item value="clear" label="Clear" />
      <h-segmented-item value="deselect" label="Deselect" />
    </h-segmented>
    <h-cascader
      v-model="value"
      aria-label="Team search"
      placeholder="Search teams"
      :options="workspaceOptions"
      filterable
      multiple
      collapse-tags
      :reserve-keyword="reserveKeyword"
      :to-body="false"
    />
  </div>
</template>
