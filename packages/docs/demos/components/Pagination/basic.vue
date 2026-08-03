<script setup lang="ts">
import { ref } from 'vue';

const currentPage = ref(3);
</script>

<template>
  <div class="docs-demo">
    <div class="pagination-stage">
      <h-pagination v-model:current-page="currentPage" :total="248" />
    </div>
    <p class="docs-demo__status" role="status">当前第 {{ currentPage }} 页</p>
  </div>
</template>

<style scoped>
.pagination-stage {
  min-width: 0;
  overflow-x: auto;
  padding-block: 8px;
}
</style>
