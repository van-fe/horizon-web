<script setup lang="ts">
import type { HUploadFileType, HUploadRawFileType } from '@aurora/horizon-web';
import { onBeforeUnmount, ref } from 'vue';
import { createMockUploader, resolveLocalUpload } from './mockUpload';

interface UploadExpose {
  upload: (files?: HUploadRawFileType[]) => Promise<void>;
  abort: () => Promise<void>;
  destroyBackgroundUploader: () => void;
}

const mockUploader = createMockUploader(120);
const uploadRef = ref<UploadExpose>();
const useBackground = ref(true);
const showFileList = ref(true);
const status = ref('Background upload ready');

function onUploading(file: HUploadFileType, progress: number) {
  status.value = `${file.name} · ${Math.round(progress)}%`;
}

async function startSampleUpload() {
  const file = new File([new Uint8Array(640 * 1024)], 'release-evidence.zip', {
    type: 'application/zip',
  });
  status.value = 'Sample added to background queue';
  await uploadRef.value?.upload([file]);
}

onBeforeUnmount(() => {
  void uploadRef.value?.abort();
  uploadRef.value?.destroyBackgroundUploader();
  mockUploader.dispose();
});
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="useBackground" label="Background queue" />
      <h-switch v-model="showFileList" label="Show inline list" />
      <h-button size="small" @click="startSampleUpload">Start sample</h-button>
    </div>
    <h-upload
      id="release-background-uploader"
      ref="uploadRef"
      v-model:use-background="useBackground"
      :http-request="mockUploader.request"
      :handle-success="resolveLocalUpload"
      :show-file-list="showFileList"
      :auto-upload="false"
      @uploading="onUploading"
      @uploaded="file => (status = `${file.name} uploaded`)"
    />
    <span aria-live="polite">{{ status }}</span>
  </div>
</template>
