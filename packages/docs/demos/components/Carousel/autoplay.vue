<script setup lang="ts">
import { ref } from 'vue';

const carousel = ref<{ pause: () => void; play: () => void }>();
const playing = ref(true);
const slides = ['Research', 'Design', 'Release'];

function toggle() {
  playing.value = !playing.value;
  playing.value ? carousel.value?.play() : carousel.value?.pause();
}
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__actions">
      <h-button size="small" @click="toggle">{{ playing ? 'Pause' : 'Resume' }}</h-button>
    </div>
    <h-carousel ref="carousel" height="200px" :interval="2500" aria-label="Campaign">
      <h-carousel-item v-for="(slide, index) in slides" :key="slide" :label="slide">
        <div class="slide">{{ index + 1 }} · {{ slide }}</div>
      </h-carousel-item>
    </h-carousel>
  </section>
</template>

<style scoped>
.slide {
  display: grid;
  height: 100%;
  place-items: center;
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
  font-size: var(--h-text-xl);
  font-weight: 700;
}
</style>
