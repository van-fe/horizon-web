<template>
  <h-button class="mr-2" @click="showViewer">单张图片</h-button>
  <h-button class="mr-2" @click="showViewer2">单个视频</h-button>
  <h-button class="mr-2" @click="showViewer3">图片和视频集合</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource } from '@aurora/horizon-web';
import { createDemoViewerSources } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const visibleRef = ref(false);
    const video1 = {
      type: 'video',
      cover: '/demo-assets/scene-summit.svg',
      thumbnail: '/demo-assets/scene-summit.svg',
      videoSources: [
        {
          src: '/aurora-background.mp4',
          type: 'video/mp4',
        },
      ],
      title: 'vimejs video',
    } as HViewerSource;
    const video2 = {
      type: 'video',
      cover: '/demo-assets/video-poster.svg',
      thumbnail: '/demo-assets/video-poster.svg',
      videoSources: [
        {
          src: '/aurora-background.mp4',
          type: 'video/mp4',
        },
      ],
      title: 'oceans video',
    } as HViewerSource;
    const showViewer = () => {
      imagesRef.value = createDemoViewerSources(1);
      visibleRef.value = true;
    };
    const showViewer2 = () => {
      imagesRef.value = [video1];
      visibleRef.value = true;
    };
    const showViewer3 = () => {
      imagesRef.value = [video1, video2, ...createDemoViewerSources(10)];
      visibleRef.value = true;
    };
    return {
      imagesRef,
      showViewer,
      showViewer2,
      showViewer3,
      visibleRef,
    };
  },
});
</script>
