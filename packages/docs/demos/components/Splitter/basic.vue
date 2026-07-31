<template>
  <h-splitter v-model="sizes" style="height: 260px; border: 1px solid var(--h-border-default)">
    <h-splitter-panel :size="28" :min="18" :max="45" collapsible>
      <div class="panel">导航 {{ sizes[0].toFixed(0) }}%</div>
    </h-splitter-panel>
    <h-splitter-panel>
      <div class="panel">主要内容 {{ sizes[1].toFixed(0) }}%</div>
    </h-splitter-panel>
  </h-splitter>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sizes = ref([28, 72]);
</script>

<style scoped>
.panel {
  box-sizing: border-box;
  height: 100%;
  padding: 16px;
  background: var(--h-bg-secondary);
}
</style>
