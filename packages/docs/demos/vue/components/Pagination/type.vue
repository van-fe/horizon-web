<script setup lang="ts">
import { ref } from 'vue';

const simplePage = ref(3);
const simplestPage = ref(3);
</script>

<template>
  <div class="type-grid">
    <div class="type-item">
      <span>simple</span>
      <h-pagination v-model:current-page="simplePage" :total="100" type="simple" />
    </div>
    <div class="type-item">
      <span>simplest</span>
      <h-pagination v-model:current-page="simplestPage" :total="100" type="simplest" />
    </div>
  </div>
</template>

<style scoped>
.type-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.type-item {
  display: grid;
  min-width: 0;
  gap: 10px;
  overflow-x: auto;
  padding: 12px;
  border-radius: 8px;
  background: var(--h-bg-secondary);
}

.type-item > span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

@media (max-width: 640px) {
  .type-grid {
    grid-template-columns: 1fr;
  }
}
</style>
