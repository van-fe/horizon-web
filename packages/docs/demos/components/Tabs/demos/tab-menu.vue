<script setup lang="ts">
import { ref } from 'vue';
import { $message, type NTabValue } from '@aurora/horizon-web';

const activeKey = ref();
const tabs = ref(['Operators']);

const onTabChanged = (tab: NTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};

const onCommand = (key: string, cmd: string) => {
  if (cmd === 'add') {
    tabs.value = [...tabs.value, `Random${Math.random().toString(36).slice(2)}`];
  } else {
    tabs.value = tabs.value.filter(tab => tab !== key);
  }
};
</script>

<template>
  <n-tabs v-model:active-key="activeKey" v2 @change="onTabChanged">
    <n-tab v-for="tab in tabs" :key="tab">
      <template #default>
        <n-dropdown trigger="context-menu" @command="onCommand(tab, $event)">
          <div>{{ tab }}</div>
          <n-dropdown-menu>
            <n-dropdown-item command="add">添加</n-dropdown-item>
            <n-dropdown-item command="rm" :disabled="tabs.length <= 1">删除</n-dropdown-item>
          </n-dropdown-menu>
        </n-dropdown>
      </template>
    </n-tab>
  </n-tabs>
</template>
