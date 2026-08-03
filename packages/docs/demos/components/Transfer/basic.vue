<template>
  <section class="transfer-basic-demo">
    <h-transfer
      v-model="selectedKeys"
      class="transfer-basic-demo__transfer"
      :data="workspaces"
      :titles="['Available workspaces', 'Review scope']"
      filterable
      placeholder="Search workspace"
    />
    <div class="transfer-basic-demo__summary" aria-live="polite">
      <strong>{{ selectedKeys.length }} workspaces selected</strong>
      <span>{{ selectedLabels }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const workspaces = [
  { key: 'design-system', label: 'Design system' },
  { key: 'web-platform', label: 'Web platform' },
  { key: 'mobile-foundations', label: 'Mobile foundations' },
  { key: 'release-ops', label: 'Release operations' },
  { key: 'legacy-console', label: 'Legacy console · archived', disabled: true },
];

const selectedKeys = ref(['design-system', 'web-platform']);
const selectedLabels = computed(() =>
  workspaces
    .filter(item => selectedKeys.value.includes(item.key))
    .map(item => item.label)
    .join(' · '),
);
</script>

<style scoped>
.transfer-basic-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.transfer-basic-demo__summary {
  margin: 0;
}

.transfer-basic-demo__summary span {
  color: var(--h-text-secondary);
}

.transfer-basic-demo__transfer {
  width: 100%;
}

.transfer-basic-demo__summary {
  display: grid;
  gap: var(--h-spacing-1);
  padding: var(--h-spacing-3) var(--h-spacing-4);
  background: var(--h-bg-weak-default);
  border-radius: var(--h-radius-m);
}

@media (max-width: 520px) {
  .transfer-basic-demo__transfer {
    flex-direction: column;
  }
}
</style>
