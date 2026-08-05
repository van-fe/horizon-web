<script setup lang="ts">
const placements = [
  null,
  ['top-start', '上左'],
  ['top', '上'],
  ['top-end', '上右'],
  null,
  ['left-start', '左上'],
  null,
  null,
  null,
  ['right-start', '右上'],
  ['left', '左'],
  null,
  null,
  null,
  ['right', '右'],
  ['left-end', '左下'],
  null,
  null,
  null,
  ['right-end', '右下'],
  null,
  ['bottom-start', '下左'],
  ['bottom', '下'],
  ['bottom-end', '下右'],
  null,
  null,
  ['auto-start', '自动起始'],
  ['auto', '自动'],
  ['auto-end', '自动尾部'],
  null,
] as const;
</script>

<template>
  <div class="demo-block">
    <div v-for="(placement, index) in placements" :key="index" class="item">
      <h-popover
        v-if="placement"
        trigger="hover"
        :placement="placement[0]"
        :flip="placement[0].startsWith('auto')"
      >
        <template #reference>
          <h-button>{{ placement[1] }}</h-button>
        </template>
        <template #popper>
          <h-pop-content>{{ placement[0] }}</h-pop-content>
        </template>
      </h-popover>
    </div>
  </div>
</template>

<style scoped>
.demo-block {
  display: grid;
  grid-template: repeat(6, 1fr) / repeat(5, 1fr);
  grid-gap: 20px;
  width: 430px;
}

.demo-block .item {
  width: 80px;
}

.demo-block .item button {
  width: 100%;
}
</style>
