<template>
  <n-row :gutter="10">
    <n-col :span="24">
      <div class="demo-title">单选</div>
      <n-cascader
        ref="cascaderDomRef1"
        v-model="currentVal1"
        :options="baseData"
        :show-popover-content-only="true"
        @update:modelValue="updateHandle"
        @change="changeHandle"
      />
    </n-col>
    <n-col :span="24">
      <div class="demo-title">多选</div>
      <n-cascader
        ref="cascaderDomRef2"
        v-model="currentVal2"
        :options="baseData"
        :multiple="true"
        :show-popover-content-only="true"
        @update:modelValue="updateHandle"
        @change="changeHandle"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CascaderExposes, NCascader } from '@aurora/horizon-web';
import type { NCascaderExtendOption, NCascaderModelValueType } from '@aurora/horizon-web';
import { HorizonWebComponentInstance } from '@aurora/utils';

const cascaderDomRef1 = ref<HorizonWebComponentInstance<typeof NCascader, CascaderExposes>>();
const cascaderDomRef2 = ref<HorizonWebComponentInstance<typeof NCascader, CascaderExposes>>();

const currentVal1 = ref<string[]>(["guide", "navigation", "side nav"]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);

const changeHandle = (selectOrDeselect: boolean | undefined, option?: NCascaderExtendOption) => {
  console.info('change: ', selectOrDeselect, option);
};

const updateHandle = (value: NCascaderModelValueType) => {
  console.info('update: ', value);
};

onMounted(async()=>{
  baseData.value = await fetch(`https://static.nio.com/fx-static/horizon-web/clzuyi8za019o086o9mtt36gn/tree-data-level-not-equal.json?t=12`).then(r => r.json());
  currentVal2.value.push(["guide", "navigation", "side nav"]);
});
</script>
