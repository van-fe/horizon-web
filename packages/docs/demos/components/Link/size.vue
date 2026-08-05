<script setup lang="ts">
const sizes = [
  { value: 'small', label: '小号链接' },
  { value: 'medium', label: '中号链接' },
  { value: 'large', label: '大号链接' },
] as const;
</script>

<template>
  <div class="size-comparison">
    <div v-for="item in sizes" :key="item.value">
      <span>{{ item.value }}</span>
      <h-link :size="item.value">{{ item.label }}</h-link>
      <h-link :size="item.value" :loading="true">加载中</h-link>
    </div>
  </div>
</template>

<style scoped>
.size-comparison {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.size-comparison > div {
  display: grid;
  justify-items: start;
  gap: 12px;
  padding: 18px;
  border: 1px solid var(--h-border-default);
  border-radius: 10px;
  background: var(--h-bg-default);
}

.size-comparison span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 560px) {
  .size-comparison {
    grid-template-columns: 1fr;
  }
}
</style>
