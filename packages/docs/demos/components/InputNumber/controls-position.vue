<script setup lang="ts">
import { computed, ref } from 'vue';

type ControlMode = 'right' | 'between' | 'none';

const mode = ref<ControlMode>('right');
const value = ref(12);
const controlsPosition = computed(() => (mode.value === 'between' ? 'between' : undefined));
</script>

<template>
  <section class="input-number-controls-demo">
    <h-segmented v-model:active-key="mode" size="small" block aria-label="Control position">
      <h-segmented-item key="right" label="Right" />
      <h-segmented-item key="between" label="Between" />
      <h-segmented-item key="none" label="Hidden" />
    </h-segmented>
    <h-input-number
      v-model="value"
      :min="0"
      :max="99"
      :controls="mode !== 'none'"
      :controls-position="controlsPosition"
      aria-label="Parcel count"
    />
  </section>
</template>

<style scoped>
.input-number-controls-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 420px;
}
</style>
