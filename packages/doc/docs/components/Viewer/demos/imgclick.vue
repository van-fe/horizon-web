<template>
  <img
    v-for="item in imagesRef"
    :key="item.cover"
    :src="item.thumbnail"
    :data-source="item.cover"
    :alt="item.title"
    class="mr-3"
    @click="showViewer(item.cover)"
  />
  <n-viewer v-model="visibleRef" :sources="imagesRef" :init-index="initIndexRef" />
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
    imagesRef.value = generateImages(10);

    const visibleRef = ref(false);
    const initIndexRef = ref(0);
    const showViewer = (url: string) => {
      const index = imagesRef.value.findIndex(img => img.cover === url);
      initIndexRef.value = index >= 0 ? index : 0;
      visibleRef.value = true;
    };
    return {
      visibleRef,
      imagesRef,
      initIndexRef,
      showViewer,
    };
  },
});
</script>

<style scoped>
img {
  cursor: zoom-in;
}
</style>
