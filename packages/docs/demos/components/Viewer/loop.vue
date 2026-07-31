<template>
  <h-button @click="showViewer">点我浏览精彩图集</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" loop />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource } from '@aurora/horizon-web';
import { createDemoViewerSources } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const visibleRef = ref(false);
    const showViewer = () => {
      imagesRef.value = createDemoViewerSources(10);
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
