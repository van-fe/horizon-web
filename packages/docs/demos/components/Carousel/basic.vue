<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
const images = [
  { src: demoAssetUrl('scene-city.svg'), label: 'City at blue hour' },
  { src: demoAssetUrl('scene-coast.svg'), label: 'Coast at sunset' },
  { src: demoAssetUrl('scene-summit.svg'), label: 'Mountain summit' },
];
</script>

<template>
  <h-carousel
    class="image-carousel"
    :initial-index="1"
    :autoplay="false"
    arrow="always"
    height="240px"
    aria-label="Featured images"
  >
    <h-carousel-item v-for="image in images" :key="image.src" :label="image.label">
      <img :src="image.src" :alt="image.label" />
    </h-carousel-item>
  </h-carousel>
</template>

<style scoped>
.image-carousel {
  width: 600px;
  max-width: 100%;
  margin: 0 auto;
}

.image-carousel img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
