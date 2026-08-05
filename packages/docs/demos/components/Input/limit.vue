<script setup lang="ts">
import { computed, ref } from 'vue';

const limit = 120;
const value = ref('Traffic has returned to the primary pool.');
const allowOverflow = ref(true);
const exceeded = computed(() => value.value.length > limit);
</script>

<template>
  <section class="input-limit-demo">
    <h-switch v-model="allowOverflow" label="Allow over limit" status />
    <label for="limited-message">
      <span>Subscriber message</span>
      <h-input
        id="limited-message"
        v-model="value"
        type="textarea"
        :maxlength="limit"
        :enable-out-of-exceeded="allowOverflow"
        :status="exceeded ? 'error' : undefined"
        :auto-size="{ minRows: 3, maxRows: 5 }"
        resize="none"
        show-limit
      />
    </label>
    <small aria-live="polite">{{ exceeded ? 'Over the limit' : 'Within the limit' }}</small>
  </section>
</template>

<style scoped>
.input-limit-demo,
.input-limit-demo label {
  display: grid;
  gap: var(--h-spacing-2);
}

.input-limit-demo {
  gap: var(--h-spacing-3);
  max-inline-size: 640px;
}

.input-limit-demo span,
.input-limit-demo small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
