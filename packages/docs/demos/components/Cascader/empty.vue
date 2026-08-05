<script setup lang="ts">
import { ref } from 'vue';

const value = ref<string[]>([]);
</script>

<template>
  <h-cascader
    v-model="value"
    aria-label="Workspace"
    placeholder="Choose a workspace"
    :options="[]"
    :to-body="false"
  >
    <template #empty>
      <h-empty description="No workspaces available" />
    </template>
  </h-cascader>
</template>
