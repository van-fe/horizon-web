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
        src: '/demo-assets/scene-aurora.svg',
      },
      {
        src: '/demo-assets/scene-summit.svg',
      },
      {
        src: '/demo-assets/scene-city.svg',
      },
      {
        src: '/demo-assets/scene-coast.svg',
      },
      {
        src: '/demo-assets/scene-forest.svg',
      },
      {
        src: '/demo-assets/scene-night.svg',
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
