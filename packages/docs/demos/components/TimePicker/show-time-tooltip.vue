<script setup lang="ts">
import { ref } from 'vue';
import type { Dayjs } from 'dayjs';

const selectedTime = ref('10:00');

function showWorkingHourTooltip(time: Dayjs) {
  const hour = time.hour();
  if (hour < 9 || hour > 20) return { show: false };

  const period = hour < 12 ? '上午协作时段' : hour < 18 ? '核心协作时段' : '晚间值守时段';
  return { show: true, content: period };
}
</script>

<template>
  <label class="time-picker-tooltip-demo">
    <span>协作时段</span>
    <h-time-picker
      v-model="selectedTime"
      type="time"
      value-format="HH:mm"
      :time-step="60"
      :show-time-tooltip="showWorkingHourTooltip"
      :clearable="false"
      :to-body="false"
      aria-label="带时段提示的时间"
    />
    <small aria-live="polite">已选择 {{ selectedTime }}</small>
  </label>
</template>

<style scoped>
.time-picker-tooltip-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.time-picker-tooltip-demo > span,
.time-picker-tooltip-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
