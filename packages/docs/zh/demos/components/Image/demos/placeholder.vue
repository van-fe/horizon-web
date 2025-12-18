<template>
  <div>
    <n-button class="mb-2" @click="generateImage">reload</n-button>
    <div class="flex">
      <n-image :src="imgSrc" class="mr-2" :width="70" :height="70" />
      <n-image :src="imgSrc" class="mr-2" :width="100" :height="100" />
      <n-image :src="imgSrc" class="mr-2" :width="150" :height="150" />
      <n-image :src="imgSrc" :width="150" :height="150">
        <template #placeholder>
          <div class="flex justify-center align-center" style="height: 100%">Loading...</div>
        </template>
      </n-image>
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
