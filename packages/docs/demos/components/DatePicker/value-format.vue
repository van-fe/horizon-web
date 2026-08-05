<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { dayjs } from '@aurora/horizon-web';

type ValueMode = 'dayjs' | 'string' | 'unix';

const mode = ref<ValueMode>('string');
const value = ref<unknown>('2026-08-12 09:30');
const valueFormat = computed(() => {
  if (mode.value === 'string') return 'YYYY-MM-DD HH:mm';
  if (mode.value === 'unix') return 'X';
  return undefined;
});

watch(mode, nextMode => {
  value.value =
    nextMode === 'dayjs'
      ? dayjs('2026-08-12 09:30')
      : nextMode === 'unix'
        ? 1786498200
        : '2026-08-12 09:30';
});

function serialize(modelValue: unknown) {
  if (dayjs.isDayjs(modelValue)) return `Dayjs(${modelValue.format('YYYY-MM-DD HH:mm')})`;
  return String(modelValue ?? 'Empty');
}
</script>

<template>
  <section class="date-picker-value-format">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item value="dayjs" label="Dayjs" />
      <h-segmented-item value="string" label="String" />
      <h-segmented-item value="unix" label="Unix" />
    </h-segmented>
    <h-date-picker
      v-model="value"
      type="datetime"
      format="YYYY-MM-DD HH:mm"
      :value-format="valueFormat"
    />
    <code aria-live="polite">{{ serialize(value) }}</code>
  </section>
</template>

<style scoped>
.date-picker-value-format {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-value-format :deep(.h-date-picker) {
  inline-size: 100%;
}

.date-picker-value-format code {
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .date-picker-value-format {
    inline-size: 100%;
  }
}
</style>
