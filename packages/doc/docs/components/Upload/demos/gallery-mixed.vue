<template>
  <h-form>
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
        <h-radio label="huge" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="形状">
      <h-radio-group v-model="galleryShape">
        <h-radio label="square" />
        <h-radio label="rectangle" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="媒体文件展示为普通文件">
      <h-radio-group v-model="showMediaWithNormalModeInGalleryMixed">
        <h-radio :value="true">是</h-radio>
        <h-radio :value="false">否</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item v-if="showMediaWithNormalModeInGalleryMixed" label="媒体文件展示缩略图">
      <h-radio-group v-model="showFileThumbnail">
        <h-radio :value="true">是</h-radio>
        <h-radio :value="false">否</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-upload
    v-model="modelValue"
    action="https://horizon-web-inspector.nioint.com/upload-mock"
    type="gallery-mixed"
    :multiple="true"
    :size="size"
    :gallery-shape="galleryShape"
    :handle-success="handleSuccess"
    :auto-upload="false"
    crossorigin="anonymous"
    :show-media-with-normal-mode-ih-gallery-mixed="showMediaWithNormalModeInGalleryMixed"
    :show-file-thumbnail="showFileThumbnail"
    @uploading="onUploading"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { NUploadUserFile, UploadProps, NUploadFileType } from '@aurora/horizon-web';
import type { Data } from '@aurora/utils';

const size = ref<NonNullable<UploadProps['size']>>('medium');
const galleryShape = ref<UploadProps['galleryShape']>('rectangle');
const showMediaWithNormalModeInGalleryMixed = ref<UploadProps['showMediaWithNormalModeInGalleryMixed']>(false);
const showFileThumbnail = ref<UploadProps['showFileThumbnail']>(false);
const modelValue = ref<NUploadUserFile[]>(
  [
    {
      name: 'background.jpg',
      url: 'https://cdh-public-dev.nio.com/aurora-resource/5cBiDhad9L9aZ3nAml1m8/23244a6b-69c3-4465-bbd6-5db4b476abf4.jpg?imageView2/0/h/198/ignore-error/1',
    },
    {
      name: 'failed_default.pdf',
      url: 'https://static.nio.com/fx-static/horizon-web/cm11m7f1g00d008a7bx48434r/failed_default.pdf',
    },
    {
      name: 'preview.mp4',
      url: 'https://cdh-fx.nio.com/fx/horizon-web/__cdn__/aurora-background.mp4',
    },
    {
      name: '上传演示文档.docx',
      url: 'https://static.nio.com/fx-static/horizon-web/cm8436m6408ov086s9a1h8wx3/上传演示文档.docx',
    },
  ],
);

function onUploading(file: NUploadFileType, process: number, response: Data | undefined) {
  console.info(file, process, response);
}

function handleSuccess(res: any, file: NUploadFileType) {
  // 因为接口是模拟返回，所以不处理 res 数据
  // 直接把 blobUrl 假定为上传接口返回的预览地址
  return new Promise<string>(resolve => {
    resolve(file.url || file.blobUrl || '');
  });
}

function onUpdateModelValue(modelValue: NUploadFileType[]) {
  console.info('update: ', modelValue);
}
</script>
