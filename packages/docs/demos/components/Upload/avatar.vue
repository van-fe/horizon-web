<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import type { HUploadUserFile } from '@aurora/horizon-web';
import { onBeforeUnmount, ref } from 'vue';
import { createMockUploader, resolveLocalUpload } from './mockUpload';

const mockUploader = createMockUploader();
const file = ref<HUploadUserFile>({
  name: 'avatar.svg',
  url: demoAssetUrl('avatar-indigo.svg'),
});
const status = ref('Avatar ready');

onBeforeUnmount(mockUploader.dispose);
</script>

<template>
  <div class="docs-demo">
    <h-upload
      id="upload-demo-avatar"
      v-model="file"
      :http-request="mockUploader.request"
      :handle-success="resolveLocalUpload"
      type="gallery"
      size="huge"
      gallery-shape="square"
      accept="image/*"
      controls-always-visible
      @add="addedFile => (status = `${addedFile.name} selected`)"
      @uploaded="uploadedFile => (status = `${uploadedFile.name} uploaded`)"
      @remove="status = 'Avatar removed'"
    />
    <span aria-live="polite">{{ status }}</span>
  </div>
</template>
