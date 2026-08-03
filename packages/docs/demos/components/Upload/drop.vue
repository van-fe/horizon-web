<script setup lang="ts">
import type { HUploadFileType, HUploadUserFile } from '@aurora/horizon-web';
import { computed, onBeforeUnmount, ref } from 'vue';
import { createMockUploader, resolveLocalUpload } from './mockUpload';

const mockUploader = createMockUploader();
const acceptMode = ref<'png' | 'common'>('common');
const acceptedTypes = computed(() => (acceptMode.value === 'png' ? '.png' : '.png,.jpg,.jpeg'));
const files = ref<HUploadUserFile[]>([]);
const status = ref('PNG and JPEG files accepted');

function onAcceptError(files: HUploadFileType[]) {
  status.value = `${files.map(file => file.name).join(', ')} did not match ${acceptedTypes.value}`;
}

onBeforeUnmount(mockUploader.dispose);
</script>

<template>
  <div class="docs-demo upload-drop-demo">
    <h-segmented v-model:active-key="acceptMode" size="small">
      <h-segmented-item key="png" label="PNG only" />
      <h-segmented-item key="common" label="PNG + JPEG" />
    </h-segmented>
    <h-upload
      id="upload-demo-drop"
      v-model="files"
      :http-request="mockUploader.request"
      :handle-success="resolveLocalUpload"
      type="drop"
      multiple
      :limit="5"
      :accept="acceptedTypes"
      controls-always-visible
      @uploaded="file => (status = `${file.name} uploaded`)"
      @accept-error="onAcceptError"
      @exceed="status = 'Five-file limit exceeded'"
    />
    <span aria-live="polite">{{ status }}</span>
  </div>
</template>

<style scoped>
@media (max-width: 390px) {
  .upload-drop-demo :deep(.h-upload--drop-area) {
    width: 100%;
    min-width: 0;
  }
}
</style>
