<script setup lang="ts">
import { ref } from 'vue';
import { $message, type NTabValue } from '@nio-fe/lego';

const activeKey = ref('1');

const onTabChanged = (tab: NTabValue) => {
  console.log('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <div style="width: 280px;">

  <n-tabs v-model:active-key="activeKey" @change="onTabChanged">
    <n-tab key="1" label="1.t ratione aut ea. Voluptates praesentium u ratione aut ea. Voluptates praesentium " />
    <n-tab key="2" label="2.Consectetur aut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui pariatur." />
    <n-tab key="3" label="3.Consectetur aut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui pariatur." />
    <n-tab key="4" label="4.ut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui par" />
  </n-tabs>

  </div>
</template>
