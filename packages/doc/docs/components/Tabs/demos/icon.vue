<script setup lang="ts">
import { ref } from 'vue';
import { $message, type NTabValue } from '@aurora/horizon-web';

// const activeKey = ref(0);
const cardType = ref('line');
const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const icons = ['car', 'change_power', 'card_voucher'];

const onTabChanged = (tab: NTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <div class="mb-8 flex aligh-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio label="line">line(Default)</h-radio>
      <h-radio label="card">card</h-radio>
      <h-radio label="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>

  <div style="height: 50px">
    <h-tabs :default-active-key="0" :type="cardType" @change="onTabChanged">
      <h-tab v-for="(tab, i) in tabs" :key="i" :icon="icons[i]" :label="tab" />
    </h-tabs>
  </div>
</template>
