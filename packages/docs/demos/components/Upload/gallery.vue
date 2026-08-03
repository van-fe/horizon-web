<script setup lang="ts">
import type { HUploadUserFile } from '@aurora/horizon-web';
import { onBeforeUnmount, ref } from 'vue';
import { createMockUploader, resolveLocalUpload } from './mockUpload';

const mockUploader = createMockUploader();
const files = ref<HUploadUserFile[]>([
  { name: 'coast-campaign.svg', url: '/demo-assets/scene-coast.svg' },
  { name: 'city-campaign.svg', url: '/demo-assets/scene-city.svg' },
  { name: 'forest-campaign.svg', url: '/demo-assets/scene-forest.svg' },
]);
const status = ref('Sample gallery ready');

onBeforeUnmount(mockUploader.dispose);
</script>

<template>
  <div class="docs-demo">
    <h-upload
      id="upload-demo-gallery"
      v-model="files"
      :http-request="mockUploader.request"
      :handle-success="resolveLocalUpload"
      type="gallery"
      multiple
      accept="image/*"
      size="medium"
      gallery-shape="rectangle"
      controls-always-visible
      @add="file => (status = `${file.name} added`)"
      @uploaded="file => (status = `${file.name} uploaded`)"
      @remove="file => (status = `${file.name} removed`)"
    />
    <span aria-live="polite">{{ files.length }} images · {{ status }}</span>
  </div>
</template>
