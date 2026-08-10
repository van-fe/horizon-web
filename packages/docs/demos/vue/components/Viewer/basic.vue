<script setup lang="ts">
import { ref } from 'vue';
import { createMixedReviewSources } from './sources';

const visible = ref(false);
const sources = createMixedReviewSources();
</script>

<template>
  <div>
    <h-button @click="visible = true">Open viewer</h-button>
    <h-viewer v-model="visible" :sources="sources" />
  </div>
</template>
