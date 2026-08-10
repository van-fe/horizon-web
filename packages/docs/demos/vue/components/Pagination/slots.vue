<script setup lang="ts">
import { ref } from 'vue';

const current = ref(1);
</script>

<template>
  <div class="docs-demo">
    <div class="pagination-stage">
      <h-pagination v-model:current-page="current" :total="50">
        <template #prefix><span class="slot-copy">搜索结果</span></template>
        <template #suffix><span class="slot-copy">共 50 条</span></template>
      </h-pagination>
    </div>
  </div>
</template>

<style scoped>
.pagination-stage {
  min-width: 0;
  overflow-x: auto;
  padding-block: 8px;
}

.slot-copy {
  color: var(--h-text-secondary);
  font-size: 12px;
  white-space: nowrap;
}
</style>
