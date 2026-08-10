<template>
  <section class="docs-demo sortable-list-demo">
    <div class="docs-demo__controls">
      <h-button size="small" plain @click="reset">Reset order</h-button>
      <span class="sortable-list-demo__summary">Current: {{ summary }}</span>
    </div>

    <h-sortable-list v-model="tasks" item-key="id" item-disabled="locked" @sort="handleSort">
      <template #item="{ item, index }">
        <article class="sortable-list-demo__item">
          <div>
            <strong>{{ index + 1 }}. {{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </div>
          <span v-if="item.locked" class="sortable-list-demo__locked">Locked</span>
        </article>
      </template>
    </h-sortable-list>

    <p class="sortable-list-demo__result" aria-live="polite">{{ lastAction }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Task {
  id: string;
  title: string;
  description: string;
  locked?: boolean;
}

const initialTasks: Task[] = [
  { id: 'brief', title: 'Confirm release brief', description: 'Align scope and owners.' },
  {
    id: 'qa',
    title: 'Run accessibility QA',
    description: 'Verify keyboard and screen-reader paths.',
  },
  {
    id: 'approval',
    title: 'Collect final approval',
    description: 'Locked after sign-off.',
    locked: true,
  },
  {
    id: 'publish',
    title: 'Publish release notes',
    description: 'Share changes with product teams.',
  },
];

const tasks = ref(initialTasks.map(item => ({ ...item })));
const lastAction = ref('Drag a handle, or focus it and use the arrow, Home, or End keys.');
const summary = computed(() => tasks.value.map(item => item.title).join(' → '));

const handleSort = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
  lastAction.value = `Moved item ${oldIndex + 1} to position ${newIndex + 1}.`;
};
const reset = () => {
  tasks.value = initialTasks.map(item => ({ ...item }));
  lastAction.value = 'Order reset.';
};
</script>

<style scoped>
.sortable-list-demo {
  max-width: 680px;
}

.sortable-list-demo__summary {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.sortable-list-demo :deep(.h-sortable-list) {
  gap: var(--h-spacing-2);
}

.sortable-list-demo :deep(.h-sortable-list__item) {
  padding: var(--h-spacing-4);
  border: 1px solid var(--h-border-noninteractive);
  border-radius: var(--h-radius-m);
  background: var(--h-bg-default);
}

.sortable-list-demo__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-4);
}

.sortable-list-demo__item p,
.sortable-list-demo__result {
  margin: var(--h-spacing-2) 0 0;
  color: var(--h-text-secondary);
}

.sortable-list-demo__locked {
  flex: 0 0 auto;
  color: var(--h-text-tertiary);
  font-size: var(--h-text-sm);
}

@media (max-width: 560px) {
  .sortable-list-demo__item {
    align-items: flex-start;
  }
}
</style>
