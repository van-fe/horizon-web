<script setup lang="ts">
const slides = ['Compose', 'Navigate', 'Control'];
</script>

<template>
  <h-carousel
    direction="vertical"
    arrow="always"
    :autoplay="false"
    height="220px"
    aria-label="Workflow"
  >
    <h-carousel-item v-for="(slide, index) in slides" :key="slide" :label="slide">
      <div class="slide">{{ index + 1 }} · {{ slide }}</div>
    </h-carousel-item>
  </h-carousel>
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
