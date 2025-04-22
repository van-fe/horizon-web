<template>
  <n-button @click="showViewer">点我浏览精彩图集</n-button>
  <n-viewer v-model="visibleRef" :sources="imagesRef" loop />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { NViewerSource } from '@nio-fe/lego';
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
