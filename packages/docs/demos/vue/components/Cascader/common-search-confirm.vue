<script setup lang="ts">
import { ref } from 'vue';
import { formatSelectionCount, workspaceOptions } from './options';

const value = ref<string[][]>([['operations', 'customer-success', 'enterprise']]);
const status = ref('No pending changes');
</script>

<template>
  <div class="docs-demo">
    <h-cascader
      v-model="value"
      aria-label="Notification teams"
      placeholder="Search notification teams"
      :options="workspaceOptions"
      filterable
      multiple
      collapse-tags
      need-confirm
      :to-body="false"
      @confirm="status = 'Teams confirmed'"
      @cancel="status = 'Changes cancelled'"
    />
    <span aria-live="polite">{{ formatSelectionCount(value) }} · {{ status }}</span>
  </div>
</template>
