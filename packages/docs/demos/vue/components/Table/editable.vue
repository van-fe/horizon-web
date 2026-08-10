<script setup lang="ts">
import { ref } from 'vue';
import type { HTableCellEditContext } from '@aurora/horizon-web';

const roles = [
  { label: 'Designer', value: 'Designer' },
  { label: 'Engineer', value: 'Engineer' },
  { label: 'Product manager', value: 'Product manager' },
];
const team = ref([
  { id: 1, name: 'Mina Park', role: 'Designer', allocation: 80 },
  { id: 2, name: 'Noah Chen', role: 'Engineer', allocation: 100 },
  { id: 3, name: 'Iris Wang', role: 'Product manager', allocation: 60 },
]);
const editStatus = ref('Double-click an editable cell. Enter commits; Escape cancels.');

function validateName(context: HTableCellEditContext) {
  if (!String(context.value).trim()) throw new Error('Name cannot be empty.');
  return true;
}

function onEditStart(context: Omit<HTableCellEditContext, 'oldValue'>) {
  editStatus.value =
    'Editing ' + String(context.column.props.title ?? context.column.props.field) + '.';
}

function onEditCommit(context: HTableCellEditContext) {
  editStatus.value =
    String(context.column.props.title ?? context.column.props.field) +
    ' changed from ' +
    String(context.oldValue) +
    ' to ' +
    String(context.value) +
    '.';
}

function onEditCancel() {
  editStatus.value = 'Edit cancelled; the previous value was restored.';
}

function onEditError(_context: HTableCellEditContext, reason: unknown) {
  editStatus.value = reason instanceof Error ? reason.message : String(reason);
}
</script>

<template>
  <div class="table-edit-demo">
    <h-table
      v-model:data="team"
      row-key="id"
      edit-mode="row"
      @cell-edit-start="onEditStart"
      @cell-edit-commit="onEditCommit"
      @cell-edit-cancel="onEditCancel"
      @cell-edit-error="onEditError"
    >
      <h-table-column
        title="Name"
        field="name"
        min-width="170"
        editable
        :before-commit="validateName"
      />
      <h-table-column
        title="Role"
        field="role"
        min-width="180"
        editable
        editor-type="select"
        :editor-options="{ options: roles }"
      />
      <h-table-column
        title="Allocation %"
        field="allocation"
        width="140"
        editable
        editor-type="input-number"
        :editor-options="{ min: 0, max: 100 }"
        align="right"
        header-align="right"
      />
    </h-table>
    <p role="status" aria-live="polite">{{ editStatus }}</p>
  </div>
</template>

<style scoped>
.table-edit-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-edit-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
