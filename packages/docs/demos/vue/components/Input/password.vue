<script setup lang="ts">
import { computed, ref } from 'vue';

const value = ref('Horizon!27');
const score = computed(
  () =>
    [
      value.value.length >= 10,
      /[A-Z]/.test(value.value) && /[a-z]/.test(value.value),
      /\d/.test(value.value),
      /[^\w\s]/.test(value.value),
    ].filter(Boolean).length,
);
</script>

<template>
  <label class="input-password-demo" for="password-input">
    <span>Password</span>
    <h-input
      id="password-input"
      v-model="value"
      type="password"
      show-password
      clearable
      autocomplete="new-password"
      aria-describedby="password-rules"
    />
    <small id="password-rules" aria-live="polite">
      {{ score }}/4 rules met · 10+ characters, mixed case, number, symbol
    </small>
  </label>
</template>

<style scoped>
.input-password-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 560px;
}

.input-password-demo > span,
.input-password-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
