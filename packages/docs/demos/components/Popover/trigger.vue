<script setup lang="ts">
import { ref } from 'vue';

const manualVisible = ref(false);
const triggers = [
  { value: 'hover', label: '悬浮' },
  { value: 'click', label: '点击' },
  { value: 'click-remain', label: '点击保留' },
  { value: 'click-hide', label: '点击隐藏' },
  { value: 'focus', label: '聚焦' },
] as const;
</script>

<template>
  <div class="docs-demo">
    <div class="trigger-grid">
      <div v-for="item in triggers" :key="item.value">
        <span>{{ item.value }}</span>
        <h-popover :trigger="item.value">
          <template #reference>
            <h-button type="normal">{{ item.label }}</h-button>
          </template>
          <template #popper>
            <h-pop-content>{{ item.label }}触发的任务摘要</h-pop-content>
          </template>
        </h-popover>
      </div>
      <div>
        <span>manual</span>
        <h-popover trigger="manual" :visible="manualVisible">
          <template #reference>
            <h-button @click="manualVisible = true">手动打开</h-button>
          </template>
          <template #popper>
            <h-pop-content>
              <h-space>
                <span>由状态控制</span>
                <h-button size="small" type="danger" @click="manualVisible = false">关闭</h-button>
              </h-space>
            </h-pop-content>
          </template>
        </h-popover>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trigger-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.trigger-grid > div {
  display: grid;
  justify-items: start;
  gap: 8px;
  padding: 8px 0;
}

.trigger-grid > div > span {
  color: var(--h-text-secondary);
  font-size: 11px;
}

@media (max-width: 640px) {
  .trigger-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 420px) {
  .trigger-grid {
    grid-template-columns: 1fr;
  }
}
</style>
