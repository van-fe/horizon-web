<template>
  <h-form>
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="small"></h-radio>
        <h-radio label="medium"></h-radio>
        <h-radio label="large"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="文件元素尺寸">
      <h-radio-group v-model="fileItemSize">
        <h-radio label="small"></h-radio>
        <h-radio label="medium"></h-radio>
        <h-radio label="large"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="展示上传按钮">
      <h-radio-group v-model="showUploader">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-space>
    <h-upload
      v-model="modelValue"
      action="https://horizon-web-inspector.nioint.com/upload-mock"
      method="POST"
      :size="size"
      :file-item-size="fileItemSize"
      :no-uploader="!showUploader"
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
    />
  </h-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { NUploadRawFileType, UploadProps, NUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';

const size = ref<Exclude<UploadProps['size'], undefined>>('medium');
const fileItemSize = ref<Exclude<UploadProps['fileItemSize'], undefined>>('medium');
const showUploader = ref(true);

const modelValue = ref<NUploadRawFileType>({
  name: 'background.jpg',
  url: 'https://cdn-public-dev.nio.com/aurora-resource/5cBiDhad9L9aZ3nAml1m8/23244a6b-69c3-4465-bbd6-5db4b476abf4.jpg?imageView2/0/h/198/ignore-error/1',
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
</script>
