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
