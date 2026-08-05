<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
const ratios = ['1/1', '4/3', '16/9'];
</script>

<template>
  <div class="image-grid">
    <figure v-for="ratio in ratios" :key="ratio">
      <h-image
        :src="demoAssetUrl('scene-forest.svg')"
        :alt="`${ratio} forest artwork`"
        width="100%"
        :aspect-ratio="ratio"
        rounded="10"
      />
      <figcaption>{{ ratio.replace('/', ':') }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: end;
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
    grid-template-columns: 1fr;
  }
}
</style>
