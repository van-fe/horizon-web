<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">
          Preset ·
          <code>size</code>
        </span>
        <h-segmented v-model:active-key="sizeMode" size="small" block>
          <h-segmented-item key="small" label="Small" />
          <h-segmented-item key="medium" label="Medium" />
          <h-segmented-item key="large" label="Large" />
          <h-segmented-item key="custom" label="Custom" />
        </h-segmented>
      </label>
      <label v-if="sizeMode === 'custom'" class="docs-demo__control">
        <span class="docs-demo__control-label">Custom pixels</span>
        <h-input-number v-model="customSize" :min="80" :max="280" :step="10" />
      </label>
    </div>

    <div class="docs-demo__stage">
      <h-empty :size="resolvedSize" description="No tasks are due in this view." />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const sizeMode = ref('medium');
const customSize = ref(180);
const resolvedSize = computed(() =>
  sizeMode.value === 'custom' ? customSize.value : sizeMode.value,
);
</script>
