<script setup lang="ts">
import type { HUploadFileType, HUploadUserFile } from '@aurora/horizon-web';
import { onBeforeUnmount, ref } from 'vue';
import { createMockUploader, resolveLocalUpload } from './mockUpload';

const mockUploader = createMockUploader();
const autoSlice = ref(true);
const files = ref<HUploadUserFile[]>([
  { name: 'release-cover.svg', url: '/demo-assets/scene-coast.svg' },
  { name: 'architecture-review.svg', url: '/demo-assets/scene-city.svg' },
]);
const status = ref('Two files attached');

function onExceed(pickedFiles: HUploadFileType[], existingFiles: HUploadFileType[]) {
  status.value = `${pickedFiles.length} files exceeded ${Math.max(3 - existingFiles.length, 0)} open slots`;
}

onBeforeUnmount(mockUploader.dispose);
</script>

<template>
  <div class="docs-demo">
    <h-switch v-model="autoSlice" label="Keep files within limit" />
    <h-upload
      id="upload-demo-multiple"
      v-model="files"
      :http-request="mockUploader.request"
      :handle-success="resolveLocalUpload"
      :auto-slice-exceed-files="autoSlice"
      multiple
      :limit="3"
      accept=".svg,.pdf,.zip"
      show-file-size
      controls-always-visible
      @uploaded="file => (status = `${file.name} uploaded`)"
      @remove="file => (status = `${file.name} removed`)"
      @exceed="onExceed"
    />
    <span aria-live="polite">{{ files.length }} / 3 files · {{ status }}</span>
  </div>
</template>
