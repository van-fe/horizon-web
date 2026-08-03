<script setup lang="ts">
import { ref } from 'vue';

const mediumValue = ref('monthly');
const largeValue = ref('monthly');
</script>

<template>
  <div class="border-grid">
    <section>
      <span>medium</span>
      <h-space wrap>
        <h-radio v-model="mediumValue" value="monthly" size="medium" border>按月付费</h-radio>
        <h-radio v-model="mediumValue" value="annual" size="medium" border>按年付费</h-radio>
      </h-space>
    </section>
    <section>
      <span>large</span>
      <h-space wrap>
        <h-radio v-model="largeValue" value="monthly" size="large" border>按月付费</h-radio>
        <h-radio v-model="largeValue" value="annual" size="large" border>按年付费</h-radio>
      </h-space>
    </section>
  </div>
</template>

<style scoped>
.border-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.border-grid section {
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 1px solid var(--h-border-default);
  border-radius: 10px;
  background: var(--h-bg-default);
}

.border-grid > section > span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 560px) {
  .border-grid {
    grid-template-columns: 1fr;
  }
}
</style>
