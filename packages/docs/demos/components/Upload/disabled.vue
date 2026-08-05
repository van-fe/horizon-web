<script setup lang="ts">
import { demoAssetUrl } from '../../demo-assets';
import type { HUploadUserFile } from '@aurora/horizon-web';
import { ref } from 'vue';

const file = ref<HUploadUserFile>({
  name: 'release-evidence.pdf',
  url: demoAssetUrl('scene-city.svg'),
});
</script>

<template>
  <h-upload id="upload-demo-disabled" v-model="file" disabled controls-always-visible />
</template>
