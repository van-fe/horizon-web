<template>
  <div class="demo-block">
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.top-start="'top-start'" type="normal" plain>topStart</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.top="'top'" type="normal" plain>top</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.top-end.child="'top-end'" type="normal" plain>topEnd</h-button>
    </div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.left-start="'left-start'" type="normal" plain>leftStart</h-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.right-start="'right-start'" type="normal" plain>rightStart</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.left="'left'" type="normal" plain>left</h-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.right="'right'" type="normal" plain>right</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.left-end="'left-end'" type="normal" plain>leftEnd</h-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.right-end="'right-end'" type="normal" plain>rightEnd</h-button>
    </div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.bottom-start="'bottom-start'" type="normal" plain>bottomStart</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.bottom="'bottom'" type="normal" plain>bottom</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.bottom-end="'bottom-start'" type="normal" plain>bottomStart</h-button>
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
