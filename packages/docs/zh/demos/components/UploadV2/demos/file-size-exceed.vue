<template>
  <n-form>
    <n-form-item label="是否直接拦截超过 2MB 的文件">
      <n-switch v-model="enableFileSizeLimit" :status="true" />
    </n-form-item>
    <n-form-item label="多选">
      <n-switch v-model="multiple" :status="true" />
    </n-form-item>
  </n-form>
  <n-space>
    <n-upload-v2
      v-model="modelValue"
      action="https://lego-inspector.nioint.com/upload-mock"
      method="POST"
      :multiple="multiple"
      :file-size-limit="enableFileSizeLimit ? 2 : undefined"
      :before-upload="onBeforeUpload"
      @file-size-exceed="onFileSizeExceed"
    />
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message, NUploadV2FileType, NUploadV2RawFileType } from '@nio-fe/lego';

const enableFileSizeLimit = ref(false);
const multiple = ref(false);

const modelValue = ref<NUploadV2RawFileType>();

function onBeforeUpload(file: NUploadV2FileType) {
  console.log('before-upload:', file);
  if ((file.size || 0) > 1024 * 1024 * 2) {
    $message.error('手动拦截：您选择的文件超过 2MB 大小');
    return false;
  } else return true;
}

function onFileSizeExceed(files: NUploadV2FileType[]) {
  console.log(files);

  $message.error(`自动拦截： ${files.map(file => file.name).join('、')} 超过 2MB 大小`);
}
</script>
