<script setup lang="ts">
import { ref } from 'vue';

const value = ref('mira.chen@northstar.example');
</script>

<template>
  <label class="input-disabled-demo" for="disabled-email">
    <span>Primary work email</span>
    <h-input
      id="disabled-email"
      v-model="value"
      disabled
      autocomplete="email"
      aria-describedby="disabled-email-help"
    />
    <small id="disabled-email-help">Managed by the company directory</small>
  </label>
</template>

<style scoped>
.input-disabled-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 560px;
}

.input-disabled-demo > span,
.input-disabled-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
