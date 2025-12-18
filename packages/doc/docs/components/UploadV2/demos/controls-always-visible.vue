<template>
  <n-switch
    v-model="controlsAlwaysVisible"
    status
    status-on-text="always visible"
    status-off-text="visible on hover"
    class="mb-2"
  />

  <n-upload
    v-model="fileList"
    action="https://horizon-web-inspector.nioint.com/upload-mock"
    :multiple="true"
    :no-uploader="true"
    :controls-always-visible="controlsAlwaysVisible"
    crossorigin="anonymous"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const controlsAlwaysVisible = ref(false);

const fileList = ref([
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
]);
</script>
