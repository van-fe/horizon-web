<template>
  <n-upload
    v-model="modelValue"
    action="https://lego-inspector.nioint.com/upload-mock"
    method="POST"
    multiple
    no-uploader
    :before-preview="onBeforePreview"
    :before-viewer-preview="onBeforeViewerPreview"
    crossorigin="anonymous"
    @preview="onPreview"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  $confirm,
  $message,
  NUploadFileType,
  NUploadFileTypeEnum,
  type NUploadUserFile,
} from '@nio-fe/lego';

const modelValue = ref<NUploadUserFile[]>(
  [
    {
      name: 'success.png',
      url: 'https://cdn-public.nio.com/aurora-resource/h3SPCM3UMNpbIBu5ALo4Y/0f835bdd-d6d2-4005-b9b1-2ac61cee3def.png',
    },
    {
      name: 'fail.pdf',
      url: 'https://static.nio.com/fx-static/lego/cm11m7f1g00d008a7bx48434r/failed_default.pdf',
    },
    {
      name: 'preview.mp4',
      url: 'https://cdn-fx.nio.com/fx/lego/__cdn__/aurora-background.mp4',
    },
  ],
);

function onBeforePreview(file: NUploadFileType) {
  console.log('before-preview:', file);

  if (file.type === NUploadFileTypeEnum.Pdf) {
    $message.error('不可预览 pdf 文件');
    return false;
  } else if (file.type === NUploadFileTypeEnum.Image && file.name.endsWith('.png')) {
    return new Promise((resolve, reject) => {
      $confirm('是否预览 PNG 图片?', '提示').then((close) => {
        resolve(true);
        close();
      }).catch(() => {
        $message.info('取消了预览操作');
        reject();
      });
    });
  } else return true;
}

function onPreview(file: NUploadFileType) {
  console.log('Preview file:', file);
}

function onBeforeViewerPreview(file: NUploadUserFile) {
  return file.name.endsWith('.png');
}
</script>
