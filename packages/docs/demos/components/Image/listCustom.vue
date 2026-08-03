<script setup lang="ts">
const images = [
  { src: '/demo-assets/scene-city.svg', title: 'North entrance' },
  { src: '/demo-assets/scene-coast.svg', title: 'Cooling system' },
  { src: '/demo-assets/scene-forest.svg', title: 'Safety perimeter' },
  { src: '/demo-assets/scene-night.svg', title: 'Night lighting' },
  { src: '/demo-assets/scene-summit.svg', title: 'Roof access' },
  { src: '/demo-assets/scene-aurora.svg', title: 'Control room' },
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
