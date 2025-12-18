<script setup lang="ts">
import { $message, type NTabValue } from '@aurora/horizon-web';
import { ref } from 'vue';

const activeKey = ref(1);
const cardType = ref('card');
const disabled = ref(false);
const tabs = ref(
  Array(5)
    .fill(0)
    .map((_, i) => ({ title: `Tab ${i + 1}`, key: i })),
);

const onTabChanged = (tab: NTabValue) => {
  console.log('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};

const onSort = (current: number, target: number, sortedKeys: number[]) => {
  console.debug('sort', current, target, sortedKeys);
  tabs.value = sortedKeys.map(key => ({ title: `Tab ${key + 1}`, key }));
};
</script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <n-radio-group v-model="cardType">
      <n-radio label="line">line(Default)</n-radio>
      <n-radio label="card">card</n-radio>
      <n-radio label="page">page(不支持尺寸调整)</n-radio>
    </n-radio-group>
  </div>
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <n-checkbox v-model="disabled" label="设置第三项不可拖拽" />
    </div>
  </div>
  <n-tabs
    :default-active-key="activeKey"
    draggable
    :type="cardType"
    @change="onTabChanged"
    @sort="onSort"
  >
    <transition-group name="fade">
      <n-tab
        v-for="(tab, i) in tabs"
        :key="tab.key"
        :label="tab.title"
        :draggable="disabled ? !(i === 2) : true"
      />
    </transition-group>
  </n-tabs>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all var(--n-tabs-transition-time) var(--n-tabs-transition-fn);
}
</style>
