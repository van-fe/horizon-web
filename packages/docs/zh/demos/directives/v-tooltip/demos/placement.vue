<template>
  <div class="demo-block">
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.top-start="'top-start'">top-start</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.top="'top'">top</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.top-end.child="'top-end'">top-end</n-button>
    </div>
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.left-start="'left-start'">left-start</n-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.right-start="'right-start'">right-start</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.left="'left'">left</n-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.right="'right'">right</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.left-end="'left-end'">left-end</n-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.right-end="'right-end'">right-end</n-button>
    </div>
    <div class="item"></div>
    <div class="item">
      <n-button v-tooltip.bottom-start="'bottom-start'">bottom-start</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.bottom="'bottom'">bottom</n-button>
    </div>
    <div class="item">
      <n-button v-tooltip.bottom-end="'bottom-start'">bottom-start</n-button>
    </div>
    <div class="item"></div>
  </div>
</template>

<script setup lang="ts">
</script>

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
