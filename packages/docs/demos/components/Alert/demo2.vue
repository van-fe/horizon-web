<script setup lang="ts">
import { ref } from 'vue';

const renderKey = ref(0);
const result = ref('等待操作');

function confirmUpdate(close: () => void) {
  result.value = '已安排今晚 22:00 自动更新';
  close();
}

function postponeUpdate(close: () => void) {
  result.value = '已推迟到明天提醒';
  close();
}

function resetDemo() {
  result.value = '等待操作';
  renderKey.value += 1;
}
</script>

<template>
  <div class="docs-demo">
    <h-alert
      :key="renderKey"
      title="检测到可用更新"
      description="更新预计需要 3 分钟，期间服务会短暂重启。"
      type="info"
      show-icon
      primary-button-text="今晚更新"
      default-button-text="明天提醒"
      :on-primary="confirmUpdate"
      :on-default="postponeUpdate"
    />
    <h-space wrap align="center">
      <span aria-live="polite">{{ result }}</span>
      <h-button size="small" type="normal" icon="refresh" @click="resetDemo">重置</h-button>
    </h-space>
  </div>
</template>
