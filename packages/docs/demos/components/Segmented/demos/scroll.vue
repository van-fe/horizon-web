<template>
  <n-space direction="vertical" block>
    <n-space>
      <n-checkbox v-model="scrollable">开启自由滑动</n-checkbox>
      <n-checkbox v-model="arrow">开启箭头</n-checkbox>
      <n-checkbox v-model="focusable">选中自动聚焦</n-checkbox>
    </n-space>
    <n-space>
      <div class="box">
        <n-segmented default-active-key="Option 1" :scrollable="scrollable" :arrow="arrow" :focusable="focusable">
          <n-segmented-item v-for="v in options" :key="v" :label="v" />
        </n-segmented>
      </div>
    </n-space>
  </n-space>
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
