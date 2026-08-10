<script setup lang="ts">
import { computed, ref } from 'vue';

const value = ref('api.internal');
const valid = computed(() => /^https:\/\/[\w.-]+(?:\/.*)?$/.test(value.value.trim()));
</script>

<template>
  <label class="input-status-demo" for="status-input">
    <span>Webhook endpoint</span>
    <h-input
      id="status-input"
      v-model="value"
      :status="valid ? undefined : 'error'"
      placeholder="https://hooks.example.com/events"
      aria-describedby="status-input-help"
    />
    <small id="status-input-help" :class="{ valid }" role="status">
      {{ valid ? 'Valid secure endpoint' : 'Start with https:// and include a host' }}
    </small>
  </label>
</template>

<style scoped>
.input-status-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 560px;
}

.input-status-demo > span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

.input-status-demo > small {
  color: var(--h-text-error-default);
}

.input-status-demo > small.valid {
  color: var(--h-text-success-default);
}
</style>
