<template>
  <h-carousel
    direction="vertical"
    arrow="always"
    :autoplay="false"
    height="280px"
    aria-label="Product highlights"
  >
    <h-carousel-item v-for="feature in features" :key="feature.title" :label="feature.title">
      <div class="feature-slide">
        <strong>{{ feature.number }}</strong>
        <div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </h-carousel-item>
  </h-carousel>
</template>

<script setup lang="ts">
const features = [
  { number: '01', title: 'Compose', description: 'Bring related stories into one focused view.' },
  {
    number: '02',
    title: 'Navigate',
    description: 'Use arrows, indicators, touch or the keyboard.',
  },
  {
    number: '03',
    title: 'Control',
    description: 'Pause motion and choose the pace that works for you.',
  },
];
</script>

<style scoped>
.feature-slide {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  height: 100%;
  padding: 54px 72px;
  gap: 32px;
  color: #f8fafc;
  background: #172554;
}

.feature-slide strong {
  color: #67e8f9;
  font-size: 48px;
}

.feature-slide h3 {
  margin: 0 0 8px;
  font-size: 28px;
}
.feature-slide p {
  margin: 0;
  color: #cbd5e1;
}
</style>
