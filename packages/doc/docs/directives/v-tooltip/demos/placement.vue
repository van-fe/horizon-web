<template>
  <div class="demo-block">
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.top-start="'top-start'" type="normal" plain>topStart</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.top="'top'" type="normal" plain>top</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.top-end.child="'top-end'" type="normal" plain>topEnd</n-button>
    </div>
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.left-start="'left-start'" type="normal" plain>leftStart</n-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.right-start="'right-start'" type="normal" plain>rightStart</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.left="'left'" type="normal" plain>left</n-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.right="'right'" type="normal" plain>right</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.left-end="'left-end'" type="normal" plain>leftEnd</n-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.right-end="'right-end'" type="normal" plain>rightEnd</n-button>
    </div>
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.bottom-start="'bottom-start'" type="normal" plain>bottomStart</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.bottom="'bottom'" type="normal" plain>bottom</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.bottom-end="'bottom-start'" type="normal" plain>bottomStart</n-button>
    </div>
    <div class="item"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.demo-block {
  width: 430px;
  display: grid;
  grid-template: repeat(5, 1fr) / repeat(5, 1fr);
  grid-gap: 20px;
}

.demo-block .item {
  width: 120px;
}

.demo-block .item button {
  width: 100%;
}
</style>
