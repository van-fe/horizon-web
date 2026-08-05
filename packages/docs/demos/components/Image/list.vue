<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
const images = [
  { src: demoAssetUrl('scene-aurora.svg'), title: 'Aurora station' },
  { src: demoAssetUrl('scene-summit.svg'), title: 'Summit route' },
  { src: demoAssetUrl('scene-city.svg'), title: 'City archive' },
  { src: demoAssetUrl('scene-coast.svg'), title: 'Coastal lab' },
  { src: demoAssetUrl('scene-forest.svg'), title: 'Forest survey' },
  { src: demoAssetUrl('scene-night.svg'), title: 'Night camp' },
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
