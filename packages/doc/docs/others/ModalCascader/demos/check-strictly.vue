<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="可选任意节点">
      <h-switch v-model="checkStrictly" status />
    </h-form-item>
  </h-form>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-modal-cascader
        v-model="currentVal1"
        :check-strictly="checkStrictly"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        @input="changeHandle"
        @change="changeHandle"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-modal-cascader
        v-model="currentVal2"
        :check-strictly="checkStrictly"
        :clearable="true"
        :options="baseData"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);
const checkStrictly = ref(true);

const changeHandle = (value: any) => {
  console.info(value);
};
onMounted(async()=>{
  baseData.value = await fetch(`https://static.nio.com/fx-static/51/fixed/cascader-tree-data.prod.json?t=${Date.now()}`).then(r => r.json());
});
</script>

<style scoped>
</style>
