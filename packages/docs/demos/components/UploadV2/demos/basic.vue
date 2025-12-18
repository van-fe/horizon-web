<template>
  <n-form>
    <n-form-item label="尺寸">
      <n-radio-group v-model="size">
        <n-radio label="small"></n-radio>
        <n-radio label="medium"></n-radio>
        <n-radio label="large"></n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="文件元素尺寸">
      <n-radio-group v-model="fileItemSize">
        <n-radio label="small"></n-radio>
        <n-radio label="medium"></n-radio>
        <n-radio label="large"></n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="展示上传按钮">
      <n-radio-group v-model="showUploader">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-space>
    <n-upload-v2
      v-model="modelValue"
      action="https://lego-inspector.nioint.com/upload-mock"
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
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { NUploadV2RawFileType, UploadV2Props, NUploadV2FileType } from '@nio-fe/lego';
import type { Data } from '@nio-fe/shared';

const size = ref<Exclude<UploadV2Props['size'], undefined>>('medium');
const fileItemSize = ref<Exclude<UploadV2Props['fileItemSize'], undefined>>('medium');
const showUploader = ref(true);

const modelValue = ref<NUploadV2RawFileType>({
  name: 'background.jpg',
  url: 'https://cdn-public-dev.nio.com/aurora-resource/5cBiDhad9L9aZ3nAml1m8/23244a6b-69c3-4465-bbd6-5db4b476abf4.jpg?imageView2/0/h/198/ignore-error/1',
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
</script>
