<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
  <div class="docs-demo">
    <div class="project-panel">
      <span>遮罩只覆盖这个局部容器</span>
      <h-button size="small" @click="visible = true">执行任务</h-button>
      <h-mask absolute :value="visible">
        <div class="mask-action">
          <strong>任务执行中</strong>
          <h-button size="small" @click="visible = false">结束演示</h-button>
        </div>
      </h-mask>
    </div>
  </div>
</template>

<style scoped>
.project-panel {
  position: relative;
  display: flex;
  min-height: 150px;
  align-items: center;
  justify-content: space-between;
  gap: var(--h-spacing-4);
  overflow: hidden;
  padding: var(--h-spacing-5);
  border-radius: var(--h-radius-l);
  background: var(--h-bg-secondary);
}

.project-panel > span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.mask-action {
  display: grid;
  justify-items: center;
  gap: var(--h-spacing-3);
  color: var(--h-text-inverse);
}

@media (max-width: 560px) {
  .project-panel {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
