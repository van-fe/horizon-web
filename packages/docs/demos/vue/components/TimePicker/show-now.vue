<script setup lang="ts">
import { ref } from 'vue';

const incidentTime = ref<string>();
const status = ref('打开面板，使用底部“此刻”快捷操作');
</script>

<template>
  <label class="time-picker-now-demo">
    <span>事故发生时间</span>
    <h-time-picker
      v-model="incidentTime"
      value-format="HH:mm"
      show-now
      :to-body="false"
      placeholder="选择或使用此刻"
      aria-label="事故发生时间"
      @change="status = `已选择：${$event}`"
    />
    <small aria-live="polite">{{ status }}</small>
  </label>
</template>

<style scoped>
.time-picker-now-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.time-picker-now-demo > span,
.time-picker-now-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
