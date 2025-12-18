<template>
  <n-form>
    <n-form-item label="是否严格拦截上传文件">
      <n-switch v-model="acceptStrict" :status="true" />
    </n-form-item>
    <n-form-item label="多选">
      <n-switch v-model="multiple" :status="true" />
    </n-form-item>
  </n-form>
  <n-space>
    <n-upload
      v-model="modelValue"
      action="https://lego-inspector.nioint.com/upload-mock"
      method="POST"
      accept=".png"
      :multiple="multiple"
      :accept-strict="acceptStrict"
      :before-upload="onBeforeUpload"
      @accept-error="onAcceptError"
    />
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message, NUploadFileType, NUploadRawFileType, UploadProps , NUploadFileTypeEnum } from '@nio-fe/lego';

const acceptStrict = ref<UploadProps['acceptStrict']>(false);
const multiple = ref(false);

const modelValue = ref<NUploadRawFileType>();

function onBeforeUpload(file: NUploadFileType) {
  console.log('before-upload:', file);
  if (!(file.type === NUploadFileTypeEnum.Image && file.raw?.type === 'image/png')) {
    $message.error('手动拦截：您选择的不是 PNG 文件');
    return false;
  } else return true;
}

function onAcceptError(files: NUploadFileType[]) {
  console.log(files);

  $message.error(`自动拦截：您选择的 ${files.map(file => file.name).join('、')} 不是 PNG 文件`);
}
</script>
