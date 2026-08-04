<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const zIndex = ref('600');
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span>遮罩层级</span>
        <h-segmented v-model:active-key="zIndex" size="small">
          <h-segmented-item value="400" label="400" />
          <h-segmented-item value="600" label="600" />
        </h-segmented>
      </label>
      <h-button @click="visible = true">比较层级</h-button>
    </div>
    <div class="z-stage">
      <div class="floating-notice">固定层级 500</div>
      <span>遮罩层级 {{ zIndex }}</span>
      <h-mask :value="visible" absolute :z-index="Number(zIndex)">
        <h-button size="small" @click="visible = false">关闭遮罩</h-button>
      </h-mask>
    </div>
    <p class="docs-demo__status">
      {{ Number(zIndex) > 500 ? '遮罩覆盖固定提示' : '固定提示显示在遮罩上方' }}
    </p>
  </div>
</template>

<style scoped>
.z-stage {
  position: relative;
  display: grid;
  height: 180px;
  overflow: hidden;
  place-items: center;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
}

.floating-notice {
  position: absolute;
  z-index: 500;
  top: 18px;
  right: 18px;
  padding: 9px 12px;
  border: 1px solid var(--h-border-warning-default);
  border-radius: 8px;
  color: var(--h-text-primary);
  background: var(--h-bg-warning-weak-default);
  font-size: 12px;
}
</style>
