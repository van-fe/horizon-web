<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import type { HUploadFileType, HUploadUserFile } from '@aurora/horizon-web';
import { onBeforeUnmount, ref } from 'vue';
import { createMockUploader, resolveLocalUpload } from './mockUpload';

const mockUploader = createMockUploader();
const file = ref<HUploadUserFile>({
  name: 'release-cover.svg',
  url: demoAssetUrl('scene-coast.svg'),
});
const status = ref('Ready to replace the current file');

function onUploading(file: HUploadFileType, progress: number) {
  status.value = `Uploading ${file.name} · ${Math.round(progress)}%`;
}

onBeforeUnmount(mockUploader.dispose);
</script>

<template>
  <div class="docs-demo">
    <h-upload
      id="upload-demo-basic"
      v-model="file"
      :http-request="mockUploader.request"
      :handle-success="resolveLocalUpload"
      accept=".svg,.png,.jpg,.jpeg"
      controls-always-visible
      @add="addedFile => (status = `${addedFile.name} selected`)"
      @uploading="onUploading"
      @uploaded="uploadedFile => (status = `${uploadedFile.name} uploaded`)"
      @remove="status = 'File removed'"
    />
    <span aria-live="polite">{{ status }}</span>
  </div>
</template>
