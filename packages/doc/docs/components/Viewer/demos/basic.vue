<template>
  <h-button class="mr-2" @click="showViewer">单张图片</h-button>
  <h-button class="mr-2" @click="showViewer2">单个视频</h-button>
  <h-button class="mr-2" @click="showViewer3">图片和视频集合</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { NViewerSource } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const imagesRef = ref<NViewerSource[]>([]);
    const generateImages = (count: number) => {
      const list = [] as NViewerSource[];
      const base = Math.floor(Math.random() * 60) + 10;
      for (let i = 0; i < count; i++) {
        list.push({
          type: 'image',
          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,
          cover: `https://picsum.photos/id/${base + i}/1366/768`,
          title: `Image: ${base + i}`,
        });
      }
      return list;
    };
    const visibleRef = ref(false);
    const video1 = {
      type: 'video',
      cover: 'https://www.nio.cn/cdh-static/mynio/nextjs/images/et5/top-hero-desktop.jpg',
      thumbnail: 'https://www.nio.cn/cdh-static/mynio/nextjs/images/et5/top-hero-desktop.jpg',
      videoSources: [
        {
          src: 'https://www.nio.cn/cdh-static/mynio/nextjs/images/et5/et5-hero-video.mp4',
          type: 'video/mp4',
        },
      ],
      title: 'vimejs video',
    } as NViewerSource;
    const video2 = {
      type: 'video',
      cover: 'https://vjs.zencdn.net/v/oceans.png',
      thumbnail: 'https://vjs.zencdn.net/v/oceans.png',
      videoSources: [
        {
          src: 'https://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4',
        },
      ],
      title: 'oceans video',
    } as NViewerSource;
    const showViewer = () => {
      imagesRef.value = generateImages(1);
      visibleRef.value = true;
    };
    const showViewer2 = () => {
      imagesRef.value = [video1];
      visibleRef.value = true;
    };
    const showViewer3 = () => {
      imagesRef.value = [video1, video2, ...generateImages(10)];
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
