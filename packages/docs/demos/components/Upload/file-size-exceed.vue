<template>
  <h-form>
    <h-form-item label="是否直接拦截超过 2MB 的文件">
      <h-switch v-model="enableFileSizeLimit" :status="true" />
    </h-form-item>
    <h-form-item label="多选">
      <h-switch v-model="multiple" :status="true" />
    </h-form-item>
  </h-form>
  <h-space>
    <h-upload
      v-model="modelValue"
      action="https://horizon-web-inspector.demoint.com/upload-mock"
      method="POST"
      :multiple="multiple"
      :file-size-limit="enableFileSizeLimit ? 2 : undefined"
      :before-upload="onBeforeUpload"
      @file-size-exceed="onFileSizeExceed"
    />
  </h-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message, HUploadFileType, HUploadRawFileType } from '@aurora/horizon-web';

const enableFileSizeLimit = ref(false);
const multiple = ref(false);

const modelValue = ref<HUploadRawFileType>();

function onBeforeUpload(file: HUploadFileType) {
  console.info('before-upload:', file);
  if ((file.size || 0) > 1024 * 1024 * 2) {
    $message.error('手动拦截：您选择的文件超过 2MB 大小');
    return false;
  } else return true;
}

function onFileSizeExceed(files: HUploadFileType[]) {
  console.info(files);

  $message.error(`自动拦截： ${files.map(file => file.name).join('、')} 超过 2MB 大小`);
}
</script>
