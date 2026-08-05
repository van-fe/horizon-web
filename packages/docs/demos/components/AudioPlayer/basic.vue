<script setup lang="ts">
import { publicAssetUrl } from '../../demo-assets';
</script>

<template>
  <section class="docs-demo">
    <h-audio-player
      :src="publicAssetUrl('aurora-background.mp4')"
      waveform-source="mock"
      mock-seed="product-podcast-12"
      aria-label="产品播客：从想法到可交付设计"
    />
  </section>
</template>
