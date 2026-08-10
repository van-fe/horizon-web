<template>
  <div class="checkbox-indeterminate-demo">
    <div class="checkbox-indeterminate-demo__summary">
      <h-checkbox v-model="checkAll" :indeterminate="indeterminate">Select all tasks</h-checkbox>
      <span aria-live="polite">{{ selectedTasks.length }} / {{ tasks.length }}</span>
    </div>
    <h-checkbox-group v-model="selectedTasks">
      <h-checkbox v-for="task in tasks" :key="task.id" :label="task.id">
        {{ task.label }}
      </h-checkbox>
    </h-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const tasks = [
  { id: 'copy', label: 'Review copy' },
  { id: 'visual', label: 'Run visual QA' },
  { id: 'release', label: 'Prepare release note' },
];
const selectedTasks = ref(['copy']);
const indeterminate = computed(
  () => selectedTasks.value.length > 0 && selectedTasks.value.length < tasks.length,
);
const checkAll = computed({
  get: () => selectedTasks.value.length === tasks.length,
  set: value => {
    selectedTasks.value = value ? tasks.map(task => task.id) : [];
  },
});
</script>

<style scoped>
.checkbox-indeterminate-demo {
  display: grid;
  max-width: 420px;
  gap: var(--h-spacing-4);
}

.checkbox-indeterminate-demo__summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-4);
}

.checkbox-indeterminate-demo__summary span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.checkbox-indeterminate-demo :deep(.h-checkbox-group) {
  display: grid;
  gap: var(--h-spacing-3);
  padding-left: var(--h-spacing-5);
}
</style>
