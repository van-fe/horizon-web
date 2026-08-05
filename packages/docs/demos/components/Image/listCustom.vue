<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
const images = [
  { src: demoAssetUrl('scene-city.svg'), title: 'North entrance' },
  { src: demoAssetUrl('scene-coast.svg'), title: 'Cooling system' },
  { src: demoAssetUrl('scene-forest.svg'), title: 'Safety perimeter' },
  { src: demoAssetUrl('scene-night.svg'), title: 'Night lighting' },
  { src: demoAssetUrl('scene-summit.svg'), title: 'Roof access' },
  { src: demoAssetUrl('scene-aurora.svg'), title: 'Control room' },
];
const limit = 3;
</script>

<template>
  <h-image-list :limit="limit" :margin="8" :limit-text-size="12">
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
    <template #limit>
      <span class="limit">+{{ images.length - limit }}</span>
    </template>
  </h-image-list>
</template>

<style scoped>
.limit {
  color: var(--h-text-inverse);
  font-weight: 700;
}
</style>
