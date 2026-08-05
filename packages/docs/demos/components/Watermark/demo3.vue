<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
</script>

<template>
  <h-watermark
    content="Northstar"
    :image="demoAssetUrl('watermark.svg')"
    :width="96"
    :height="48"
    :opacity="0.22"
  >
    <figure class="watermark-image-demo-asset">
      <img :src="demoAssetUrl('scene-city.svg')" alt="City campaign artwork" />
      <figcaption>City launch · pre-release proof</figcaption>
    </figure>
  </h-watermark>
</template>

<style scoped>
.watermark-image-demo-asset {
  display: grid;
  gap: var(--h-spacing-3);
  padding-bottom: var(--h-spacing-3);
  margin: 0;
  background: var(--h-bg-weak-default);
}

.watermark-image-demo-asset img {
  display: block;
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.watermark-image-demo-asset figcaption {
  padding-inline: var(--h-spacing-4);
  color: var(--h-text-secondary);
}
</style>
