<script setup lang="ts">
import { $message, type NTabValue } from '@aurora/horizon-web';
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

const onTabChanged = (tab: NTabValue) => {
  console.info('tab changed', tab);
};

const onTabAdd = () => {
  $message({ type: 'success', message: 'Add tab' });

  const newTab = { label: `New Tab ${items.value.length + 1}`, uid: randomUid() };
  items.value = items.value.concat(newTab);
  activeKey.value = newTab.uid;
};

const onTabClose = (key: NTabValue) => {
  $message({ type: 'success', message: `Close tab ${key}` });

  items.value = items.value.filter(t => t.uid !== key);
};

</script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio label="line">line(Default)</h-radio>
      <h-radio label="card">card</h-radio>
      <h-radio label="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-4 flex align-center">
    <span class="mr-4">尺寸</span>
    <h-radio-group v-model="size" :disabled="cardType === 'page'">
      <h-radio label="mini">mini</h-radio>
      <h-radio label="small">small</h-radio>
      <h-radio label="medium">medium(Default)</h-radio>
      <h-radio label="large">large</h-radio>
    </h-radio-group>
  </div>
  <h-tabs
    v-model:active-key="activeKey"
    v2
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
