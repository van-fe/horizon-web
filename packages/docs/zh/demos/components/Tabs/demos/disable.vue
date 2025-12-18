<script setup lang="ts">
import { $message, type NTabValue } from '@aurora/horizon-web';
import { ref } from 'vue';

const cardType = ref('line');

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
      <n-radio label="segment">segment</n-radio>
    </n-radio-group>
  </div>
  <n-tabs default-active-key="3" :type="cardType" @change="onTabChanged">
    <n-tab key="1" label="Tab 1" />
    <n-tab key="2" label="Tab 2" disabled />
    <n-tab key="3" label="Tab 3" />
  </n-tabs>
</template>
