<template>
  <div class="content-list">
    <div v-for="item in lineItems" :key="item.label">
      <span>{{ item.label }}</span>
      <h-progress
        :percentage="item.percentage"
        :content="item.content"
        :placement="item.placement"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const lineItems = [
  { label: 'Default', percentage: 100, content: 'Ready', placement: undefined },
  { label: 'Right top', percentage: 100, content: 'Complete', placement: 'right-top' },
  { label: 'Right bottom', percentage: 80, content: '8 of 10', placement: 'right-bottom' },
  { label: 'Follow progress', percentage: 30, content: 'Processing', placement: 'follow' },
] as const;
</script>

<style scoped>
.content-list {
  display: grid;
  gap: var(--h-spacing-4);
}

.content-list > div {
  display: grid;
  gap: var(--h-spacing-2);
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
