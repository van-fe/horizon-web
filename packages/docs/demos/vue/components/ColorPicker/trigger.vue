<script setup lang="ts">
import { computed, ref } from 'vue';

type TriggerState = 'default' | 'disabled' | 'clearable';

const displayMode = ref<'square' | 'square-text'>('square-text');
const state = ref<TriggerState>('default');
const color = ref<string>('#178CA6');
const showValue = computed(() => displayMode.value === 'square-text');
</script>

<template>
  <div class="color-trigger-demo">
    <div class="color-trigger-demo__options">
      <h-segmented v-model:active-key="displayMode" size="small">
        <h-segmented-item value="square" label="Swatch" />
        <h-segmented-item value="square-text" label="Value" />
      </h-segmented>
      <h-segmented v-model:active-key="state" size="small">
        <h-segmented-item value="default" label="Default" />
        <h-segmented-item value="disabled" label="Disabled" />
        <h-segmented-item value="clearable" label="Clearable" />
      </h-segmented>
    </div>

    <h-color-picker
      v-model="color"
      trigger-type="square"
      :square-text="showValue"
      :disabled="state === 'disabled'"
      :clearable="state === 'clearable'"
      :need-confirm="false"
    />
    <p aria-live="polite">{{ color || 'No color selected' }}</p>
  </div>
</template>

<style scoped>
.color-trigger-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-4);
}

.color-trigger-demo__options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
}

.color-trigger-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
