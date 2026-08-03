<script setup lang="ts">
const onCrop = (_blob: Blob, dataUrl: string) => console.info(dataUrl.slice(0, 32));
</script>
<template>
  <h-image-cropper src="/demo-assets/scene-aurora.svg" :width="480" :height="300" @crop="onCrop" />
</template>
