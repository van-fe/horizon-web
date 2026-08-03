<script setup lang="ts">
import { ref } from 'vue';
import { $message, type HTabValue } from '@aurora/horizon-web';

const activeKey = ref('1');

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <div style="width: 280px;">

  <h-tabs v-model:active-key="activeKey" @change="onTabChanged">
    <h-tab key="1" label="1.t ratione aut ea. Voluptates praesentium u ratione aut ea. Voluptates praesentium " />
    <h-tab key="2" label="2.Consectetur aut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui pariatur." />
    <h-tab key="3" label="3.Consectetur aut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui pariatur." />
    <h-tab key="4" label="4.ut ratione aut ea. Voluptates praesentium ut impedit sed non a. Ut autem illum est. Omnis et qui par" />
  </h-tabs>

  </div>
</template>
