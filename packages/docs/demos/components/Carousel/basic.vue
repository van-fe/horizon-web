<template>
  <h-carousel :autoplay="false" height="260px">
    <h-carousel-item v-for="slide in slides" :key="slide.title" :label="slide.title">
      <article class="carousel-slide" :style="{ background: slide.background }">
        <span>{{ slide.eyebrow }}</span>
        <h3>{{ slide.title }}</h3>
        <p>{{ slide.description }}</p>
      </article>
    </h-carousel-item>
  </h-carousel>
</template>

<script setup lang="ts">
const slides = [
  {
    eyebrow: '01 / DISCOVER',
    title: 'Northbound',
    description: 'A quiet route through open skies and distant mountains.',
    background: 'linear-gradient(135deg, #19376d, #576cbc)',
  },
  {
    eyebrow: '02 / EXPLORE',
    title: 'Coastal light',
    description: 'Follow the horizon where blue water meets warm afternoon light.',
    background: 'linear-gradient(135deg, #006d77, #83c5be)',
  },
  {
    eyebrow: '03 / ARRIVE',
    title: 'Afterglow',
    description: 'Settle into the last color of the day.',
    background: 'linear-gradient(135deg, #7f2b53, #d684a3)',
  },
];
</script>

<style scoped>
.carousel-slide {
  box-sizing: border-box;
  height: 100%;
  padding: 48px;
  color: #fff;
}

.carousel-slide span {
  font-size: 12px;
  letter-spacing: 0.16em;
  opacity: 0.78;
}

.carousel-slide h3 {
  margin: 18px 0 8px;
  font-size: 34px;
}

.carousel-slide p {
  max-width: 420px;
  margin: 0;
  line-height: 1.7;
  opacity: 0.86;
}
</style>
