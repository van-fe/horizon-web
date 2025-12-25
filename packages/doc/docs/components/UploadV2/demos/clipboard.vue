<template>
  <n-form label-position="left">
    <n-form-item label="Use Clipboard">
      <n-switch v-model="useClipboard" />
    </n-form-item>
    <n-form-item v-show="useClipboard" label="Use Before Paste">
      <n-switch v-model="enableBeforePaste" />
    </n-form-item>
    <n-form-item label="Multiple">
      <n-switch v-model="multiple" />
    </n-form-item>
  </n-form>
  <n-upload
    v-model="modelValue"
    action="https://horizon-web-inspector.nioint.com/upload-mock"
    method="POST"
    type="gallery"
    :size="size"
    :multiple="multiple"
    :file-item-size="fileItemSize"
    :no-uploader="!showUploader"
    :use-clipboard="useClipboard"
    :handle-success="handleSuccess"
    :before-paste="beforePaste"
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
import { computed, ref } from 'vue';
import type { NUploadRawFileType, UploadProps, NUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';
import { $confirm } from '@aurora/horizon-web';

const size = ref<Exclude<UploadProps['size'], undefined>>('medium');
const fileItemSize = ref<Exclude<UploadProps['fileItemSize'], undefined>>('medium');
const showUploader = ref(true);
const useClipboard = ref(true);
const enableBeforePaste = ref(false);
const multiple = ref(true);

const modelValue = ref<NUploadRawFileType>();

const beforePaste = computed(() => {
  if (enableBeforePaste.value) {
    return (files: File[]) => {
      return new Promise((resolve) => {
        $confirm(`是否确定上传 ${files.map(file => file.name).join('、')} ?`, '提示').then((close) => {
          resolve(files);
          close();
        }).catch(() => {
          // do something
        });
      });
    };
  } else {
    return undefined;
  }
});

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

function handleSuccess(res: any, file: NUploadFile) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return file.blobUrl;
}
</script>
