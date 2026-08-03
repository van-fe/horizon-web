<script setup lang="ts">
import { ref } from 'vue';

const score = ref(3);
</script>

<template>
  <div class="rate-options">
    <div>
      <span>品牌色</span>
      <h-rate
        v-model="score"
        color="var(--h-text-brand-default)"
        void-color="var(--h-bg-disabled)"
      />
    </div>
    <div>
      <span>禁用色</span>
      <h-rate v-model="score" disabled disabled-color="var(--h-text-success-default)" />
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
