<template>
  <n-form>
    <n-form-item label="尺寸">
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
        <n-radio label="large" />
        <n-radio label="huge" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="形状">
      <n-radio-group v-model="galleryShape">
        <n-radio label="square" />
        <n-radio label="rectangle" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="媒体文件展示为普通文件">
      <n-radio-group v-model="showMediaWithNormalModeInGalleryMixed">
        <n-radio :value="true">是</n-radio>
        <n-radio :value="false">否</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item v-if="showMediaWithNormalModeInGalleryMixed" label="媒体文件展示缩略图">
      <n-radio-group v-model="showFileThumbnail">
        <n-radio :value="true">是</n-radio>
        <n-radio :value="false">否</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-upload
    v-model="modelValue"
    action="https://horizon-web-inspector.nioint.com/upload-mock"
    type="gallery-mixed"
    :multiple="true"
    :size="size"
    :gallery-shape="galleryShape"
    :handle-success="handleSuccess"
    :auto-upload="false"
    crossorigin="anonymous"
    :show-media-with-normal-mode-in-gallery-mixed="showMediaWithNormalModeInGalleryMixed"
    :show-file-thumbnail="showFileThumbnail"
    @uploading="onUploading"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { NUploadUserFile, UploadProps, NUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/shared';

const size = ref<NonNullable<UploadProps['size']>>('medium');
const galleryShape = ref<UploadProps['galleryShape']>('rectangle');
const showMediaWithNormalModeInGalleryMixed = ref<UploadProps['showMediaWithNormalModeInGalleryMixed']>(false);
const showFileThumbnail = ref<UploadProps['showFileThumbnail']>(false);
const modelValue = ref<NUploadUserFile[]>(
  [
    {
      name: 'background.jpg',
      url: 'https://cdn-public-dev.nio.com/aurora-resource/5cBiDhad9L9aZ3nAml1m8/23244a6b-69c3-4465-bbd6-5db4b476abf4.jpg?imageView2/0/h/198/ignore-error/1',
    },
    {
      name: 'failed_default.pdf',
      url: 'https://static.nio.com/fx-static/horizon-web/cm11m7f1g00d008a7bx48434r/failed_default.pdf',
    },
    {
      name: 'preview.mp4',
      url: 'https://cdn-fx.nio.com/fx/horizon-web/__cdn__/aurora-background.mp4',
    },
    {
      name: '上传演示文档.docx',
      url: 'https://static.nio.com/fx-static/horizon-web/cm8436m6408ov086s9a1h8wx3/上传演示文档.docx',
    },
  ],
);

function onUploading(file: NUploadFileType, process: number, response: Data | undefined) {
  console.log(file, process, response);
}

function handleSuccess(res: any, file: NUploadFileType) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return new Promise<string>(resolve => {
    resolve(file.url || file.blobUrl || '');
  });
}

function onUpdateModelValue(modelValue: NUploadFileType[]) {
  console.log('update: ', modelValue);
}
</script>
