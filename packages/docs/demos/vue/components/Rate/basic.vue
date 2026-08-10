<script setup lang="ts">
import { ref } from 'vue';

const score = ref(4);
</script>

<template>
  <div class="docs-demo">
    <h-rate v-model="score" />
    <span aria-live="polite">{{ score }} / 5</span>
  </div>
</template>
