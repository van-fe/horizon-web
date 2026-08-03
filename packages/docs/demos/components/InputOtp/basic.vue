<template>
  <h-input-otp v-model="code" aria-label="Verification code" @complete="handleComplete" />
  <p>Code: {{ code || '—' }}</p>
  <p v-if="completed">Complete: {{ completed }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const code = ref('');
const completed = ref('');
const handleComplete = (value: string) => {
  completed.value = value;
};
</script>
