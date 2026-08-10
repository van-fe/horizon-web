<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import type { TimePickerProps } from '@aurora/horizon-web';

const value = ref<string>();

const formatCellText: TimePickerProps['formatCellText'] = (unit, cellValue) => {
  if (unit === 'hours' && Number(cellValue) > 23) {
    return `次日 ${String(Number(cellValue) - 24).padStart(2, '0')}`;
  }
  return cellValue;
};

const formatTriggerText: TimePickerProps['formatTriggerText'] = (time, text) =>
  time.diff(dayjs().startOf('day'), 'hour') > 23 ? `次日 ${text}` : text;
</script>

<template>
  <section class="time-picker-format-cell-demo">
    <h-time-picker
      v-model="value"
      start-at="08:00:00"
      end-at="32:00:00"
      :format-cell-text="formatCellText"
      :format-trigger-text="formatTriggerText"
      :to-body="false"
      placeholder="选择跨日时间"
      aria-label="跨日时间"
    />
    <small aria-live="polite">modelValue: {{ value || '尚未选择' }}</small>
  </section>
</template>

<style scoped>
.time-picker-format-cell-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.time-picker-format-cell-demo > small {
  color: var(--h-text-secondary);
}
</style>
