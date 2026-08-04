<script setup lang="ts">
import { ref } from 'vue';

type IndicatorType = 'dot' | 'line' | 'slider';
type IndicatorPosition = 'left' | 'right' | 'top' | 'bottom' | 'outside';

const indicatorType = ref<IndicatorType>('dot');
const indicatorPosition = ref<IndicatorPosition>('bottom');
const images = [
  { src: '/demo-assets/scene-city.svg', label: 'City at blue hour' },
  { src: '/demo-assets/scene-coast.svg', label: 'Coast at sunset' },
  { src: '/demo-assets/scene-summit.svg', label: 'Mountain summit' },
  { src: '/demo-assets/scene-night.svg', label: 'City at night' },
];
</script>

<template>
  <section class="indicator-demo">
    <div class="indicator-demo__controls">
      <div class="indicator-demo__control">
        <code>indicator-type</code>
        <h-segmented v-model:active-key="indicatorType" size="small" aria-label="Indicator type">
          <h-segmented-item key="dot" label="dot" />
          <h-segmented-item key="line" label="line" />
          <h-segmented-item key="slider" label="slider" />
        </h-segmented>
      </div>

      <div class="indicator-demo__control">
        <code>indicator-position</code>
        <h-segmented
          v-model:active-key="indicatorPosition"
          size="small"
          aria-label="Indicator position"
        >
          <h-segmented-item key="left" label="left" />
          <h-segmented-item key="right" label="right" />
          <h-segmented-item key="top" label="top" />
          <h-segmented-item key="bottom" label="bottom" />
          <h-segmented-item key="outside" label="outside" />
        </h-segmented>
      </div>
    </div>

    <h-carousel
      class="indicator-carousel"
      :indicator-type="indicatorType"
      :indicator-position="indicatorPosition"
      arrow="never"
      :autoplay="false"
      height="240px"
      aria-label="Custom indicator image carousel"
    >
      <h-carousel-item v-for="image in images" :key="image.src" :label="image.label">
        <img :src="image.src" :alt="image.label" />
      </h-carousel-item>
    </h-carousel>
  </section>
</template>

<style scoped>
.indicator-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.indicator-demo__controls {
  display: grid;
  gap: var(--h-spacing-3);
}

.indicator-demo__control {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--h-spacing-2) var(--h-spacing-3);
}

.indicator-demo__control code {
  min-width: 128px;
}

.indicator-carousel {
  width: 600px;
  max-width: 100%;
  margin: 0 auto;
}

.indicator-carousel img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
