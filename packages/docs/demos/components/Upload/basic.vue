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
      :action="actionURL"
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
import type { HUploadRawFileType, UploadProps, HUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';

const actionURL = new URL('/upload-mock.json', import.meta.url).href;

const size = ref<Exclude<UploadProps['size'], undefined>>('medium');
const fileItemSize = ref<Exclude<UploadProps['fileItemSize'], undefined>>('medium');
const showUploader = ref(true);

const modelValue = ref<HUploadRawFileType>({
  name: 'background.jpg',
  url: '/demo-assets/scene-coast.svg',
});

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
</script>
