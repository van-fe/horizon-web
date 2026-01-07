<template>
  <h-switch
    v-model="showFileThumbnail"
    status
    status-oh-text="show thumbnail"
    status-off-text="hide thumbnail"
    class="mb-2"
  />
  <h-upload
    v-model="modelValue"
    action="https://horizon-web-inspector.nioint.com/upload-mock"
    method="POST"
    multiple
    crossorigin="anonymous"
    :show-file-thumbnail="showFileThumbnail"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type NUploadUserFile } from '@aurora/horizon-web';

const showFileThumbnail = ref(false);

const modelValue = ref<NUploadUserFile[]>(
  [
    {
      name: 'background.jpg',
      url: 'https://cdh-public-dev.nio.com/aurora-resource/5cBiDhad9L9aZ3nAml1m8/23244a6b-69c3-4465-bbd6-5db4b476abf4.jpg',
    },
    {
      name: 'success.png',
      url: 'https://cdh-public.nio.com/aurora-resource/h3SPCM3UMNpbIBu5ALo4Y/0f835bdd-d6d2-4005-b9b1-2ac61cee3def.png',
    },
    {
      name: 'fail.pdf',
      url: 'https://static.nio.com/fx-static/horizon-web/cm11m7f1g00d008a7bx48434r/failed_default.pdf',
    },
    {
      name: 'preview.mp4',
      url: 'https://cdh-fx.nio.com/fx/horizon-web/__cdn__/aurora-background.mp4',
      posterUrl: 'https://cdh-fx.nio.com/fx/horizon-web/__cdn__/aurora-background.mp4?ci-process=snapshot&time=1',
    },
  ],
);
</script>
