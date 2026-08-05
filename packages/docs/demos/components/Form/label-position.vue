<template>
  <section class="form-label-demo">
    <div class="form-label-demo__controls">
      <div>
        <span>Position</span>
        <h-segmented v-model:active-key="labelPosition" size="small" block>
          <h-segmented-item value="top" label="Top" />
          <h-segmented-item value="left" label="Left" />
        </h-segmented>
      </div>
      <div>
        <span>Horizontal</span>
        <h-segmented v-model:active-key="labelJustifyAlign" size="small" block>
          <h-segmented-item value="left" label="Left" :disabled="labelPosition === 'top'" />
          <h-segmented-item value="right" label="Right" :disabled="labelPosition === 'top'" />
        </h-segmented>
      </div>
      <div>
        <span>Vertical</span>
        <h-segmented v-model:active-key="labelVerticalAlign" size="small" block>
          <h-segmented-item value="top" label="Top" :disabled="labelPosition === 'top'" />
          <h-segmented-item value="middle" label="Middle" :disabled="labelPosition === 'top'" />
        </h-segmented>
      </div>
    </div>

    <h-form
      :model="formData"
      :label-position="labelPosition"
      :label-justify-align="labelJustifyAlign"
      :label-vertical-align="labelVerticalAlign"
      label-width="auto"
      @submit="submit"
    >
      <h-form-item label="Project name">
        <h-input v-model="formData.project" />
      </h-form-item>
      <h-form-item label="Release channel">
        <h-select v-model="formData.channel">
          <h-option label="Stable" value="stable" />
          <h-option label="Preview" value="preview" />
          <h-option label="Internal" value="internal" />
        </h-select>
      </h-form-item>
      <h-form-item label="Release context" label-position="top">
        <h-input v-model="formData.context" type="textarea" />
      </h-form-item>
      <h-form-item><h-button native-type="submit">Save layout</h-button></h-form-item>
    </h-form>
    <p class="form-label-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const labelPosition = ref<'top' | 'left'>('top');
const labelJustifyAlign = ref<'left' | 'right'>('left');
const labelVerticalAlign = ref<'top' | 'middle'>('top');
const formData = reactive({
  project: 'Horizon release portal',
  channel: 'preview',
  context: 'Validate navigation and keyboard behavior before the stable rollout.',
});
const status = ref('Adjust the label controls to compare layout behavior');

function submit() {
  status.value = `${labelPosition.value} labels saved for ${formData.project}`;
}
</script>

<style scoped>
.form-label-demo,
.form-label-demo__controls,
.form-label-demo__controls > div {
  display: grid;
  gap: var(--h-spacing-3);
}

.form-label-demo {
  gap: var(--h-spacing-5);
}

.form-label-demo__controls {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: var(--h-spacing-4);
  border-radius: var(--h-radius-m);
  background: var(--h-bg-secondary);
}

.form-label-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 680px) {
  .form-label-demo__controls {
    grid-template-columns: 1fr;
  }
}
</style>
