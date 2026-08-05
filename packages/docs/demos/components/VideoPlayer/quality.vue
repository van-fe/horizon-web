<script setup lang="ts">
import { demoAssetUrl, publicAssetUrl } from '../../demo-assets';
import { ref } from 'vue';

const video = publicAssetUrl('aurora-background.mp4');
const status = ref('720p');
const sources = [
  { src: video, type: 'video/mp4', label: '1080p' },
  { src: video, type: 'video/mp4', label: '720p', default: true },
  { src: video, type: 'video/mp4', label: 'Data saver' },
];
</script>

<template>
  <section class="docs-demo">
    <h-video-player
      :sources="sources"
      :poster="demoAssetUrl('video-poster.svg')"
      preload="metadata"
      @source-change="status = $event.label"
    />
    <p class="docs-demo__status">{{ status }}</p>
  </section>
</template>
