<template>
  <h-button @click="showViewer">查看自定义按钮的示例</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" :tools="tools" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource, HViewerCustomToolItem } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const generateImages = (count: number) => {
      const list = [] as HViewerSource[];
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
    const showViewer = () => {
      imagesRef.value = generateImages(10);
      visibleRef.value = true;
    };
    const tools = [
      'previous',
      'next',
      'split',
      'zoomOut',
      'ratio',
      'zoomIn',
      '1:1',
      'split',
      {
        iconName: 'tips',
        iconSize: '24',
        iconColor: 'white',
        title: 'More info',
        handler(url: string) {
          console.info('Click info button', url);
        },
      } as HViewerCustomToolItem,
    ];
    return {
      visibleRef,
      imagesRef,
      showViewer,
      tools,
    };
  },
});
</script>
