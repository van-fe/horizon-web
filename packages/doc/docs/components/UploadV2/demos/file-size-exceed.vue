<template>
  <n-form>
    <n-form-item label="是否直接拦截超过 2MB 的文件">
      <n-switch v-model="enableFileSizeLimit" :status="true" />
    </n-form-item>
    <n-form-item label="多选">
      <n-switch v-model="multiple" :status="true" />
    </n-form-item>
  </n-form>
  <n-upload
    v-model="modelValue"
    action="https://horizon-web-inspector.nioint.com/upload-mock"
    method="POST"
    :multiple="multiple"
    :file-size-limit="enableFileSizeLimit ? 2 : undefined"
    :before-upload="onBeforeUpload"
    crossorigin="anonymous"
    @file-size-exceed="onFileSizeExceed"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message, NUploadFileType, NUploadRawFileType } from '@aurora/horizon-web';

const enableFileSizeLimit = ref(false);
const multiple = ref(false);

const modelValue = ref<NUploadRawFileType>();

function onBeforeUpload(file: NUploadFileType) {
  console.info('before-upload:', file);
  if ((file.size || 0) > 1024 * 1024 * 2) {
    $message.error('手动拦截：您选择的文件超过 2MB 大小');
    return false;
  } else return true;
}

function onFileSizeExceed(files: NUploadFileType[]) {
  console.info(files);

  $message.error(`自动拦截： ${files.map(file => file.name).join('、')} 超过 2MB 大小`);
}
</script>
