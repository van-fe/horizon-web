<script setup lang="ts">
import { h, ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';
import { IconFlip } from '@aurora/icon';

type IconMode = 'prefix' | 'suffix';

const mode = ref<IconMode>('prefix');
const value = ref(dayjs().add(2, 'day').hour(17));
const flipIcon = h(IconFlip, { color: 'var(--h-text-brand-default)', size: 14 });
</script>

<template>
  <section class="date-picker-icon">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item key="prefix" label="Prefix" />
      <h-segmented-item key="suffix" label="Suffix" />
    </h-segmented>
    <h-date-picker
      v-model="value"
      type="datetime"
      :prefix-icon="mode === 'prefix' ? 'task_filled' : undefined"
      :suffix-icon="mode === 'suffix' ? flipIcon : undefined"
    />
  </section>
</template>

<style scoped>
.date-picker-icon {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-icon :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-icon {
    inline-size: 100%;
  }
}
</style>
