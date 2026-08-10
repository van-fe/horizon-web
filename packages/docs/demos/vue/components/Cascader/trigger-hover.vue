<script setup lang="ts">
import { ref } from 'vue';
import { formatPath, workspaceOptions } from './options';

const value = ref<string[]>(['operations', 'finance', 'planning']);
const status = ref('Panel closed');
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      aria-label="Team browser"
      placeholder="Hover to browse teams"
      :options="workspaceOptions"
      trigger="hover"
      expand-trigger="hover"
      :hover-show-delay="120"
      :hover-hide-delay="300"
      :to-body="false"
      @dropdown-visible-change="visible => (status = visible ? 'Panel open' : 'Panel closed')"
    />
    <span aria-live="polite">{{ status }} · {{ formatPath(value) }}</span>
  </div>
</template>
