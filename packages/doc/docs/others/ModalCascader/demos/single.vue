<template>
  <n-form :inline="true" label-position="top">
    <n-form-item label="可选任意节点">
      <n-switch v-model="checkStrictly" status />
    </n-form-item>
  </n-form>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">无Radio（默认）</div>
      <n-modal-cascader
        v-model="currentVal1"
        :show-radio="false"
        :check-strictly="checkStrictly"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        @change="handleChange"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">有Radio</div>
      <n-modal-cascader
        v-model="currentVal2"
        :show-radio="true"
        :check-strictly="checkStrictly"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        @change="handleChange"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NCascaderExtendOption } from '@aurora/horizon-web';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[]>([]);
const baseData = ref([]);
const checkStrictly = ref(true);

function handleChange(selectOrDeselect?: boolean | undefined, option?: NCascaderExtendOption | undefined) {
  console.log(selectOrDeselect, option);
}

onMounted(async()=>{
  baseData.value = await fetch(`https://static.nio.com/fx-static/51/fixed/cascader-tree-data.prod.json?t=${Date.now()}`).then(r => r.json());
});
</script>
