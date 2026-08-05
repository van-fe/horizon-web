<script setup lang="ts">
import { demoAssetUrl, publicAssetUrl } from '../../demo-assets';
import { ref } from 'vue';

const sources = [{ src: publicAssetUrl('aurora-background.mp4'), type: 'video/mp4' }];
const rotation = ref<0 | 90 | 180 | 270>(0);
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="rotation" size="small">
        <h-segmented-item :value="0" label="0°" />
        <h-segmented-item :value="90" label="90°" />
        <h-segmented-item :value="180" label="180°" />
        <h-segmented-item :value="270" label="270°" />
      </h-segmented>
    </div>
    <h-video-player
      :sources="sources"
      :poster="demoAssetUrl('video-poster.svg')"
      :rotate="rotation"
      preload="metadata"
    />
  </section>
</template>
