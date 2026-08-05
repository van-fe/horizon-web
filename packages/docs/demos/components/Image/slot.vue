<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
</script>

<template>
  <div class="image-grid">
    <h-image
      :src="demoAssetUrl('scene-coast.svg')"
      alt="Coastal monitoring station"
      width="100%"
      aspect-ratio="4/3"
      rounded="12"
    >
      <div class="overlay">Always visible</div>
    </h-image>

    <h-image
      :src="demoAssetUrl('scene-forest.svg')"
      alt="Forest canopy survey"
      width="100%"
      aspect-ratio="4/3"
      rounded="12"
    >
      <template #hover><div class="overlay">Visible on hover</div></template>
    </h-image>
  </div>
</template>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.overlay {
  position: absolute;
  right: var(--h-spacing-3);
  bottom: var(--h-spacing-3);
  left: var(--h-spacing-3);
  border-radius: var(--h-radius-m);
  padding: var(--h-spacing-2) var(--h-spacing-3);
  color: var(--h-text-inverse);
  background: rgb(0 0 0 / 60%);
}

@media (max-width: 560px) {
  .image-grid {
    grid-template-columns: 1fr;
  }
}
</style>
