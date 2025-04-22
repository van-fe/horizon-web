<template>
  <n-upload-v2
    v-model="modelValue"
    action="https://lego-inspector.nioint.com/upload-mock"
    type="gallery"
    size="huge"
    gallery-shape="square"
    accept="image/*"
    crossorigin="anonymous"
    :handle-success="handleSuccess"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NUploadV2UserFile } from '@nio-fe/lego';
import type { NUploadV2File } from '@nio-fe/lego';

const modelValue = ref<NUploadV2UserFile>({
  name: 'background.jpg',
  url: 'https://cdn-public-dev.nio.com/aurora-resource/5cBiDhad9L9aZ3nAml1m8/23244a6b-69c3-4465-bbd6-5db4b476abf4.jpg?imageView2/0/h/198/ignore-error/1',
});

function handleSuccess(res: any, file: NUploadV2File) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return file.blobUrl;
}
</script>
