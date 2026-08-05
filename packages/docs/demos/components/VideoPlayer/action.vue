<script setup lang="ts">
import { ref } from 'vue';

interface PlayerExpose {
  play: () => Promise<void>;
  pause: () => void;
  seek: (time: number) => void;
}

const player = ref<PlayerExpose>();
const sources = [{ src: '/aurora-background.mp4', type: 'video/mp4' }];
</script>

<template>
  <section class="docs-demo">
    <h-video-player ref="player" :sources="sources" poster="/demo-assets/video-poster.svg" />
    <div class="docs-demo__actions">
      <h-button @click="player?.play()">Play</h-button>
      <h-button @click="player?.pause()">Pause</h-button>
      <h-button @click="player?.seek(0)">Restart</h-button>
    </div>
  </section>
</template>
