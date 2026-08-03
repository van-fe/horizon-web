<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

type Capability = 'gradient' | 'swatches' | 'recent' | 'confirm' | 'eyedropper';

const mode = ref<Capability>('gradient');
const modes: Array<{ value: Capability; label: string }> = [
  { value: 'gradient', label: 'Gradient' },
  { value: 'swatches', label: 'Swatches' },
  { value: 'recent', label: 'Recent' },
  { value: 'confirm', label: 'Confirm' },
  { value: 'eyedropper', label: 'Picker' },
];
const values = reactive<Record<Capability, string>>({
  gradient: 'linear-gradient(90deg, #178CA6FF 0%, #6F5AE8FF 100%)',
  swatches: '#178CA6',
  recent: '#6F5AE8',
  confirm: '#26A269CC',
  eyedropper: '#D97706',
});
const value = computed({
  get: () => values[mode.value],
  set: nextValue => {
    values[mode.value] = nextValue;
  },
});
const swatches = [
  { name: 'Ocean', value: '#178CA6' },
  { name: 'Sky', value: '#0BA1D6' },
  { name: 'Success', value: '#26A269' },
  { name: 'Warm', value: '#D97706' },
  { name: 'Danger', value: '#D64545' },
  { name: 'Violet', value: '#6F5AE8' },
];
</script>

<template>
  <div class="color-capabilities-demo">
    <h-segmented v-model:active-key="mode" size="small" block>
      <h-segmented-item v-for="item in modes" :key="item.value" :label="item.label" />
    </h-segmented>

    <h-color-picker
      v-model="value"
      trigger-type="square"
      editable
      alpha
      :enable-gradient="mode === 'gradient'"
      :show-swatch="mode === 'swatches'"
      :swatches="mode === 'swatches' ? swatches : undefined"
      :recently-colors="mode === 'recent'"
      :custom-colors="mode === 'recent'"
      :need-confirm="mode === 'confirm'"
      :enable-eye-dropper="mode === 'eyedropper'"
      :clearable="false"
    />
  </div>
</template>

<style scoped>
.color-capabilities-demo {
  display: grid;
  max-width: 520px;
  gap: var(--h-spacing-4);
}

.color-capabilities-demo > .h-color-picker {
  justify-self: start;
}
</style>
