<script setup lang="ts">
const images = [
  { src: '/demo-assets/scene-aurora.svg', title: 'Aurora station' },
  { src: '/demo-assets/scene-summit.svg', title: 'Summit route' },
  { src: '/demo-assets/scene-city.svg', title: 'City archive' },
  { src: '/demo-assets/scene-coast.svg', title: 'Coastal lab' },
  { src: '/demo-assets/scene-forest.svg', title: 'Forest survey' },
  { src: '/demo-assets/scene-night.svg', title: 'Night camp' },
];
</script>

<template>
  <h-image-list :margin="8" :limit="4">
    <h-image
      v-for="image in images"
      :key="image.src"
      :src="image.src"
      :alt="image.title"
      :title="image.title"
      width="96px"
      height="96px"
      rounded="10"
      show-viewer
    />
  </h-image-list>
</template>
