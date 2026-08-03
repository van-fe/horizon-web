<template>
  <p class="table-demo-hint">Double-click a cell to edit. Enter commits and Escape cancels.</p>
  <h-table v-model:data="data" row-key="id" edit-mode="row" @cell-edit-error="onError">
    <h-table-column title="Name" field="name" editable :before-commit="validateName" />
    <h-table-column
      title="Role"
      field="role"
      editable
      editor-type="select"
      :editor-options="{ options: roles }"
    />
    <h-table-column
      title="Score"
      field="score"
      editable
      editor-type="input-number"
      :editor-options="{ min: 0, max: 100 }"
    />
  </h-table>
  <p v-if="error" class="table-demo-error" role="alert">{{ error }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HTableCellEditContext } from '@aurora/horizon-web';

const data = ref([
  { id: 1, name: 'Alice', role: 'designer', score: 92 },
  { id: 2, name: 'Bob', role: 'engineer', score: 88 },
  { id: 3, name: 'Carol', role: 'manager', score: 95 },
]);
const roles = [
  { label: 'Designer', value: 'designer' },
  { label: 'Engineer', value: 'engineer' },
  { label: 'Manager', value: 'manager' },
];
const error = ref('');

async function validateName(context: HTableCellEditContext) {
  await new Promise(resolve => setTimeout(resolve, 250));
  if (!String(context.value).trim()) throw new Error('Name cannot be empty');
}

function onError(_context: HTableCellEditContext, reason: unknown) {
  error.value = reason instanceof Error ? reason.message : String(reason);
}
</script>

<style scoped>
.table-demo-hint {
  color: var(--h-text-secondary);
}

.table-demo-error {
  color: var(--h-text-danger-default);
}
</style>
