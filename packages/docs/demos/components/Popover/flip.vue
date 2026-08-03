<script setup lang="ts">
import { ref } from 'vue';

const flip = ref(true);
const preventOverflow = ref(false);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="toggle-row">
        <span>空间不足时翻转</span>
        <h-switch v-model="flip" status />
      </label>
      <label class="toggle-row">
        <span>防止溢出</span>
        <h-switch v-model="preventOverflow" status />
      </label>
    </div>
    <div class="flip-stage">
      <h-popover
        trigger="click"
        placement="top"
        :flip="flip"
        :fallback-placements="['top', 'bottom', 'left']"
        :prevent-overflow="preventOverflow"
      >
        <template #reference><h-button type="normal">从顶部打开</h-button></template>
        <template #popper>
          <h-pop-content>
            <div class="flip-content">
              <strong>自动寻找可用空间</strong>
              <span>空间不足时自动选择可用方向。</span>
            </div>
          </h-pop-content>
        </template>
      </h-popover>
    </div>
  </div>
</template>

<style scoped>
.flip-stage {
  display: flex;
  min-height: 160px;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  background: var(--h-bg-secondary);
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--h-text-secondary);
  font-size: 13px;
}

.flip-content {
  display: grid;
  width: 220px;
  gap: 5px;
}

.flip-content span {
  color: var(--h-text-secondary);
  font-size: 12px;
}
</style>
