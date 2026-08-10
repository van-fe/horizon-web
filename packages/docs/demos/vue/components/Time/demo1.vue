<script setup lang="ts">
import { ref } from 'vue';

const finished = ref(false);
</script>

<template>
  <div class="time-basic-demo">
    <div>
      <span>灰度发布将在</span>
      <h-time :time="10" @finished="finished = true" />
      <span>后自动开始</span>
    </div>
    <h-tag :type="finished ? 'success' : 'info'" :clickable="false">
      {{ finished ? '已开始发布' : '等待倒计时' }}
    </h-tag>
  </div>
</template>

<style scoped>
.time-basic-demo,
.time-basic-demo > div {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-3);
}

.time-basic-demo {
  justify-content: space-between;
  padding: var(--h-spacing-5);
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-l);
  background: var(--h-bg-default);
}

.time-basic-demo > div {
  min-width: 0;
  flex-wrap: wrap;
  color: var(--h-text-secondary);
  font-size: 13px;
}

.time-basic-demo :deep(.h-time) {
  color: var(--h-text-primary);
  font-size: 24px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 600px) {
  .time-basic-demo {
    align-items: flex-start;
    flex-direction: column;
    padding: var(--h-spacing-4);
  }
}
</style>
