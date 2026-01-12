<template>
  <div class="demo-block">
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.top-start="'top-start'">top-start</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.top="'top'">top</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.top-end.child="'top-end'">top-end</h-button>
    </div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.left-start="'left-start'">left-start</h-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.right-start="'right-start'">right-start</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.left="'left'">left</h-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.right="'right'">right</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.left-end="'left-end'">left-end</h-button>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.right-end="'right-end'">right-end</h-button>
    </div>
    <div class="item"></div>
    <div class="item">
      <h-button v-tooltip.bottom-start="'bottom-start'">bottom-start</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.bottom="'bottom'">bottom</h-button>
    </div>
    <div class="item">
      <h-button v-tooltip.bottom-end="'bottom-start'">bottom-start</h-button>
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
