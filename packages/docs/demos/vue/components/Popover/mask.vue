<script setup lang="ts">
import { computed, ref } from 'vue';

const useMask = ref(true);
const maskOption = computed(() => ({ enable: useMask.value }));
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="toggle-row">
        <span>显示全局蒙层</span>
        <h-switch v-model="useMask" status />
      </label>
    </div>
    <div class="popover-stage">
      <h-popover trigger="click" placement="top" :show-with-mask="maskOption">
        <template #reference><h-button>打开授权说明</h-button></template>
        <template #popper>
          <h-pop-content>
            <div class="mask-content">
              <strong>需要管理员授权</strong>
            </div>
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <p class="docs-demo__status">{{ useMask ? '打开时显示蒙层' : '打开时不遮挡背景' }}</p>
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

.popover-stage {
  display: flex;
  justify-content: center;
  padding-block: 24px;
}
</style>
