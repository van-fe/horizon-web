<script setup lang="ts">
import { ref } from 'vue';
import type { HTabValue } from '@aurora/horizon-web';

interface PhaseTab {
  key: number;
  label: string;
}

const activeKey = ref(2);
const status = ref('Drag a phase to change the roadmap order; Review is fixed.');
const phases = ref<PhaseTab[]>([
  { key: 1, label: 'Discovery' },
  { key: 2, label: 'Design' },
  { key: 3, label: 'Review' },
  { key: 4, label: 'Build' },
  { key: 5, label: 'Launch' },
]);

function onSort(current: number, target: number, keys: HTabValue[]) {
  const byKey = new Map(phases.value.map(phase => [phase.key, phase]));
  phases.value = keys
    .map(key => byKey.get(Number(key)))
    .filter((phase): phase is PhaseTab => Boolean(phase));
  status.value = `Moved ${current + 1} to ${target + 1}: ${phases.value
    .map(phase => phase.label)
    .join(' → ')}`;
}
</script>

<template>
  <div class="tabs-drag-demo">
    <h-tabs v-model:active-key="activeKey" draggable type="card" @sort="onSort">
      <transition-group name="tabs-drag">
        <h-tab
          v-for="phase in phases"
          :key="phase.key"
          :label="phase.label"
          :draggable="phase.key !== 3"
        />
      </transition-group>
    </h-tabs>
    <p aria-live="polite">{{ status }}</p>
  </div>
</template>

<style scoped>
.tabs-drag-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-4);
}

.tabs-drag-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
  overflow-wrap: anywhere;
}

.tabs-drag-move,
.tabs-drag-enter-active,
.tabs-drag-leave-active {
  transition: all var(--h-tabs-transition-duration) var(--h-tabs-transition-timing-function);
}
</style>
