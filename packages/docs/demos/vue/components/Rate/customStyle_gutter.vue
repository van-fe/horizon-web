<script setup lang="ts">
import { ref } from 'vue';

const compactScore = ref(4);
const relaxedScore = ref(4);
</script>

<template>
  <div class="rate-options">
    <div>
      <span>8px</span>
      <h-rate v-model="compactScore" :gutter="8" />
    </div>
    <div>
      <span>24px</span>
      <h-rate v-model="relaxedScore" :gutter="24" />
    </div>
  </div>
</template>

<style scoped>
.rate-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-6);
}

.rate-options > div {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-2);
}

.rate-options span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
