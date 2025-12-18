<template>
  <n-form label-position="left">
    <n-form-item label="Multiple">
      <n-switch v-model="multiple" />
    </n-form-item>
  </n-form>
  <n-upload
    action="https://lego-inspector.nioint.com/upload-mock"
    type="drop"
    :multiple="multiple"
    :limit="5"
    :accept="accept"
    :handle-success="handleSuccess"
    crossorigin="anonymous"
    @accept-error="onAcceptError"
    @exceed="onExceed"
  />
  <n-button class="mt-5" @click="change">修改 accept 为 .png,.jpg</n-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@nio-fe/lego';
import type { NUploadFileType } from '@nio-fe/lego';
const accept = ref('.png');
const multiple = ref(true);

function change() {
  accept.value = '.png,.jpg';
}

function onAcceptError(files: NUploadFileType[]) {
  console.log(files);

  $message.error(`自动拦截：您选择的 ${files.map(file => file.name).join('、')} 不是 ${accept.value} 文件`);
}

function onExceed(pickedFiles: NUploadFileType[], existedFiles: NUploadFileType[]) {
  console.log('Exceed Files: ', pickedFiles, existedFiles);
}

function handleSuccess(res: any, file: NUploadFileType) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return file.blobUrl;
}
</script>
