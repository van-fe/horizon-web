<script setup lang="ts">
import { computed, ref } from 'vue';

const width = ref(420);
const displayType = ref('ellipsis');
const viewportStyle = computed(() => ({ '--breadcrumb-width': `${width.value}px` }));
const path = [
  { text: 'Workspace' },
  { text: 'Research' },
  { text: 'Customer interviews' },
  { text: 'Accessibility findings' },
];
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="displayType" size="small">
        <h-segmented-item key="full" label="Full" />
        <h-segmented-item key="ellipsis" label="Ellipsis" />
      </h-segmented>
      <label class="breadcrumb-width">
        <span>{{ width }} px</span>
        <h-slider v-model="width" :min="180" :max="640" :step="20" />
      </label>
    </div>

    <div class="breadcrumb-viewport" :style="viewportStyle">
      <h-breadcrumb :texts="path" :display-type="displayType" />
    </div>
  </section>
</template>

<style scoped>
.breadcrumb-width {
  display: grid;
  width: min(100%, 280px);
  gap: var(--h-spacing-2);
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.breadcrumb-viewport {
  overflow: hidden;
  width: min(100%, var(--breadcrumb-width));
  padding: var(--h-spacing-3);
  border-radius: var(--h-radius-m);
  background: var(--h-bg-secondary);
  box-sizing: border-box;
}
</style>
