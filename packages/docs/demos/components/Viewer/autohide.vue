<script setup lang="ts">
import { ref } from 'vue';
import { createImageReviewSources } from './sources';

const visible = ref(false);
const autoHide = ref(true);
const sources = createImageReviewSources();
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls"><h-switch v-model="autoHide" label="Auto hide tools" /></div>
    <div class="docs-demo__actions"><h-button @click="visible = true">Open viewer</h-button></div>
    <h-viewer v-model="visible" :sources="sources" :auto-hide-tools="autoHide" />
  </section>
</template>
