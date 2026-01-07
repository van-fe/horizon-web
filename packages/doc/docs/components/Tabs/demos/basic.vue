<script setup lang="ts">
import { ref } from 'vue';
import { $message, type NTabValue } from '@aurora/horizon-web';

const activeKey = ref('1');

const onTabChanged = (tab: NTabValue) => {
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <h-tabs v-model:active-key="activeKey" @change="onTabChanged">
    <h-tab key="1" label="Tab1" />
    <h-tab key="2" label="Tab2" />
    <h-tab key="3" label="Tab3" />
    <h-tab key="4" label="Tab4" />
  </h-tabs>
</template>
