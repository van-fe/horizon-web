<script setup lang="ts">
import { $message, type NTabValue } from '@aurora/horizon-web';
import { ref } from 'vue';

const cardType = ref('line');

const onTabChanged = (tab: NTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <div class="mb-8 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio label="line">line(Default)</h-radio>
      <h-radio label="card">card</h-radio>
      <h-radio label="segment">segment</h-radio>
    </h-radio-group>
  </div>
  <h-tabs default-active-key="3" :type="cardType" @change="onTabChanged">
    <h-tab key="1" label="Tab 1" />
    <h-tab key="2" label="Tab 2" disabled />
    <h-tab key="3" label="Tab 3" />
  </h-tabs>
</template>
