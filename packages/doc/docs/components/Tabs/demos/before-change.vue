<template>
  <n-tabs v-model:active-key="activeKey" v2 type="card" :before-change="beforeChange">
    <n-tab key="tab1" label="普通Tab" />
    <n-tab key="tab2" label="2s延迟">
      <template v-if="loading" #icon>
        <n-icon spin="ccw" name="loading" />
      </template>
    </n-tab>
    <n-tab key="tab3" label="不可访问" />
    <n-tab key="tab4" label="普通Tab 2" />
  </n-tabs>
</template>

<script lang="ts" setup>
import { $message } from '@nio-fe/lego';
import { ref } from 'vue';

const activeKey = ref('tab1');
const loading = ref(false);
const delay = () => new Promise(r => setTimeout(r, 2000));
const beforeChange = async (tabName: string | number) => {
  if (tabName === 'tab2') {
    loading.value = true;
    await delay();
    loading.value = false;
    return true;
  }
  if (tabName === 'tab3') {
    $message.warning('不可访问！');
    return false;
  }
  return true;
};
</script>
