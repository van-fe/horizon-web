<template>
  <div>
    <h-button class="mb-3" @click="doRotate">Rotate</h-button>
    <h-video-player
      :sources="[
        {
          src: '/aurora-background.mp4',
          type: 'video/mp4',
        },
      ]"
      poster="/demo-assets/video-poster.svg"
      :rotate="degree"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const degree = ref(0);
    const doRotate = () => {
      switch (degree.value) {
        case 0:
          degree.value = 90;
          return;
        case 90:
          degree.value = 180;
          return;
        case 180:
          degree.value = 270;
          return;
        case 270:
          degree.value = 0;
          return;
      }
    };
    return {
      degree,
      doRotate,
    };
  },
});
</script>
