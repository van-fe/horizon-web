<script setup lang="ts">
import { ref } from 'vue';
import { $message, type NTabValue } from '@nio-fe/lego';

const activeKey = ref('1');

const onTabChanged = (tab: NTabValue) => {
  console.log('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};

const cardType = ref('card');
</script>

<template>
  <n-space block direction="vertical">
    <n-space>
      <div>类型</div>
      <n-radio-group v-model="cardType">
        <n-radio label="line">line(Default)</n-radio>
        <n-radio label="card">card</n-radio>
        <n-radio label="page">page</n-radio>
      </n-radio-group>
    </n-space>
    <n-tabs v-model:active-key="activeKey" :type="cardType" @change="onTabChanged">
      <n-tab key="1" label="Tab 1" />
      <n-tab key="2" label="Tab 2" />
      <n-tab key="3" label="Tab 3" />
      <n-tab key="4" style="width: 150px">
        <n-tooltip
          placement="bottom"
          trigger="hover"
          size="medium"
          content="Tab long titleTab long title"
          overflow
        >
          <div class="overflow">Tab long titleTab long title</div>
        </n-tooltip>
      </n-tab>
    </n-tabs>
  </n-space>
</template>

<style scoped>
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
