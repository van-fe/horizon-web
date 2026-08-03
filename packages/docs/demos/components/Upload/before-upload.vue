<script setup lang="ts">
import type { HUploadFileType, HUploadUserFile } from '@aurora/horizon-web';
import { onBeforeUnmount, ref } from 'vue';
import { createMockUploader, resolveLocalUpload } from './mockUpload';

const mockUploader = createMockUploader();
const acceptStrict = ref(true);
const files = ref<HUploadUserFile[]>([]);
const status = ref('Only PNG files are accepted');

function beforeUpload(file: HUploadFileType) {
  const valid = file.raw?.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
  status.value = valid ? `${file.name} passed validation` : `${file.name} was rejected`;
  return valid;
}

function onAcceptError(files: HUploadFileType[]) {
  status.value = `${files.map(file => file.name).join(', ')} did not match .png`;
}

onBeforeUnmount(mockUploader.dispose);
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="acceptStrict" label="Strict accept filtering" />
    <h-upload
      id="upload-demo-before-upload"
      v-model="files"
      :http-request="mockUploader.request"
      :handle-success="resolveLocalUpload"
      accept=".png"
      :accept-strict="acceptStrict"
      :before-upload="beforeUpload"
      @accept-error="onAcceptError"
      @uploaded="file => (status = `${file.name} uploaded`)"
    />
    <span aria-live="polite">{{ status }}</span>
  </div>
</template>
