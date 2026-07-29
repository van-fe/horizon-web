<template>
  <h-space>
    <h-upload
      v-model="fileList"
      action="https://horizon-web-inspector.demoint.com/upload-mock"
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
  </h-space>
</template>

<script lang="ts" setup>
import type { HUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';
import { ref } from 'vue';

const fileList = ref([]);

function handleChange(file: HUploadFileType, response: Data) {
  console.info('change:', file, response);
}

function onAddFile(file: HUploadFileType) {
  console.info('Add File: ', file);
}

function onUploadFile(file: HUploadFileType) {
  console.info('Upload File: ', file);
}

function onRemoveFile(file: HUploadFileType) {
  console.info('Remove File: ', file);
}

function onUploadingFile(file: HUploadFileType, process: number, response: Data) {
  console.info('Uploading File: ', file, process, response);
}

function onUploadedFile(file: HUploadFileType, response: Data) {
  console.info('Uploaded File: ', file, response);
}

function onPauseFile(file: HUploadFileType) {
  console.info('Pause File: ', file);
}

function onContinueFile(file: HUploadFileType) {
  console.info('Continue File: ', file);
}

function onRetryFile(file: HUploadFileType) {
  console.info('Retry File: ', file);
}

function onFailFile(file: HUploadFileType, reason: string, response: Data) {
  console.info('Fail File: ', file, reason, response);
}

function onExceed(pickedFiles: HUploadFileType[], existedFiles: HUploadFileType[]) {
  console.info('Exceed Files: ', pickedFiles, existedFiles);
}
</script>
