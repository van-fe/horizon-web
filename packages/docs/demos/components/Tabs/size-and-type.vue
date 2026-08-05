<script setup lang="ts">
import { ref } from 'vue';

type TabType = 'line' | 'card' | 'page';
type TabSize = 'small' | 'medium' | 'large' | 'huge';

const activeKey = ref('build');
const type = ref<TabType>('line');
const size = ref<TabSize>('medium');
const stages = [
  { key: 'brief', label: 'Brief' },
  { key: 'build', label: 'Build' },
  { key: 'launch', label: 'Launch' },
];
</script>

<template>
  <div class="tabs-variants-demo">
    <div class="tabs-variants-demo__options">
      <label>
        <span>Type</span>
        <h-segmented v-model:active-key="type" size="small" block>
          <h-segmented-item value="line" label="Line" />
          <h-segmented-item value="card" label="Card" />
          <h-segmented-item value="page" label="Page" />
        </h-segmented>
      </label>
      <label>
        <span>Size</span>
        <h-segmented v-model:active-key="size" size="small" block :disabled="type === 'page'">
          <h-segmented-item value="small" label="S" />
          <h-segmented-item value="medium" label="M" />
          <h-segmented-item value="large" label="L" />
          <h-segmented-item value="huge" label="XL" />
        </h-segmented>
      </label>
    </div>

    <h-tabs v-model:active-key="activeKey" :type="type" :size="size">
      <h-tab v-for="stage in stages" :key="stage.key" :label="stage.label" />
    </h-tabs>
    <p aria-live="polite">
      {{ stages.find(stage => stage.key === activeKey)?.label }} stage selected.
    </p>
  </div>
</template>

<style scoped>
.tabs-variants-demo,
.tabs-variants-demo__options label {
  display: grid;
  gap: var(--h-spacing-3);
}

.tabs-variants-demo {
  min-width: 0;
  gap: var(--h-spacing-5);
}

.tabs-variants-demo__options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.tabs-variants-demo__options span,
.tabs-variants-demo > p {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.tabs-variants-demo > p {
  margin: 0;
}

@media (max-width: 560px) {
  .tabs-variants-demo__options {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
