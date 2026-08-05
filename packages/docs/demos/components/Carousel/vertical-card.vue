<script setup lang="ts">
const images = [
  { src: '/demo-assets/scene-city.svg', label: 'City at blue hour' },
  { src: '/demo-assets/scene-coast.svg', label: 'Coast at sunset' },
  { src: '/demo-assets/scene-summit.svg', label: 'Mountain summit' },
  { src: '/demo-assets/scene-night.svg', label: 'City at night' },
];
</script>

<template>
  <h-carousel
    class="vertical-card-carousel"
    direction="vertical"
    effect="card"
    indicator-position="outer-right"
    indicator-type="line"
    arrow="never"
    autoplay
    height="300px"
    aria-label="Vertical card image carousel"
  >
    <h-carousel-item v-for="image in images" :key="image.src" :label="image.label">
      <img :src="image.src" :alt="image.label" />
    </h-carousel-item>
  </h-carousel>
</template>

<style scoped>
.vertical-card-carousel {
  width: 600px;
  max-width: 100%;
  margin: 0 auto;
}

.vertical-card-carousel img {
  display: block;
  width: min(500px, 100%);
  height: 100%;
  object-fit: cover;
}
</style>
