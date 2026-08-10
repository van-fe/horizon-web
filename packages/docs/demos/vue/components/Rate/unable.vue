<script setup lang="ts">
import { ref } from 'vue';

const score = ref(4);
</script>

<template>
  <div class="rate-options">
    <div>
      <span>只读</span>
      <h-rate v-model="score" readonly />
    </div>
    <div>
      <span>禁用</span>
      <h-rate v-model="score" disabled />
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
