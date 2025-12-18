<script setup lang="ts">
import { $message, type NTabValue } from '@aurora/horizon-web';
import { ref } from 'vue';

const activeKey = ref(1);
const size = ref('medium');
const cardType = ref('line');
const showIcon = ref(true);
const underline = ref(true);
const customizeUnderline = ref(false);
const customizeSpace = ref(false);

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const icons = ['car', 'change_power', 'card_voucher'];

const onTabChanged = (tab: NTabValue) => {
  console.log('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <n-radio-group v-model="cardType">
      <n-radio label="line">line(Default)</n-radio>
      <n-radio label="card">card</n-radio>
      <n-radio label="segment">segment</n-radio>
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
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <n-checkbox v-model="showIcon" label="展示图标" />
      <n-checkbox
        v-model="underline"
        :disabled="cardType !== 'line'"
        label="展示分割线(only line)"
      />
      <n-checkbox
        v-model="customizeUnderline"
        :disabled="cardType !== 'line'"
        label="自定义分割线(only line)"
      />
      <n-checkbox
        v-model="customizeSpace"
        :disabled="cardType !== 'card'"
        label="移除首段间距(only card)"
      />
    </div>
  </div>

  <div
    style="height: 80px"
    :class="{ 'customize-underline': customizeUnderline, 'customize-space': customizeSpace }"
  >
    <n-tabs
      v-model:active-key="activeKey"
      :underline="underline"
      :type="cardType"
      :size="size"
      @change="onTabChanged"
    >
      <n-tab v-for="(tab, i) in tabs" :key="i" :icon="showIcon ? icons[i] : null" :label="tab" />
    </n-tabs>
  </div>
</template>

<style scoped>
.customize-underline {
  --n-tabs-height--underline--line: 4px;
}

.customize-space {
  --n-tabs-padding--nav-wrap--card: 0;
}
</style>
