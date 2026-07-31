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
  <h-viewer v-model="visibleRef" :sources="imagesRef" :init-index="initIndexRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource } from '@aurora/horizon-web';
import { createDemoViewerSources } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    imagesRef.value = createDemoViewerSources(10);

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
