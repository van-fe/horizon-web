<script setup lang="ts">
import { $message, type NTabValue } from '@aurora/horizon-web';
import { ref, watch } from 'vue';

const activeKey = ref('Tab 1');
const tabs = ref<string[]>(['Tab 1', 'Tab 2', 'Tab 3']);
const size = ref('medium');
const cardType = ref('line');
const all = ref(true);

const onTabChanged = (tab: NTabValue) => {
  console.info('tab changed', tab);
};

const onClick = () => {
  $message({ type: 'success', message: `Extra area clicked` });
};

const onAddTabs = () => {
  tabs.value = tabs.value.concat(
    Array.from({ length: 10 }, (_, i) => `Tab ${i + tabs.value.length + 4}`),
  );
};

const onTabAdd = () => {
  $message({ type: 'success', message: 'Add tab' });

  const newTab = `New Tab ${tabs.value.length + 1}`;
  tabs.value = tabs.value.concat(newTab);
  activeKey.value = newTab;
};

const onTabClose = (key: NTabValue) => {
  $message({ type: 'success', message: `Close tab ${key}` });

  tabs.value = tabs.value.filter(t => t !== key);
};

const showAllAction = () => {
  if (all.value) onAddTabs();
  else tabs.value = tabs.value.slice(0, 3);
};

watch(() => all.value, showAllAction, { immediate: true });
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
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <h-checkbox v-model="all" label="全部所有操作" />
    </div>
  </div>

  <div style="width: 80%">
    <h-tabs
      v-model:active-key="activeKey"
      editable
      v2
      :size="size"
      :type="cardType"
      @change="onTabChanged"
      @add="onTabAdd"
      @close="onTabClose"
    >
      <h-tab v-for="t in tabs" :key="t" :label="t" closable />
      <template #extra="{ size: sm }">
        <div>
          <h-space>
            <h-button :size="sm" @click="onClick">刷新</h-button>
            <h-button :size="sm" type="normal" @click="onClick">重置</h-button>
          </h-space>
        </div>
      </template>
    </h-tabs>
  </div>
</template>
