<script setup lang="ts">
import { ref } from 'vue';
import { createImageReviewSources } from './sources';

const visible = ref(false);
const sources = createImageReviewSources();
</script>

<template>
  <div>
    <h-button @click="visible = true">Open from last image</h-button>
    <h-viewer v-model="visible" :sources="sources" :init-index="sources.length - 1" loop />
  </div>
</template>
