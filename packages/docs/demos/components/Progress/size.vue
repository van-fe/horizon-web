<template>
  <div class="progress-list">
    <div v-for="item in items" :key="item.size">
      <span>{{ item.size }}</span>
      <h-progress :percentage="item.percentage" :size="item.size" />
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { size: 'xs', percentage: 100 },
  { size: 's', percentage: 100 },
  { size: 'm', percentage: 50 },
  { size: 'l', percentage: 75 },
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
