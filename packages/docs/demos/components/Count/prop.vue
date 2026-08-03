<script setup lang="ts">
import { computed, ref } from 'vue';

type FormatMode = 'grouped' | 'precision' | 'currency' | 'slots';

interface CountConfig {
  endValue: number;
  decimal?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
}

const mode = ref<FormatMode>('grouped');
const modes: Array<{ value: FormatMode; label: string }> = [
  { value: 'grouped', label: 'Grouped' },
  { value: 'precision', label: 'Precision' },
  { value: 'currency', label: 'Currency' },
  { value: 'slots', label: 'Slots' },
];
const configs: Record<FormatMode, CountConfig> = {
  grouped: { endValue: 987654321, separator: ',' },
  precision: { endValue: 98.678, decimal: 2, suffix: '%' },
  currency: { endValue: 12840, prefix: '¥', suffix: ' CNY', separator: ',' },
  slots: { endValue: 4200, separator: ' ' },
};
const config = computed(() => configs[mode.value]);
</script>

<template>
  <section class="docs-demo">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item v-for="item in modes" :key="item.value" :label="item.label" />
    </h-segmented>

    <div class="count-preview">
      <h-count
        :end-value="config.endValue"
        :auto-play="false"
        :decimal="config.decimal"
        :prefix="config.prefix"
        :suffix="config.suffix"
        :separator="config.separator"
      >
        <template v-if="mode === 'slots'" #prefix>
          <span class="count-muted">About&nbsp;</span>
        </template>
        <template v-if="mode === 'slots'" #suffix>
          <span class="count-muted">seats</span>
        </template>
      </h-count>
    </div>
  </section>
</template>

<style scoped>
.count-preview {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
}

.count-preview :deep(.h-count) {
  color: var(--h-text-primary);
  font-size: var(--h-text-2xl);
  font-weight: var(--h-weight-strong);
}

.count-muted {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
