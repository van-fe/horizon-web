<script setup lang="ts">
import { ref } from 'vue';

const hideOnSinglePage = ref(true);
const total = ref(8);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="toggle-row">
        <span>单页时隐藏</span>
        <h-switch v-model="hideOnSinglePage" status />
      </label>
      <label class="docs-demo__control">
        <span>数据总数</span>
        <h-input-number v-model="total" :min="0" :max="50" :step="2" />
      </label>
    </div>
    <div class="pagination-stage">
      <h-pagination :total="total" :hide-on-single-page="hideOnSinglePage" />
    </div>
    <p class="docs-demo__status" role="status">
      {{ hideOnSinglePage && total <= 10 ? '分页器已隐藏' : '分页器可见' }} · {{ total }} 条数据
    </p>
  </div>
</template>

<style scoped>
.toggle-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--h-text-secondary);
  font-size: 13px;
}

.pagination-stage {
  min-height: 40px;
  overflow-x: auto;
  padding-block: 8px;
}
</style>
