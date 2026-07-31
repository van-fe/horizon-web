<template>
  <h-space direction="vertical" size="large">
    <h-input-otp v-model="maskedCode" mask aria-label="Masked verification code" />
    <h-input-otp
      v-model="mixedCode"
      type="alphanumeric"
      :length="4"
      aria-label="Alphanumeric verification code"
    />
    <h-input-otp model-value="123456" disabled aria-label="Disabled verification code" />
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const maskedCode = ref('123');
const mixedCode = ref('A7');
</script>
