<script setup lang="ts">
import { ref } from 'vue';

const pagerCount = ref(7);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control docs-demo__control--grow">
        <span>最多显示 {{ pagerCount }} 个页码按钮</span>
        <h-slider v-model="pagerCount" :min="5" :max="11" :step="2" />
      </label>
    </div>
    <div class="pagination-stage">
      <h-pagination :total="1000" :pager-count="pagerCount" />
    </div>
  </div>
</template>

<style scoped>
.pagination-stage {
  min-width: 0;
  overflow-x: auto;
  padding-block: 8px;
}
</style>
