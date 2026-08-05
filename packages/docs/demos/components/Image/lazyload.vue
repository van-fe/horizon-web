<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import { ref } from 'vue';

const sources = [
  demoAssetUrl('scene-aurora.svg'),
  demoAssetUrl('scene-summit.svg'),
  demoAssetUrl('scene-coast.svg'),
  demoAssetUrl('scene-forest.svg'),
];
const loaded = ref(0);
</script>

<template>
  <section class="docs-demo">
    <p class="docs-demo__status">Loaded {{ loaded }} / {{ sources.length }}</p>
    <div class="image-scroller" tabindex="0" aria-label="Lazy-loaded images">
      <h-image
        v-for="(src, index) in sources"
        :key="src"
        :src="src"
        :alt="`Field report ${index + 1}`"
        width="100%"
        aspect-ratio="16/9"
        rounded="10"
        lazyload
        @load="loaded += 1"
      />
    </div>
  </section>
</template>

<style scoped>
.image-scroller {
  display: grid;
  width: min(100%, 520px);
  height: 320px;
  gap: var(--h-spacing-4);
  overflow-y: auto;
  padding-right: var(--h-spacing-2);
}
</style>
