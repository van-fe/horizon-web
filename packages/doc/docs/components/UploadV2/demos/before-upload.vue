<template>
  <n-form>
    <n-form-item label="是否严格拦截上传文件">
      <n-switch v-model="acceptStrict" :status="true" />
    </n-form-item>
    <n-form-item label="多选">
      <n-switch v-model="multiple" :status="true" />
    </n-form-item>
  </n-form>
  <n-upload-v2
    v-model="modelValue"
    action="https://lego-inspector.nioint.com/upload-mock"
    method="POST"
    accept=".png"
    :multiple="multiple"
    :accept-strict="acceptStrict"
    :before-upload="onBeforeUpload"
    crossorigin="anonymous"
    @accept-error="onAcceptError"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $message, NUploadV2FileType, NUploadV2RawFileType, UploadV2Props , NUploadV2FileTypeEnum } from '@nio-fe/lego';

const acceptStrict = ref<UploadV2Props['acceptStrict']>(false);
const multiple = ref(false);

const modelValue = ref<NUploadV2RawFileType>();

function onBeforeUpload(file: NUploadV2FileType) {
  console.log('before-upload:', file);
  if (!(file.type === NUploadV2FileTypeEnum.Image && file.raw?.type === 'image/png')) {
    $message.error('手动拦截：您选择的不是 PNG 文件');
    return false;
  } else return true;
}

function onAcceptError(files: NUploadV2FileType[]) {
  console.log(files);

  $message.error(`自动拦截：您选择的 ${files.map(file => file.name).join('、')} 不是 PNG 文件`);
}
</script>
