<script setup lang="ts">
import { ref } from 'vue';
import { $message, type NTabValue } from '@aurora/horizon-web';

const activeKey = ref('1');

const onTabChanged = (tab: NTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <h-tabs v-model:active-key="activeKey" @change="onTabChanged">
    <h-tab key="1" label="Tab 1" />
    <h-tab key="2" label="Tab 2" />
    <h-tab key="3" label="Tab 3" />
    <h-tab key="4">
      <h-tooltip
        placement="bottom"
        trigger="hover"
        size="medium"
        content="Tab long titleTab long title"
      >
        <div>Tab long title...</div>
      </h-tooltip>
    </h-tab>
  </h-tabs>
</template>
