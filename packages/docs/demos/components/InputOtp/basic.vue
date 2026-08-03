<template>
  <section class="docs-demo">
    <div class="otp-stage">
      <h-input-otp v-model="code" aria-label="Six-digit verification code" />
      <output class="docs-demo__value">code={{ code || 'empty' }}</output>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const code = ref('');
</script>

<style scoped>
.otp-stage {
  display: grid;
  gap: var(--h-spacing-3);
  place-items: start;
}
</style>
