<template>
  <div class="circle-list">
    <div v-for="item in items" :key="item.size">
      <h-progress type="circle" :percentage="item.percentage" :size="item.size" />
      <span>{{ item.size }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { percentage: 60, size: 'xs' },
  { percentage: 25, size: 's' },
  { percentage: 60, size: 'm' },
  { percentage: 70, size: 'l' },
] as const;
</script>

<style scoped>
.circle-list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--h-spacing-4);
}

.circle-list > div {
  display: grid;
  flex: 1 1 120px;
  justify-items: center;
  gap: var(--h-spacing-2);
}

.circle-list span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
