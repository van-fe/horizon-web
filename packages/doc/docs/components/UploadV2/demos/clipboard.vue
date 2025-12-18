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
  <n-upload-v2
    v-model="modelValue"
    action="https://lego-inspector.nioint.com/upload-mock"
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
import type { NUploadV2RawFileType, UploadV2Props, NUploadV2FileType } from '@nio-fe/lego';
import type { Data } from '@nio-fe/shared';
import { $confirm } from '@nio-fe/lego';

const size = ref<Exclude<UploadV2Props['size'], undefined>>('medium');
const fileItemSize = ref<Exclude<UploadV2Props['fileItemSize'], undefined>>('medium');
const showUploader = ref(true);
const useClipboard = ref(true);
const enableBeforePaste = ref(false);
const multiple = ref(true);

const modelValue = ref<NUploadV2RawFileType>();

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

function handleSuccess(res: any, file: NUploadV2File) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return file.blobUrl;
}
</script>
