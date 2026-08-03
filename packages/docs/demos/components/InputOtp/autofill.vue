<template>
  <h-input-otp
    v-model="code"
    name="verification-code"
    autocomplete="one-time-code"
    aria-label="One-time verification code"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const code = ref('');
</script>
