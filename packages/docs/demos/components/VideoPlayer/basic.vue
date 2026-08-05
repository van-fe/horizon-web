<script setup lang="ts">
const sources = [{ src: '/aurora-background.mp4', type: 'video/mp4' }];
</script>

<template>
  <h-video-player :sources="sources" poster="/demo-assets/video-poster.svg" preload="metadata" />
</template>
