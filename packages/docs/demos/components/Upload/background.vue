<template>
  <h-form label-vertical-align="middle" label-position="left">
    <h-form-item label="是否将文件传输到后台上传">
      <h-switch v-model="useBackground" />
    </h-form-item>
    <h-form-item label="后台上传是否显示">
      <h-switch v-model="backgroundVisible" />
    </h-form-item>
    <h-form-item label="是否显示文件列表">
      <h-switch v-model="showFileList" />
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-upload
        id="background-uploader"
        v-model:use-background="useBackground"
        action="https://horizon-web-inspector.demoint.com/upload-mock"
        button-text="单选手动上传"
        :show-file-list="showFileList"
        :auto-upload="false"
      />
    </h-grid-item>
    <h-grid-item :span="24">
      <h-upload
        v-model:use-background="useBackground"
        action="https://horizon-web-inspector.demoint.com/upload-mock"
        button-text="多选自动上传"
        :multiple="true"
        :show-file-list="showFileList"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';

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
  console.info(`id: ${evt.detail.id} 的后台上传状态改变为 ${evt.detail.visible}`);
  backgroundVisible.value = evt.detail.visible;
}

function onBackgroundUploadDestroy(evt: WindowEventMap['backgroundUploadDestroy']) {
  console.info(`id: ${evt.detail} 的后台已销毁`);
}

window.addEventListener('backgroundUploadVisibleChanged', onBackgroundUploadVisibleChanged);
window.addEventListener('backgroundUploadDestroy', onBackgroundUploadDestroy);

onBeforeUnmount(() => {
  window.removeEventListener('backgroundUploadVisibleChanged', onBackgroundUploadVisibleChanged);
  window.removeEventListener('backgroundUploadDestroy', onBackgroundUploadDestroy);
});
</script>
