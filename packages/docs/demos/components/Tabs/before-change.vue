<script setup lang="ts">
import { ref } from 'vue';
import type { HTabValue } from '@aurora/horizon-web';

const activeKey = ref('draft');
const hasUnsavedChanges = ref(true);
const status = ref('Draft contains unsaved changes.');

function beforeChange(nextKey: HTabValue) {
  if (hasUnsavedChanges.value && nextKey !== activeKey.value) {
    status.value = 'Switch blocked: save the draft first.';
    return false;
  }
  status.value = `${String(nextKey)} opened.`;
  return true;
}

function toggleDraftState() {
  hasUnsavedChanges.value = !hasUnsavedChanges.value;
  if (hasUnsavedChanges.value) activeKey.value = 'draft';
  status.value = hasUnsavedChanges.value
    ? 'Draft changed; switching is protected again.'
    : 'Draft saved; other tabs are available.';
}
</script>

<template>
  <div class="tabs-guard-demo">
    <h-tabs v-model:active-key="activeKey" type="card" :before-change="beforeChange">
      <h-tab key="draft" label="Draft" />
      <h-tab key="preview" label="Preview" />
      <h-tab key="publish" label="Publish" />
    </h-tabs>
    <h-button class="tabs-guard-demo__action" size="small" @click="toggleDraftState">
      {{ hasUnsavedChanges ? 'Save draft' : 'Simulate edit' }}
    </h-button>
    <p role="status" aria-live="polite">{{ status }}</p>
  </div>
</template>

<style scoped>
.tabs-guard-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-guard-demo__action {
  justify-self: start;
}

.tabs-guard-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
