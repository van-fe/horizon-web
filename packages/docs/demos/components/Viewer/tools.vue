<script setup lang="ts">
import { ref } from 'vue';
import type { HViewerCustomToolItem } from '@aurora/horizon-web';
import { createImageReviewSources } from './sources';

const visible = ref(false);
const status = ref('Custom tool ready');
const sources = createImageReviewSources();
const reviewTool: HViewerCustomToolItem = {
  iconName: 'tips',
  iconSize: '20',
  iconColor: 'var(--h-text-inverse)',
  title: 'Review note',
  handler: () => (status.value = 'Review note selected'),
};
const tools = ['previous', 'next', 'current', 'split', 'zoomOut', 'zoomIn', reviewTool] as const;
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__actions"><h-button @click="visible = true">Open viewer</h-button></div>
    <p class="docs-demo__status">{{ status }}</p>
    <h-viewer v-model="visible" :sources="sources" :tools="tools" />
  </section>
</template>
