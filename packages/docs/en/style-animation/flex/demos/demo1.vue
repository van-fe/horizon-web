<template>
  <div class="flex flex-column justify-space-around demo">
    <div class="flex justify-space-between">
      <div class="white bg-primary text-center">1</div>
      <div class="white bg-primary text-center">2</div>
      <div class="white bg-primary text-center">3</div>
    </div>
    <div class="flex justify-space-between">
      <div class="white bg-primary text-center">1</div>
      <div class="white bg-primary text-center">2</div>
    </div>
    <div class="flex justify-space-between">
      <div class="order-3 white bg-primary text-center">1</div>
      <div class="order-2 white bg-primary text-center">2</div>
      <div class="order-1 white bg-primary text-center">3</div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  width: 240px;
  height: 240px;
}

.demo div div {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
</style>
