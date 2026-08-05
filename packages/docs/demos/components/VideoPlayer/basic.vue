<script setup lang="ts">
import { demoAssetUrl, publicAssetUrl } from '../../demo-assets';
const sources = [{ src: publicAssetUrl('aurora-background.mp4'), type: 'video/mp4' }];
</script>

<template>
  <h-video-player
    :sources="sources"
    :poster="demoAssetUrl('video-poster.svg')"
    preload="metadata"
  />
</template>
