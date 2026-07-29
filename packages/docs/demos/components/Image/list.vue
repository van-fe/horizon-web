<template>
  <div>
    <div class="flex align-center mb-5">
      <span>间距：</span>
      <h-select v-model="margin">
        <h-option v-for="item in margins" :key="item" :label="item" :value="item"></h-option>
      </h-select>
      <span class="ml-4">最大数量：</span>
      <h-select v-model="limit">
        <h-option v-for="item in limits" :key="item" :label="item" :value="item"></h-option>
      </h-select>
    </div>
    <h-image-list :margin="margin" :limit="limit">
      <h-image
        v-for="img in imgs"
        :key="img.src"
        :src="img.src"
        width="120px"
        height="120px"
        rounded="8px"
        :show-viewer="true"
      />
    </h-image-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const margins = [2, 4, 8, 12];
    const limits = [1, 2, 3, 4, 5, 6];
    const margin = ref(8);
    const limit = ref(4);
    const imgs = ref([
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg',
      },
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et5/top-hero-desktop.jpg',
      },
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et7/et7-hero-desktop.jpg',
      },
      {
        src: 'https://www.example.com/ecs/prod/s3fs-public/ec6/hero-background-mobile.jpg',
      },
      {
        src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/es8/intro/ES8-EU-SE.000.jpg',
      },
      {
        src: 'https://www.example.com/ecs/prod/s3fs-public/hero/es6-banner-2-pc.png',
      },
    ]);
    return {
      margins,
      limits,
      margin,
      limit,
      imgs,
    };
  },
});
</script>
