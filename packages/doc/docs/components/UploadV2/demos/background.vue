<template>
  <n-form label-vertical-align="middle" label-position="left">
    <n-form-item label="是否将文件传输到后台上传">
      <n-switch v-model="useBackground" />
    </n-form-item>
    <n-form-item label="后台上传是否显示">
      <n-switch v-model="backgroundVisible" />
    </n-form-item>
    <n-form-item label="是否显示文件列表">
      <n-switch v-model="showFileList" />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="24">
      <n-upload-v2
        id="background-uploader"
        v-model:use-background="useBackground"
        action="https://lego-inspector.nioint.com/upload-mock"
        button-text="单选手动上传"
        :show-file-list="showFileList"
        :auto-upload="false"
        crossorigin="anonymous"
        @preview="onPreview"
      />
    </n-col>
    <n-col :span="24">
      <n-upload-v2
        v-model:use-background="useBackground"
        action="https://lego-inspector.nioint.com/upload-mock"
        button-text="多选自动上传"
        :multiple="true"
        :show-file-list="showFileList"
        crossorigin="anonymous"
        @preview="onPreview"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import type { NUploadV2FileType } from '@nio-fe/lego';

declare global {
  interface WindowEventMap {
    backgroundUploadDestroy: CustomEvent<string | undefined>;
    backgroundUploadVisibleChanged: CustomEvent<{ visible: boolean; id: string | undefined }>;
    switchBackgroundUploadVisible: CustomEvent<{ visible: boolean; id: string | undefined }>;
  }
}

const useBackground = ref(true);
const backgroundVisible = ref(true);
const showFileList = ref(true);

watch(backgroundVisible, visible => {
  window.dispatchEvent(new CustomEvent('switchBackgroundUploadVisible', {
    detail: {
      visible,
    },
  }));
});

function onBackgroundUploadVisibleChanged(evt: WindowEventMap['backgroundUploadVisibleChanged']) {
  console.log(`id: ${evt.detail.id} 的后台上传状态改变为 ${evt.detail.visible}`);
  backgroundVisible.value = evt.detail.visible;
}

function onBackgroundUploadDestroy(evt: WindowEventMap['backgroundUploadDestroy']) {
  console.log(`id: ${evt.detail} 的后台已销毁`);
}

function onPreview(file: NUploadV2FileType) {
  console.log('Preview File:', file);
}

window.addEventListener('backgroundUploadVisibleChanged', onBackgroundUploadVisibleChanged);
window.addEventListener('backgroundUploadDestroy', onBackgroundUploadDestroy);

onBeforeUnmount(() => {
  window.removeEventListener('backgroundUploadVisibleChanged', onBackgroundUploadVisibleChanged);
  window.removeEventListener('backgroundUploadDestroy', onBackgroundUploadDestroy);
});
</script>
