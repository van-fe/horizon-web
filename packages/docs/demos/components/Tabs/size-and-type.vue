<script setup lang="ts">
import { $message, type HTabValue } from '@aurora/horizon-web';
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

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <div class="mb-4 flex align-center">
    <span class="mr-4">类型</span>
    <h-radio-group v-model="cardType">
      <h-radio value="line">line(Default)</h-radio>
      <h-radio value="card">card</h-radio>
      <h-radio value="page">page(不支持尺寸调整)</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-4 flex align-center">
    <span class="mr-4">尺寸</span>
    <h-radio-group v-model="size" :disabled="cardType === 'page'">
      <h-radio value="small">small</h-radio>
      <h-radio value="medium">medium(Default)</h-radio>
      <h-radio value="large">large</h-radio>
    </h-radio-group>
  </div>
  <div class="mb-8 flex align-center">
    <span class="mr-4">其他</span>
    <div class="flex align-center" style="column-gap: 10px">
      <h-checkbox v-model="showIcon" label="展示图标" />
      <h-checkbox
        v-model="underline"
        :disabled="cardType !== 'line'"
        label="展示分割线(only line)"
      />
      <h-checkbox
        v-model="customizeUnderline"
        :disabled="cardType !== 'line'"
        label="自定义分割线(only line)"
      />
      <h-checkbox
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
    <h-tabs
      v-model:active-key="activeKey"
      :underline="underline"
      :type="cardType"
      :size="size"
      @change="onTabChanged"
    >
      <h-tab v-for="(tab, i) in tabs" :key="i" :icon="showIcon ? icons[i] : null" :label="tab" />
    </h-tabs>
  </div>
</template>

<style scoped>
.customize-underline {
  --h-tabs-size-underline-line-height: 4px;
}

.customize-space {
  --h-tabs-spacing-nav-wrap-card-padding: 0;
}
</style>
