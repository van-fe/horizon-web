<template>
  <h-form>
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
        <h-radio label="huge" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="形状">
      <h-radio-group v-model="galleryShape">
        <h-radio label="square" />
        <h-radio label="rectangle" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-button class="mb-2" @click="change">修改原始 modelValue</h-button>
  <h-upload
    v-model="modelValue"
    action="https://horizon-web-inspector.demoint.com/upload-mock"
    type="gallery"
    :multiple="true"
    :size="size"
    :gallery-shape="galleryShape"
    accept="image/*, video/*"
    :handle-success="handleSuccess"
    :auto-upload="false"
    @uploading="onUploading"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { HUploadUserFile, UploadProps, HUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';

const size = ref<UploadProps['size']>('medium');
const galleryShape = ref<UploadProps['galleryShape']>('rectangle');

const modelValue = ref<HUploadUserFile[]>(
  [
    {
      name: 'background.jpg',
      url: '/demo-assets/scene-coast.svg',
    },
    {
      name: 'preview.mp4',
      url: '/aurora-background.mp4',
    },
  ],
);

function onUploading(file: HUploadFileType, process: number, response: Data | undefined) {
  console.info(file, process, response);
}

function handleSuccess(res: any, file: HUploadFileType) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return file.url || file.blobUrl;
}

function change() {
  modelValue.value = [{
    name: 'preview.mp4',
    url: '/aurora-background.mp4',
  }];
}

function onUpdateModelValue(modelValue: HUploadFileType[]) {
  console.info('update: ', modelValue);
}
</script>
