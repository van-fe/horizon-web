<template>
  <div class="progress-list">
    <div v-for="item in items" :key="item.label">
      <span>{{ item.label }}</span>
      <h-progress :percentage="item.percentage" :status="item.status" />
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { label: 'Default', percentage: 50, status: undefined },
  { label: 'Success', percentage: 100, status: 'success' },
  { label: 'Warning', percentage: 76, status: 'warning' },
  { label: 'Exception', percentage: 50, status: 'exception' },
] as const;
</script>

<style scoped>
.progress-list {
  display: grid;
  gap: var(--h-spacing-4);
}

.progress-list > div {
  display: grid;
  gap: var(--h-spacing-2);
}

.progress-list span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
