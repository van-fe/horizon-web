<script setup lang="ts">
import { ref } from 'vue';
import { $message, type NTabValue } from '@aurora/horizon-web';

const activeKey = ref('1');

const onTabChanged = (tab: NTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};

const cardType = ref('card');
</script>

<template>
  <h-space block direction="vertical">
    <h-space>
      <div>类型</div>
      <h-radio-group v-model="cardType">
        <h-radio label="line">line(Default)</h-radio>
        <h-radio label="card">card</h-radio>
        <h-radio label="page">page</h-radio>
      </h-radio-group>
    </h-space>
    <h-tabs v-model:active-key="activeKey" :type="cardType" @change="onTabChanged">
      <h-tab key="1" label="Tab 1" />
      <h-tab key="2" label="Tab 2" />
      <h-tab key="3" label="Tab 3" />
      <h-tab key="4" style="width: 150px">
        <h-tooltip
          placement="bottom"
          trigger="hover"
          size="medium"
          content="Tab long titleTab long title"
          overflow
        >
          <div class="overflow">Tab long titleTab long title</div>
        </h-tooltip>
      </h-tab>
    </h-tabs>
  </h-space>
</template>

<style scoped>
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
