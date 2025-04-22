<script lang="ts" setup>
import { ref } from 'vue';

const activeKey = ref(0);
const size = ref('medium');
const cardType = ref('line');
const focusable = ref(true);
const scrollable = ref(true);
const arrow = ref(true);
const tabs = ref<number[]>(
  Array(20)
    .fill(0)
    .map((_, i) => i),
);
</script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <n-radio-group v-model="cardType">
      <n-radio label="line">line(Default)</n-radio>
      <n-radio label="card">card</n-radio>
      <n-radio label="segment" disabled>segment（请使用 NSegmented 替代）</n-radio>
      <n-radio label="page">page(不支持尺寸调整)</n-radio>
    </n-radio-group>
  </div>
  <div class="mb-4 flex align-center">
    <span class="mr-4">尺寸</span>
    <n-radio-group v-model="size" :disabled="cardType === 'page'">
      <n-radio label="mini">mini</n-radio>
      <n-radio label="small">small</n-radio>
      <n-radio label="medium">medium(Default)</n-radio>
      <n-radio label="large">large</n-radio>
    </n-radio-group>
  </div>
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <n-checkbox v-model="scrollable" label="标签可滑动" />
      <n-checkbox v-model="focusable" label="自动滑动到激活元素" />
      <n-checkbox v-model="arrow" label="超长页签使用箭头" />
    </div>
  </div>
  <div class="flex">
    <div class="box">
      <n-tabs
        v-model:active-key="activeKey"
        :default-active-key="1"
        :type="cardType"
        :size="size"
        :arrow="arrow"
        :focusable="focusable"
        :scrollable="scrollable"
      >
        <n-tab v-for="key in tabs" :key="key" :label="`Tab${key}`" />
      </n-tabs>
    </div>
  </div>
</template>

<style scoped>
.box {
  height: 80px;
  width: 600px;
}
</style>
