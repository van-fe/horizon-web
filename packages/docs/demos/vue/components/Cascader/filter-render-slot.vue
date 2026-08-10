<script setup lang="ts">
import { ref } from 'vue';
import { workspaceOptions } from './options';

const value = ref<string[]>([]);
</script>

<template>
  <h-cascader
    v-model="value"
    aria-label="Organization path"
    placeholder="Search organization paths"
    :options="workspaceOptions"
    filter
    clearable
    :to-body="false"
  >
    <template #searchPanelRender="{ paths }">
      <span class="search-result">
        <small>
          {{
            paths
              .slice(0, -1)
              .map(path => path.label)
              .join(' / ')
          }}
        </small>
        <strong>{{ paths.at(-1)?.label }}</strong>
      </span>
    </template>
  </h-cascader>
</template>

<style scoped>
.search-result {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-1);
}

.search-result small {
  color: var(--h-text-secondary);
  overflow-wrap: anywhere;
}
</style>
