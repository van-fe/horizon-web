<template>
  <n-upload
    v-model="fileList"
    action="https://lego-inspector.nioint.com/upload-mock"
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
import type { NUploadFileType } from '@nio-fe/lego';
import type { Data } from '@nio-fe/shared';
import { ref } from 'vue';

const fileList = ref([]);

function handleChange(file: NUploadFileType, response: Data) {
  console.log('change:', file, response);
}

function onAddFile(file: NUploadFileType) {
  console.log('Add File: ', file);
}

function onUploadFile(file: NUploadFileType) {
  console.log('Upload File: ', file);
}

function onRemoveFile(file: NUploadFileType) {
  console.log('Remove File: ', file);
}

function onUploadingFile(file: NUploadFileType, process: number, response: Data) {
  console.log('Uploading File: ', file, process, response);
}

function onUploadedFile(file: NUploadFileType, response: Data) {
  console.log('Uploaded File: ', file, response);
}

function onPauseFile(file: NUploadFileType) {
  console.log('Pause File: ', file);
}

function onContinueFile(file: NUploadFileType) {
  console.log('Continue File: ', file);
}

function onRetryFile(file: NUploadFileType) {
  console.log('Retry File: ', file);
}

function onFailFile(file: NUploadFileType, reason: string, response: Data) {
  console.log('Fail File: ', file, reason, response);
}

function onExceed(pickedFiles: NUploadFileType[], existedFiles: NUploadFileType[]) {
  console.log('Exceed Files: ', pickedFiles, existedFiles);
}
</script>
