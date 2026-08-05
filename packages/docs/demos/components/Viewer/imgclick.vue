<script setup lang="ts">
import { ref } from 'vue';
import { createImageReviewSources } from './sources';

const sources = createImageReviewSources();
const visible = ref(false);
const initialIndex = ref(0);

function open(index: number) {
  initialIndex.value = index;
  visible.value = true;
}
</script>

<template>
  <div class="thumbnail-grid">
    <button
      v-for="(source, index) in sources"
      :key="source.cover"
      type="button"
      :aria-label="`Open ${source.title}`"
      @click="open(index)"
    >
      <img :src="source.thumbnail" :alt="source.title" />
    </button>
    <h-viewer v-model="visible" :sources="sources" :init-index="initialIndex" />
  </div>
</template>

<style scoped>
.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--h-spacing-3);
}

button {
  min-width: 0;
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
  padding: var(--h-spacing-1);
  background: var(--h-bg-default);
  cursor: zoom-in;
}

button:focus-visible {
  outline: 2px solid var(--h-border-brand-default);
  outline-offset: 2px;
}

img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: var(--h-radius-s);
  object-fit: cover;
}

@media (max-width: 560px) {
  .thumbnail-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
