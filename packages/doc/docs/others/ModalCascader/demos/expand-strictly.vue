<template>
  <n-form :inline="true" label-position="top">
    <n-form-item label="勾选父级是否不展开子集">
      <n-switch v-model="expandStrictly" status />
    </n-form-item>
  </n-form>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-modal-cascader
        v-model="currentVal1"
        :check-strictly="true"
        :expand-strictly="expandStrictly"
        :clearable="true"
        :to-body="false"
        :show-radio="true"
        :options="baseData"
        @input="changeHandle"
        @change="changeHandle"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-modal-cascader
        v-model="currentVal2"
        :check-strictly="true"
        :expand-strictly="expandStrictly"
        :clearable="true"
        :options="baseData"
        :multiple="true"
        :to-body="false"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);
const expandStrictly = ref(true);

const changeHandle = (value: any) => {
  console.log(value);
};
onMounted(async()=>{
  baseData.value = await fetch(`https://static.nio.com/fx-static/51/fixed/cascader-tree-data.prod.json?t=${Date.now()}`).then(r => r.json());
});
</script>
