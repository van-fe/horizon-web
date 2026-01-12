<template>
  <div>
    <h-image-list margin="8px" :limit="3" :limit-text-size="20">
      <h-image
        v-for="img in imgs"
        :key="img.src"
        :src="img.src"
        width="120px"
        height="120px"
        rounded="8px"
        :show-viewer="true"
      />
      <template #limit>
        <span class="font-bold">More {{ imgs.length - 3 }}</span>
      </template>
    </h-image-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const imgs = ref([
      {
        src: 'https://www.nio.cn/cdn-static/mynio/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg',
      },
      {
        src: 'https://www.nio.cn/cdn-static/mynio/nextjs/images/et5/top-hero-desktop.jpg',
      },
      {
        src: 'https://www.nio.cn/cdn-static/mynio/nextjs/images/et7/et7-hero-desktop.jpg',
      },
      {
        src: 'https://www.nio.cn/ecs/prod/s3fs-public/ec6/hero-background-mobile.jpg',
      },
      {
        src: 'https://www.nio.cn/cdn-static/mynio/nextjs/images/es8/intro/ES8-EU-SE.000.jpg',
      },
      {
        src: 'https://www.nio.cn/ecs/prod/s3fs-public/hero/es6-banner-2-pc.png',
      },
    ]);
    const customLimitText = (total: number, limit: number) => {
      return `More ${total - limit}...`;
    };
    return {
      imgs,
      customLimitText,
    };
  },
});
</script>
