<template>
  <div class="flex">
    <h-image
      v-for="size in sizes"
      :key="size"
      src="https://www.nio.cn/cdh-static/mynio/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"
      :show-actions="true"
      :actions-list="actions"
      class="mr-2"
      :width="size"
      :height="size"
      @load="imgLoad"
      @error="imgError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { NImageAction } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const sizes = [150, 80, 40];
    const actions = ref<NImageAction[]>([]);
    const imgLoad = () => {
      actions.value = [
        {
          icon: 'scale_big',
          title: '放大',
          handler: (src: string) => {
            console.info('scale_big', src);
          },
        },
        {
          icon: 'download',
          title: '下载',
          handler: (src: string) => {
            console.info('download', src);
          },
        },
        {
          icon: 'rubbish',
          title: '删除',
          handler: (src: string) => {
            console.info('close', src);
          },
        },
      ];
    };
    const imgError = () => {
      actions.value = [
        {
          icon: 'refresh',
          title: '重新加载',
          handler: (src: string) => {
            console.info('refresh', src);
          },
        },
      ];
    };
    return {
      sizes,
      actions,
      imgLoad,
      imgError,
    };
  },
});
</script>
