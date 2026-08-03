<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const opacity = ref(0.55);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control docs-demo__control--grow">
        <span>透明度：{{ opacity.toFixed(2) }}</span>
        <h-slider v-model="opacity" :min="0.1" :max="0.9" :step="0.05" />
      </label>
      <h-button @click="visible = true">应用遮罩</h-button>
    </div>
    <div class="opacity-panel">
      <span>实时指标 · 运行日志 · 告警记录</span>
      <h-mask :value="visible" absolute :opacity="opacity">
        <h-button size="small" @click="visible = false">关闭遮罩</h-button>
      </h-mask>
    </div>
  </div>
</template>

<style scoped>
.opacity-panel {
  position: relative;
  display: grid;
  min-height: 150px;
  place-items: center;
  overflow: hidden;
  padding: 20px;
  border-radius: 12px;
  background: var(--h-bg-secondary);
}

.opacity-panel > span {
  color: var(--h-text-secondary);
}
</style>
