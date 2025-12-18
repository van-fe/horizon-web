<script setup lang="ts">
import { $message, type NTabValue } from '@nio-fe/lego';
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
  console.log('tab changed', tab);
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
    <n-radio-group v-model="cardType">
      <n-radio label="line">line(Default)</n-radio>
      <n-radio label="card">card</n-radio>
      <n-radio label="page">page(不支持尺寸调整)</n-radio>
    </n-radio-group>
  </div>
  <div class="mb-4 flex align-center">
    <span class="mr-4">尺寸</span>
    <n-radio-group v-model="size" :disabled="cardType === 'page'">
      <n-radio label="mini">mini</n-radio>
      <n-radio label="small">small</n-radio>
      <n-radio label="medium">medium(Default)</n-radio>
      <n-radio label="large">large</n-radio>
    </n-radio-group>
  </div>
  <n-tabs
    v-model:active-key="activeKey"
    v2
    editable
    :type="cardType"
    :size="size"
    @change="onTabChanged"
    @add="onTabAdd"
    @close="onTabClose"
  >
    <n-tab v-if="firstTab.show" :key="firstTab.uid" :label="firstTab.label" />
    <n-tab v-for="item in items" :key="item.uid" :label="item.label" closable />
  </n-tabs>
</template>
