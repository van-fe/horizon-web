<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
</script>

<template>
  <h-image
    :src="demoAssetUrl('scene-coast.svg')"
    alt="Illustrated coastline at sunset"
    width="100%"
    max-width="520px"
    rounded="12"
  />
</template>
