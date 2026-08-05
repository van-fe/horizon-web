<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
</script>

<template>
  <h-image
    :src="demoAssetUrl('scene-night.svg')"
    :viewer-src="demoAssetUrl('scene-aurora.svg')"
    alt="Night field camp proof"
    title="Night field camp · full-resolution proof"
    width="100%"
    max-width="520px"
    aspect-ratio="16/9"
    rounded="12"
    show-viewer
  />
</template>
