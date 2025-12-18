<script setup lang="ts">
import { ref } from 'vue';
import { $message, type NTabValue } from '@aurora/horizon-web';

const activeKey = ref('1');

const onTabChanged = (tab: NTabValue) => {
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <n-tabs v-model:active-key="activeKey" @change="onTabChanged">
    <n-tab key="1" label="Tab1" />
    <n-tab key="2" label="Tab2" />
    <n-tab key="3" label="Tab3" />
    <n-tab key="4" label="Tab4" />
  </n-tabs>
</template>
