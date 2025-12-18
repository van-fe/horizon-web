<script setup lang="ts">
import { $message, type NTabValue } from '@nio-fe/lego';
import { onMounted, ref } from 'vue';

const onTabChanged = (tab: NTabValue) => {
  console.log('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};

const tabLabel = ref('1');
const tabLabel2 = ref('2');
const tabLabel3 = ref('3');
const tabs = ref(['1', '2', '3']);

onMounted(() => {
  setTimeout(() => {
    tabLabel.value = '待排期待排期待排期';
    tabLabel2.value = '待排期待排期待排期';
    tabLabel3.value = '待排期待排期待排期';
    tabs.value = ['待排期待排期待排期', '待排期待排期待排期', '待排期待排期待排期'];
  }, 2000);
});
</script>

<template>
  <n-tabs :default-active-key="0" type="segment" @change="onTabChanged">
    <!-- <n-tab key="1" :label="tabLabel" />
    <n-tab key="2" :label="tabLabel2" />
    <n-tab key="3" :label="tabLabel3" /> -->
    <n-tab v-for="(t, i) in tabs" :key="i" :label="t" />
  </n-tabs>
</template>
