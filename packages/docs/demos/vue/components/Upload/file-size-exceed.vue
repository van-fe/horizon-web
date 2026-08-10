<script setup lang="ts">
import type { HUploadFileType, HUploadUserFile } from '@aurora/horizon-web';
import { onBeforeUnmount, ref } from 'vue';
import { createMockUploader, resolveLocalUpload } from './mockUpload';

const sizeLimitMb = 2;
const mockUploader = createMockUploader();
const files = ref<HUploadUserFile[]>([]);
const status = ref('Choose a file up to 2 MB');

function onFileSizeExceed(files: HUploadFileType[]) {
  status.value = `${files.map(file => file.name).join(', ')} exceeded 2 MB`;
}

onBeforeUnmount(mockUploader.dispose);
</script>

<template>
  <div class="docs-demo">
    <h-upload
      id="upload-demo-file-size"
      v-model="files"
      :http-request="mockUploader.request"
      :handle-success="resolveLocalUpload"
      :file-size-limit="sizeLimitMb"
      accept=".pdf,.txt,.zip"
      @file-size-exceed="onFileSizeExceed"
      @uploaded="file => (status = `${file.name} uploaded`)"
    />
    <span aria-live="polite">{{ status }}</span>
  </div>
</template>
