<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="勾选父级是否不展开子集">
      <h-switch v-model="expandStrictly" status />
    </h-form-item>
  </h-form>
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <div class="demo-title">单选</div>
      <h-cascader
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
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">多选</div>
      <h-cascader
        v-model="currentVal2"
        :check-strictly="true"
        :expand-strictly="expandStrictly"
        :clearable="true"
        :options="baseData"
        :multiple="true"
        :to-body="false"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);
const expandStrictly = ref(true);

const changeHandle = (value: any) => {
  console.info(value);
};
onMounted(async()=>{
  baseData.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r => r.json());
});
</script>
