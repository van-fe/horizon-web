<script setup lang="ts">
import { ref } from 'vue';

const score = ref(7);
</script>

<template>
  <div class="docs-demo">
    <h-rate v-model="score" :count="10" />
    <span aria-live="polite">{{ score }} / 10</span>
  </div>
</template>
