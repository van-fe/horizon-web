<script setup lang="ts">
import { computed, ref } from 'vue';

const scheme = ref('https://');
const host = ref('research-notes');
const address = computed(() => `${scheme.value}${host.value || 'workspace'}.example.com`);
</script>

<template>
  <label class="input-mixed-demo">
    <span>Workspace address</span>
    <h-input v-model="host" aria-label="Workspace host">
      <template #prepend>
        <h-select v-model="scheme" aria-label="URL scheme">
          <h-option label="https://" value="https://" />
          <h-option label="http://" value="http://" />
        </h-select>
      </template>
      <template #append>.example.com</template>
    </h-input>
    <small aria-live="polite">{{ address }}</small>
  </label>
</template>

<style scoped>
.input-mixed-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 640px;
}

.input-mixed-demo > span,
.input-mixed-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.input-mixed-demo :deep(.h-input__group--prepend .h-select) {
  inline-size: 104px;
}
</style>
