<template>
  <h-button @click="showViewer">查看自定义按钮的示例</h-button>
  <h-viewer v-model="visibleRef" :sources="imagesRef" :tools="tools" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { HViewerSource, HViewerCustomToolItem } from '@aurora/horizon-web';
import { createDemoViewerSources } from '../../demo-assets';
export default defineComponent({
  setup() {
    const imagesRef = ref<HViewerSource[]>([]);
    const visibleRef = ref(false);
    const showViewer = () => {
      imagesRef.value = createDemoViewerSources(10);
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
