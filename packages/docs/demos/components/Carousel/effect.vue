<script setup lang="ts">
const images = [
  { src: '/demo-assets/scene-city.svg', label: 'City at blue hour' },
  { src: '/demo-assets/scene-coast.svg', label: 'Coast at sunset' },
  { src: '/demo-assets/scene-summit.svg', label: 'Mountain summit' },
];
</script>

<template>
  <h-carousel
    class="image-carousel"
    autoplay
    arrow="never"
    effect="fade"
    height="240px"
    aria-label="Fading image carousel"
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
