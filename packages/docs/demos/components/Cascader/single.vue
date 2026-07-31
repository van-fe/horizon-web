<template>
  <h-form :inline="true" label-position="top">
    <h-form-item label="可选任意节点">
      <h-switch v-model="checkStrictly" status />
    </h-form-item>
  </h-form>
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <div class="demo-title">无Radio（默认）</div>
      <h-cascader
        v-model="currentVal1"
        :show-radio="false"
        :check-strictly="checkStrictly"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        @change="handleChange"
      />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">有Radio</div>
      <h-cascader
        v-model="currentVal2"
        :show-radio="true"
        :check-strictly="checkStrictly"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        @change="handleChange"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { HCascaderExtendOption } from '@aurora/horizon-web';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[]>([]);
const baseData = ref([]);
const checkStrictly = ref(true);

function handleChange(selectOrDeselect?: boolean | undefined, option?: HCascaderExtendOption | undefined) {
  console.info(selectOrDeselect, option);
}

onMounted(async()=>{
  baseData.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r => r.json());
});
</script>
