<script setup lang="ts">
import { ref } from 'vue';

const active = ref(0);
const carousel = ref<{
  prev: () => void;
  next: () => void;
  setActiveItem: (target: string) => void;
}>();
const slides = [
  { name: 'prepare', label: 'Prepare' },
  { name: 'verify', label: 'Verify' },
  { name: 'publish', label: 'Publish' },
];
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__actions">
      <h-button @click="carousel?.prev()">Previous</h-button>
      <h-button @click="carousel?.next()">Next</h-button>
      <h-button text @click="carousel?.setActiveItem('verify')">Verify</h-button>
    </div>
    <h-carousel
      ref="carousel"
      v-model="active"
      effect="fade"
      :autoplay="false"
      height="200px"
      aria-label="Review flow"
    >
      <h-carousel-item
        v-for="slide in slides"
        :key="slide.name"
        :name="slide.name"
        :label="slide.label"
      >
        <div class="slide">{{ slide.label }}</div>
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
