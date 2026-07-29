<script setup lang="ts">
import { ref } from 'vue';
import { $message, type HTabValue } from '@aurora/horizon-web';

const activeKey = ref();
const tabs = ref(['Operators']);

const onTabChanged = (tab: HTabValue) => {
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
  <h-tabs v-model:active-key="activeKey" v2 @change="onTabChanged">
    <h-tab v-for="tab in tabs" :key="tab">
      <template #default>
        <h-dropdown trigger="context-menu" @command="onCommand(tab, $event)">
          <div>{{ tab }}</div>
          <h-dropdown-menu>
            <h-dropdown-item command="add">添加</h-dropdown-item>
            <h-dropdown-item command="rm" :disabled="tabs.length <= 1">删除</h-dropdown-item>
          </h-dropdown-menu>
        </h-dropdown>
      </template>
    </h-tab>
  </h-tabs>
</template>
