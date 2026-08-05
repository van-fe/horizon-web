<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
const images = [
  { src: demoAssetUrl('scene-city.svg'), label: 'City at blue hour' },
  { src: demoAssetUrl('scene-coast.svg'), label: 'Coast at sunset' },
  { src: demoAssetUrl('scene-summit.svg'), label: 'Mountain summit' },
  { src: demoAssetUrl('scene-night.svg'), label: 'City at night' },
];
</script>

<template>
  <h-carousel
    class="card-carousel"
    effect="card"
    arrow="never"
    indicator-position="outside"
    autoplay
    height="240px"
    aria-label="Card image carousel"
  >
    <h-carousel-item v-for="image in images" :key="image.src" :label="image.label">
      <img :src="image.src" :alt="image.label" />
    </h-carousel-item>
  </h-carousel>
</template>

<style scoped>
.card-carousel {
  width: 100%;
}

.card-carousel img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
