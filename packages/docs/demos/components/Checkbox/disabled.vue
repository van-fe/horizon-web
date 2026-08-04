<script setup lang="ts">
import { computed, ref } from 'vue';

type DisabledState = 'unchecked' | 'indeterminate' | 'checked';

const state = ref<DisabledState>('indeterminate');
const border = ref(false);
const checked = computed(() => state.value === 'checked');
const indeterminate = computed(() => state.value === 'indeterminate');
</script>

<template>
  <section class="checkbox-disabled-demo">
    <div class="checkbox-disabled-demo__controls">
      <h-segmented v-model:active-key="state" size="small">
        <h-segmented-item value="unchecked" label="Unchecked" />
        <h-segmented-item value="indeterminate" label="Mixed" />
        <h-segmented-item value="checked" label="Checked" />
      </h-segmented>
      <h-switch v-model="border" label="Border" />
    </div>

    <div class="checkbox-disabled-demo__preview">
      <h-checkbox :model-value="checked" :indeterminate="indeterminate" :border="border" disabled>
        Required review
      </h-checkbox>
      <code>{{ state }} · {{ border ? 'border' : 'plain' }}</code>
    </div>
  </section>
</template>

<style scoped>
.checkbox-disabled-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-4);
}

.checkbox-disabled-demo__controls,
.checkbox-disabled-demo__preview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
}

.checkbox-disabled-demo__preview code {
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .checkbox-disabled-demo__controls,
  .checkbox-disabled-demo__preview {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
