<script setup lang="ts">
import { ref } from 'vue';

const score = ref(3);
const sizes = [
  { label: 'small', value: 'small' },
  { label: 'large', value: 'large' },
  { label: '32px', value: '32' },
];
</script>

<template>
  <div class="size-list">
    <div v-for="item in sizes" :key="item.value">
      <span>{{ item.label }}</span>
      <h-rate v-model="score" :size="item.value" />
    </div>
  </div>
</template>

<style scoped>
.size-list {
  display: grid;
  gap: var(--h-spacing-4);
}

.size-list > div {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: center;
  gap: var(--h-spacing-4);
}

.size-list span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
