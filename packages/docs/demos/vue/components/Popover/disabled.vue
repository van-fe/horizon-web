<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="toggle-row">
        <span>禁用浮层</span>
        <h-switch v-model="disabled" status />
      </label>
    </div>
    <div class="popover-stage">
      <h-popover trigger="click" placement="bottom" :disabled="disabled">
        <template #reference><h-button type="normal">打开浮层</h-button></template>
        <template #popper><h-pop-content>浮层可正常显示。</h-pop-content></template>
      </h-popover>
    </div>
    <p class="docs-demo__status">{{ disabled ? '浮层已禁用' : '浮层可用' }}</p>
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
