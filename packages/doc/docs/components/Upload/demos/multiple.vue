<template>
  <h-upload
    v-model="fileList"
    action="https://horizon-web-inspector.nioint.com/upload-mock"
    :multiple="true"
    :limit="3"
    crossorigin="anonymous"
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
</template>

<script lang="ts" setup>
import type { NUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';
import { ref } from 'vue';

const fileList = ref([]);

function handleChange(file: NUploadFileType, response: Data) {
  console.info('change:', file, response);
}

function onAddFile(file: NUploadFileType) {
  console.info('Add File: ', file);
}

function onUploadFile(file: NUploadFileType) {
  console.info('Upload File: ', file);
}

function onRemoveFile(file: NUploadFileType) {
  console.info('Remove File: ', file);
}

function onUploadingFile(file: NUploadFileType, process: number, response: Data) {
  console.info('Uploading File: ', file, process, response);
}

function onUploadedFile(file: NUploadFileType, response: Data) {
  console.info('Uploaded File: ', file, response);
}

function onPauseFile(file: NUploadFileType) {
  console.info('Pause File: ', file);
}

function onContinueFile(file: NUploadFileType) {
  console.info('Continue File: ', file);
}

function onRetryFile(file: NUploadFileType) {
  console.info('Retry File: ', file);
}

function onFailFile(file: NUploadFileType, reason: string, response: Data) {
  console.info('Fail File: ', file, reason, response);
}

function onExceed(pickedFiles: NUploadFileType[], existedFiles: NUploadFileType[]) {
  console.info('Exceed Files: ', pickedFiles, existedFiles);
}
</script>
