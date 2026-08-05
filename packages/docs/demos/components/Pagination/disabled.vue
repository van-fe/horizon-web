<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(true);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="toggle-row">
        <span>{{ disabled ? '分页操作已禁用' : '分页操作可用' }}</span>
        <h-switch v-model="disabled" status />
      </label>
    </div>
    <div class="pagination-stage">
      <h-pagination :total="86" :disabled="disabled" align="right" />
    </div>
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
