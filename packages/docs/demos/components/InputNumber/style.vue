<script setup lang="ts">
import { ref } from 'vue';

type InputStyle = 'normal' | 'emphasize' | 'no-border';

const value = ref<number | null>(35);
const inputStyle = ref<InputStyle>('normal');
const disabled = ref(false);
const clearable = ref(true);
</script>

<template>
  <section class="input-number-style-demo">
    <div class="input-number-style-demo__controls">
      <h-segmented v-model:active-key="inputStyle" size="small" block aria-label="Input style">
        <h-segmented-item key="normal" label="Normal" />
        <h-segmented-item key="emphasize" label="Emphasize" />
        <h-segmented-item key="no-border" label="No border" />
      </h-segmented>
      <h-switch v-model="disabled" label="Disabled" status />
      <h-switch v-model="clearable" label="Clearable" status />
    </div>
    <h-input-number
      v-model="value"
      :input-style="inputStyle"
      :disabled="disabled"
      :clearable="clearable"
      :min="0"
      :max="100"
      aria-label="Reserved capacity"
    >
      <template #suffix>%</template>
    </h-input-number>
    <small aria-live="polite">{{ value ?? 'Empty' }} · {{ inputStyle }}</small>
  </section>
</template>

<style scoped>
.input-number-style-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 560px;
}

.input-number-style-demo__controls {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
}

.input-number-style-demo__controls :deep(.h-segmented) {
  flex: 1 1 320px;
}

.input-number-style-demo > small {
  color: var(--h-text-secondary);
}
</style>
