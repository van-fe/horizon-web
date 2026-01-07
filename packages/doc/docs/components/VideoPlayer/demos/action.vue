<template>
  <h-video-player
    :sources="[
      {
        src: 'https://media.vimejs.com/720p.mp4',
        type: 'video/mp4',
      },
    ]"
    poster="https://media.vimejs.com/poster.png"
    @ready="ready"
  />
  <h-button class="mt-3 mr-2" @click="play">播放</h-button>
  <h-button @click="pause">暂停</h-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const player = ref();
    return {
      ready: (playerInstance: any) => {
        player.value = playerInstance;
      },
      play: () => {
        player.value.play();
      },
      pause: () => {
        player.value.pause();
      },
    };
  },
});
</script>
