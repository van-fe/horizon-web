<script setup lang="ts">
import { ref } from 'vue';

const showRange = ref(true);
const current = ref(3);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="toggle-row">
        <span>显示当前数据范围</span>
        <h-switch v-model="showRange" status />
      </label>
    </div>
    <div class="pagination-stage">
      <h-pagination v-model:current-page="current" :total="124" :show-range="showRange" />
    </div>
    <p class="docs-demo__status">
      {{
        showRange
          ? `正在查看第 ${(current - 1) * 10 + 1}–${Math.min(current * 10, 124)} 条`
          : '范围信息已隐藏'
      }}
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
  min-width: 0;
  overflow-x: auto;
  padding-block: 8px;
}
</style>
