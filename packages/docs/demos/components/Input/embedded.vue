<template>
  <div class="embedded-input-demo">
    <span class="label">To:</span>
    <h-input
      v-model="value"
      embedded
      fit-content
      :fit-content-min-width="24"
      placeholder="recipient"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('Horizon');
</script>

<style scoped>
.embedded-input-demo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 240px;
  padding: 8px 12px;
  border: 1px solid var(--h-border-color-default);
  border-radius: 4px;
}

.label {
  color: var(--h-font-color-secondary);
}
</style>
