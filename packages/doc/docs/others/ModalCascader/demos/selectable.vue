<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-modal-cascader
        v-model="currentVal1"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        :show-radio="true"
        @update:modelValue="updateHandle"
        @change="changeHandle"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-modal-cascader
        v-model="currentVal2"
        :clearable="true"
        :options="baseData"
        :multiple="true"
        :filterable="true"
        :use-filter-check-all="true"
        :to-body="false"
        :collapse="true"
        @update:modelValue="updateHandle"
        @change="changeHandle"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { NCascaderExtendOption, NCascaderModelValueType } from '@nio-fe/lego';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);

const changeHandle = (value: NCascaderModelValueType, option: NCascaderExtendOption) => {
  console.log('change: ', value, option);
};

const updateHandle = (value: NCascaderModelValueType) => {
  console.log('update: ', value);
};

onMounted(async()=>{
  baseData.value = await fetch('https://static.nio.com/fx-static/lego/clup57llj000808a34cambuix/unselectable-options.json').then(r => r.json());
});
</script>
