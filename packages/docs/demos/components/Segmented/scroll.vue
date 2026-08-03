<template>
  <h-space direction="vertical" block>
    <h-space>
      <h-checkbox v-model="scrollable">开启自由滑动</h-checkbox>
      <h-checkbox v-model="arrow">开启箭头</h-checkbox>
      <h-checkbox v-model="focusable">选中自动聚焦</h-checkbox>
    </h-space>
    <h-space>
      <div class="box">
        <h-segmented default-active-key="Option 1" :scrollable="scrollable" :arrow="arrow" :focusable="focusable">
          <h-segmented-item v-for="v in options" :key="v" :label="v" />
        </h-segmented>
      </div>
    </h-space>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = Array(100)
  .fill(0)
  .map((_, i) => `Option ${i + 1}`);

const scrollable = ref(true);
const focusable = ref(true);
const arrow = ref(true);
</script>

<style scoped>
.box {
  width: 500px;
}
</style>
