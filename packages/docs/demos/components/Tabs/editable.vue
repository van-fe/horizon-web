<script setup lang="ts">
import { $message, type HTabValue } from '@aurora/horizon-web';
import { ref, reactive } from 'vue';

const randomUid = () => Math.random().toString(36).slice(2);

const activeKey = ref(randomUid());
const size = ref('medium');
const cardType = ref('line');
const items = ref([
  { label: 'Default Tab 1', uid: activeKey.value },
  { label: 'Default Tab 2', uid: randomUid() },
  { label: 'Default Tab 3', uid: randomUid() },
]);

const firstTab = reactive({ label: 'FirstTab', uid: randomUid(), show: true });

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
};

const onTabAdd = () => {
  $message({ type: 'success', message: 'Add tab' });

  const newTab = { label: `New Tab ${items.value.length + 1}`, uid: randomUid() };
  items.value = items.value.concat(newTab);
  activeKey.value = newTab.uid;
};

const onTabClose = (key: HTabValue) => {
  $message({ type: 'success', message: `Close tab ${key}` });

  items.value = items.value.filter(t => t.uid !== key);
};
</script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio value="line">line(Default)</h-radio>
      <h-radio value="card">card</h-radio>
      <h-radio value="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-4 flex align-center">
    <span class="mr-4">尺寸</span>
    <h-radio-group v-model="size" :disabled="cardType === 'page'">
      <h-radio value="small">small</h-radio>
      <h-radio value="medium">medium(Default)</h-radio>
      <h-radio value="large">large</h-radio>
    </h-radio-group>
  </div>
  <h-tabs
    v-model:active-key="activeKey"
    editable
    :type="cardType"
    :size="size"
    @change="onTabChanged"
    @add="onTabAdd"
    @close="onTabClose"
  >
    <h-tab v-if="firstTab.show" :key="firstTab.uid" :label="firstTab.label" />
    <h-tab v-for="item in items" :key="item.uid" :label="item.label" closable />
  </h-tabs>
</template>
