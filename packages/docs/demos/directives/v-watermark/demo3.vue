<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
</script>

<template>
  <div
    v-watermark="{
      image: demoAssetUrl('watermark.svg'),
      content: 'watermark watermark',
    }"
  >
    <div style="height: 300px"></div>
  </div>
</template>
