<template>
  <n-space>
    <n-upload-v2
      v-model="fileList"
      action="https://lego-inspector.nioint.com/upload-mock"
      :multiple="true"
      :limit="3"
      @change="handleChange"
      @add="onAddFile"
      @upload="onUploadFile"
      @remove="onRemoveFile"
      @uploading="onUploadingFile"
      @uploaded="onUploadedFile"
      @pause="onPauseFile"
      @continue="onContinueFile"
      @retry="onRetryFile"
      @fail="onFailFile"
      @exceed="onExceed"
    />
  </n-space>
</template>

<script lang="ts" setup>
import type { NUploadV2FileType } from '@nio-fe/lego';
import type { Data } from '@nio-fe/shared';
import { ref } from 'vue';

const fileList = ref([]);

function handleChange(file: NUploadV2FileType, response: Data) {
  console.log('change:', file, response);
}

function onAddFile(file: NUploadV2FileType) {
  console.log('Add File: ', file);
}

function onUploadFile(file: NUploadV2FileType) {
  console.log('Upload File: ', file);
}

function onRemoveFile(file: NUploadV2FileType) {
  console.log('Remove File: ', file);
}

function onUploadingFile(file: NUploadV2FileType, process: number, response: Data) {
  console.log('Uploading File: ', file, process, response);
}

function onUploadedFile(file: NUploadV2FileType, response: Data) {
  console.log('Uploaded File: ', file, response);
}

function onPauseFile(file: NUploadV2FileType) {
  console.log('Pause File: ', file);
}

function onContinueFile(file: NUploadV2FileType) {
  console.log('Continue File: ', file);
}

function onRetryFile(file: NUploadV2FileType) {
  console.log('Retry File: ', file);
}

function onFailFile(file: NUploadV2FileType, reason: string, response: Data) {
  console.log('Fail File: ', file, reason, response);
}

function onExceed(pickedFiles: NUploadV2FileType[], existedFiles: NUploadV2FileType[]) {
  console.log('Exceed Files: ', pickedFiles, existedFiles);
}
</script>
