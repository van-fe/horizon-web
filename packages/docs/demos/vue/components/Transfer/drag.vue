<template>
  <section class="transfer-drag-demo">
    <h-transfer
      v-model="selectedKeys"
      class="transfer-drag-demo__transfer"
      :data="runbookSteps"
      :titles="['Available steps', 'Handoff order']"
      target-order="push"
      draggable
    />
    <ol class="transfer-drag-demo__order" aria-live="polite">
      <li v-for="(label, index) in selectedLabels" :key="label">
        <span>{{ index + 1 }}</span>
        {{ label }}
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const runbookSteps = [
  { key: 'freeze', label: 'Freeze production changes' },
  { key: 'notify', label: 'Notify support leads' },
  { key: 'deploy', label: 'Deploy the release candidate' },
  { key: 'verify', label: 'Verify service health' },
  { key: 'announce', label: 'Publish the release note' },
];

const selectedKeys = ref(['freeze', 'deploy', 'verify', 'announce']);
const selectedLabels = computed(() =>
  selectedKeys.value.map(
    key => runbookSteps.find(step => step.key === key)?.label ?? 'Unknown runbook step',
  ),
);
</script>

<style scoped>
.transfer-drag-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.transfer-drag-demo__transfer {
  width: 100%;
}

.transfer-drag-demo__order {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-2);
  padding: 0;
  margin: 0;
  list-style: none;
}

.transfer-drag-demo__order li {
  display: inline-flex;
  align-items: center;
  gap: var(--h-spacing-2);
  padding: var(--h-spacing-2) var(--h-spacing-3);
  background: var(--h-bg-weak-default);
  border-radius: var(--h-radius-m);
}

.transfer-drag-demo__order span {
  display: inline-grid;
  width: var(--h-spacing-6);
  height: var(--h-spacing-6);
  place-items: center;
  color: var(--h-text-brand-default);
  font-size: var(--h-text-sm);
  background: var(--h-bg-default);
  border: 1px solid var(--h-border-brand-default);
  border-radius: var(--h-radius-circle);
}

@media (max-width: 520px) {
  .transfer-drag-demo__transfer {
    flex-direction: column;
  }
}
</style>
