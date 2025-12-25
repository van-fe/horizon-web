<template>
  <n-upload
    action="https://horizon-web-inspector.nioint.com/upload-mock"
    type="drop"
    :multiple="true"
    :limit="5"
    :accept="accept"
    :handle-success="handleSuccess"
    @accept-error="onAcceptError"
  />
  <n-button class="mt-5" @click="change">修改 accept 为 .png,.jpg</n-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message, NUploadFileType } from '@aurora/horizon-web';
const accept = ref('.png');

function change() {
  accept.value = '.png,.jpg';
}

function onAcceptError(files: NUploadFileType[]) {
  console.info(files);

  $message.error(`自动拦截：您选择的 ${files.map(file => file.name).join('、')} 不是 ${accept.value} 文件`);
}

function handleSuccess(res: any, file: NUploadFileType) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return file.blobUrl;
}
</script>
