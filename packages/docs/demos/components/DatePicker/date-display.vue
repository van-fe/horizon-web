<script setup lang="ts">
import { computed, ref } from 'vue';

type DisplayMode = 'current' | 'adjacent' | 'six';

const mode = ref<DisplayMode>('adjacent');
const value = ref('2026-08-12');
const showAdjacent = computed(() => mode.value !== 'current');
const fixedRows = computed(() => mode.value === 'six');
</script>

<template>
  <section class="date-picker-display">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item key="current" label="Current month" />
      <h-segmented-item key="adjacent" label="Adjacent dates" />
      <h-segmented-item key="six" label="Six rows" />
    </h-segmented>
    <h-date-picker
      v-model="value"
      type="date"
      :show-before-after-date="showAdjacent"
      :fixed-six-rows="fixedRows"
    />
  </section>
</template>

<style scoped>
.date-picker-display {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-display :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-display {
    inline-size: 100%;
  }
}
</style>
