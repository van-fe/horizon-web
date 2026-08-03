<template>
  <h-carousel height="220px" :interval="2500">
    <h-carousel-item v-for="item in 4" :key="item" :label="`Campaign ${item}`">
      <div class="number-slide" :class="`number-slide--${item}`">0{{ item }}</div>
    </h-carousel-item>
  </h-carousel>
</template>

<style scoped>
.number-slide {
  display: grid;
  height: 100%;
  color: rgba(255, 255, 255, 0.92);
  font-size: 64px;
  font-weight: 600;
  place-items: center;
}

.number-slide--1 {
  background: #354f52;
}
.number-slide--2 {
  background: #52796f;
}
.number-slide--3 {
  background: #756ab6;
}
.number-slide--4 {
  background: #ac87c5;
}
</style>
