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
    <h-radio-group v-model="cardType">
      <h-radio value="line">line(Default)</h-radio>
      <h-radio value="card">card</h-radio>
      <h-radio value="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-4 flex align-center">
    <span class="mr-4">尺寸</span>
    <h-radio-group v-model="size" :disabled="cardType === 'page'">
      <h-radio value="small">small</h-radio>
      <h-radio value="medium">medium(Default)</h-radio>
      <h-radio value="large">large</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <h-checkbox v-model="scrollable" label="标签可滑动" />
      <h-checkbox v-model="focusable" label="自动滑动到激活元素" />
      <h-checkbox v-model="arrow" label="超长页签使用箭头" />
    </div>
  </div>
  <div class="flex">
    <div class="box">
      <h-tabs
        v-model:activeKey="activeKey"
        :default-active-key="1"
        :type="cardType"
        :size="size"
        :arrow="arrow"
        :focusable="focusable"
        :scrollable="scrollable"
      >
        <h-tab v-for="key in tabs" :key="key" :label="`Tab${key}`" />
      </h-tabs>
    </div>
  </div>
</template>

<style scoped>
.box {
  height: 80px;
  width: 600px;
}
</style>
