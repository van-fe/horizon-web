<script setup lang="ts">
import { ref } from 'vue';
import { IconTriangleLeftFilled, IconTriangleRightFilled } from '@aurora/icon';

const current = ref(2);
</script>

<template>
  <div class="docs-demo">
    <div class="pagination-stage">
      <h-pagination v-model:current-page="current" :total="50">
        <template #prev><IconTriangleLeftFilled aria-hidden="true" /></template>
        <template #next><IconTriangleRightFilled aria-hidden="true" /></template>
      </h-pagination>
    </div>
    <p class="docs-demo__status">自定义图标 · 当前第 {{ current }} 页</p>
  </div>
</template>

<style scoped>
.pagination-stage {
  min-width: 0;
  overflow-x: auto;
  padding-block: 8px;
}
</style>
