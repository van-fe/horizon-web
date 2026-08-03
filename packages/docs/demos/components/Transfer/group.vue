<template>
  <section class="transfer-group-demo">
    <h-transfer
      v-model="selectedKeys"
      class="transfer-group-demo__transfer"
      :data="checks"
      :titles="['Quality checks', 'Required for launch']"
      target-order="original"
    />
    <h-space wrap>
      <h-tag v-for="label in selectedLabels" :key="label" is-pure>{{ label }}</h-tag>
    </h-space>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const checks = [
  { key: 'experience', label: 'Experience', isGroup: true },
  { key: 'accessibility', label: 'Accessibility review' },
  { key: 'localization', label: 'Localization review' },
  { key: 'engineering', label: 'Engineering', isGroup: true },
  { key: 'performance', label: 'Performance budget' },
  { key: 'rollback', label: 'Rollback rehearsal' },
  { key: 'operations', label: 'Operations', isGroup: true },
  { key: 'support', label: 'Support handoff' },
  { key: 'status-page', label: 'Status page update' },
];

const selectedKeys = ref(['accessibility', 'performance', 'support']);
const selectedLabels = computed(() =>
  checks
    .filter(item => !item.isGroup && selectedKeys.value.includes(item.key))
    .map(item => item.label),
);
</script>

<style scoped>
.transfer-group-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.transfer-group-demo__transfer {
  width: 100%;
}

@media (max-width: 520px) {
  .transfer-group-demo__transfer {
    flex-direction: column;
  }
}
</style>
