<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
const crops = [
  { label: '0', rounded: 0 },
  { label: '8px', rounded: 8 },
  { label: '24px', rounded: 24 },
  { label: '50%', rounded: '50%' },
];
</script>

<template>
  <div class="image-grid">
    <figure v-for="crop in crops" :key="crop.label">
      <h-image
        :src="demoAssetUrl('avatar-indigo.svg')"
        :alt="`${crop.label} rounded image`"
        width="100%"
        aspect-ratio="1/1"
        :rounded="crop.rounded"
      />
      <figcaption>{{ crop.label }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

figure {
  min-width: 0;
  margin: 0;
}

figcaption {
  margin-top: var(--h-spacing-2);
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
  text-align: center;
}

@media (max-width: 560px) {
  .image-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
