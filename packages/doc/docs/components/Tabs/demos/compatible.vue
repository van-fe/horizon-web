<script setup lang="ts">
import { ref } from 'vue';
import { $message, type NTabValue } from '@aurora/horizon-web';

const activeKey = ref('1');
const v2 = ref(false);

const onTabChanged = (tab: NTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};

const beforeChange = (tabKey: string, update: () => void) => {
  if (tabKey === '2') {
    $message.warning({ message: '等待一下', duration: 2000 });
    setTimeout(() => {
      update();
    }, 2000);
    return;
  }
  update();
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const beforeChangeUsed = async (tabKey: string) => {
  if (tabKey === '2') {
    $message.warning({ message: '等待一下', duration: 2000 });
    await delay(2000);
  }
};

const onTabClose = (tabKey: string) => {
  console.debug('close tab key =', tabKey);
};
</script>

<template>
  <div class="mb-8 flex aligh-center">
    <span class="mr-4">其他</span>
    <div class="flex aligh-center" style="column-gap: 10px">
      <h-checkbox v-model="v2" label="v2" />
    </div>
  </div>
  <h-tabs
    v-if="v2"
    v-model:active-key="activeKey"
    editable
    v2
    :underline="false"
    :before-change="beforeChangeUsed"
    @change="onTabChanged"
    @close="onTabClose"
  >
    <h-tab name="1" label="Tab 1" />
    <h-tab name="2" label="延迟访问Tab 2" />
    <h-tab name="3" label="Tab 3" show-close />
    <h-tab key="4" label="Tab long title" />
  </h-tabs>
  <h-tabs
    v-else
    v-model:active-key="activeKey"
    show-add
    :show-underline="false"
    :before-change="beforeChange"
    @change="onTabChanged"
    @close="onTabClose"
  >
    <h-tab name="1" label="Tab 1" />
    <h-tab name="2" label="延迟访问Tab 2" />
    <h-tab name="3" label="Tab 3" show-close />
    <h-tab key="4" label="Tab long title" />
  </h-tabs>
</template>
