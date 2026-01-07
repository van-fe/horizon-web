<template>
  <div>
    <h-button class="mb-2" @click="generateImage">reload</h-button>
    <div class="flex">
      <h-image :src="imgSrc" class="mr-2" :width="70" :height="70" />
      <h-image :src="imgSrc" class="mr-2" :width="100" :height="100" />
      <h-image :src="imgSrc" class="mr-2" :width="150" :height="150" />
      <h-image :src="imgSrc" :width="150" :height="150">
        <template #placeholder>
          <div class="flex justify-center aligh-center" style="height: 100%">Loading...</div>
        </template>
      </h-image>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const imgSrc = ref('');
    const generateImage = () => {
      const base = Math.floor(Math.random() * 60) + 10;
      imgSrc.value = `https://picsum.photos/id/${base}/1366/768`;
    };
    generateImage();
    return {
      imgSrc,
      generateImage,
    };
  },
});
</script>
