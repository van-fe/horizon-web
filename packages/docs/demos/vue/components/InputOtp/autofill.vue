<template>
  <section class="docs-demo">
    <form class="otp-form" @submit.prevent>
      <label for="verification-code">Verification code</label>
      <h-input-otp
        id="verification-code"
        v-model="code"
        name="verification-code"
        autocomplete="one-time-code"
        aria-label="One-time verification code"
      />
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const code = ref('');
</script>

<style scoped>
.otp-form label {
  color: var(--h-text-primary);
  font-weight: var(--h-weight-strong);
}

.otp-form {
  display: grid;
  gap: var(--h-spacing-3);
}
</style>
