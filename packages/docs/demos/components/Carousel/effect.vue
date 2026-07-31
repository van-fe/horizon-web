<template>
  <h-space vertical>
    <h-space>
      <h-button @click="carousel?.prev()">Previous</h-button>
      <h-button @click="carousel?.next()">Next</h-button>
      <span>Active index: {{ activeIndex }}</span>
    </h-space>
    <h-carousel
      ref="carousel"
      v-model="activeIndex"
      effect="fade"
      arrow="always"
      indicator-position="outside"
      :autoplay="false"
      height="220px"
    >
      <h-carousel-item v-for="item in 3" :key="item" :name="`scene-${item}`">
        <div class="fade-slide" :class="`fade-slide--${item}`">Scene {{ item }}</div>
      </h-carousel-item>
    </h-carousel>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeIndex = ref(0);
const carousel = ref<{ prev: () => void; next: () => void }>();
</script>

<style scoped>
.fade-slide {
  display: grid;
  height: 100%;
  color: #fff;
  font-size: 30px;
  place-items: center;
}

.fade-slide--1 {
  background: linear-gradient(120deg, #2b5876, #4e4376);
}
.fade-slide--2 {
  background: linear-gradient(120deg, #134e5e, #71b280);
}
.fade-slide--3 {
  background: linear-gradient(120deg, #5f2c82, #49a09d);
}
</style>
