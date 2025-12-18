<script setup lang="ts">
import { ref } from 'vue';
import { $message, type NTabValue } from '@nio-fe/lego';

// const activeKey = ref(0);
const cardType = ref('line');
const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const icons = ['car', 'change_power', 'card_voucher'];

const onTabChanged = (tab: NTabValue) => {
  console.log('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <div class="mb-8 flex align-center">
    <span class="mr-4">类型</span>
    <n-radio-group v-model="cardType">
      <n-radio label="line">line(Default)</n-radio>
      <n-radio label="card">card</n-radio>
      <n-radio label="page">page(不支持尺寸调整)</n-radio>
    </n-radio-group>
  </div>

  <div style="height: 50px">
    <n-tabs :default-active-key="0" :type="cardType" @change="onTabChanged">
      <n-tab v-for="(tab, i) in tabs" :key="i" :icon="icons[i]" :label="tab" />
    </n-tabs>
  </div>
</template>
