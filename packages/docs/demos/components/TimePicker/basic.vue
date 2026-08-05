<script setup lang="ts">
import { ref } from 'vue';

type PickerSize = 'small' | 'medium' | 'large';
type InputStyle = 'normal' | 'emphasize' | 'no-border';

const value = ref('09:30');
const size = ref<PickerSize>('medium');
const inputStyle = ref<InputStyle>('normal');
const disabled = ref(false);
</script>

<template>
  <section class="time-picker-basic-demo">
    <div class="time-picker-basic-demo__controls">
      <label>
        <span>尺寸</span>
        <h-segmented v-model:active-key="size" size="small" block>
          <h-segmented-item value="small" label="S" />
          <h-segmented-item value="medium" label="M" />
          <h-segmented-item value="large" label="L" />
        </h-segmented>
      </label>
      <label>
        <span>输入框样式</span>
        <h-segmented v-model:active-key="inputStyle" size="small" block>
          <h-segmented-item value="normal" label="Normal" />
          <h-segmented-item value="emphasize" label="Emphasize" />
          <h-segmented-item value="no-border" label="No border" />
        </h-segmented>
      </label>
      <label>
        <span>禁用</span>
        <h-switch v-model="disabled" />
      </label>
    </div>
    <h-time-picker
      v-model="value"
      value-format="HH:mm"
      :size="size"
      :input-style="inputStyle"
      :disabled="disabled"
      :to-body="false"
      placeholder="选择时间"
      aria-label="基本时间选择器"
    />
    <small aria-live="polite">modelValue: {{ value || '未选择' }}</small>
  </section>
</template>

<style scoped>
.time-picker-basic-demo {
  display: grid;
  gap: var(--h-spacing-3);
  max-inline-size: 720px;
}

.time-picker-basic-demo__controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  align-items: end;
  gap: var(--h-spacing-3);
}

.time-picker-basic-demo__controls label {
  display: grid;
  gap: var(--h-spacing-2);
}

.time-picker-basic-demo__controls label > span,
.time-picker-basic-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .time-picker-basic-demo__controls {
    grid-template-columns: 1fr;
  }
}
</style>
