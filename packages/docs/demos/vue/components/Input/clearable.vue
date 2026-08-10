<script setup lang="ts">
import { ref } from 'vue';

const value = ref('anika@studio.example');
const status = ref('Ready');
</script>

<template>
  <label class="input-clearable-demo" for="clearable-email">
    <span>Collaborator email</span>
    <h-input
      id="clearable-email"
      v-model="value"
      clearable
      autocomplete="email"
      placeholder="name@company.example"
      @input="status = 'Updated'"
      @clear="status = 'Cleared'"
    />
    <small aria-live="polite">{{ status }}</small>
  </label>
</template>

<style scoped>
.input-clearable-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 560px;
}

.input-clearable-demo > span,
.input-clearable-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
