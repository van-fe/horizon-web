<template>
  <h-button @click="showViewer">点我浏览精彩图集</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource } from '@aurora/horizon-web';
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
      list[0].legends = [
        {
          x: 100,
          y: 200,
          label: 'Severe depression',
        },
        {
          x: 300,
          y: 100,
          label: 'Paint off',
          handler(url: string) {
            console.info('Click legend', url);
          },
        },
      ];
      return list;
    };
    const visibleRef = ref(false);
    const showViewer = () => {
      imagesRef.value = generateImages(10);
      visibleRef.value = true;
    };
    return {
      visibleRef,
      imagesRef,
      showViewer,
    };
  },
});
</script>
