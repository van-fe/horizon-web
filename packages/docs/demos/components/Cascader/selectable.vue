<template>
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <div class="demo-title">单选</div>
      <h-cascader
        v-model="currentVal1"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        :show-radio="true"
        @update:modelValue="updateHandle"
        @change="changeHandle"
      />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">多选</div>
      <h-cascader
        v-model="currentVal2"
        :clearable="true"
        :options="baseData"
        :multiple="true"
        :filterable="true"
        :use-filter-check-all="true"
        :to-body="false"
        :collapse-tags="true"
        @update:modelValue="updateHandle"
        @change="changeHandle"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { HCascaderExtendOption, HCascaderModelValueType } from '@aurora/horizon-web';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);

const changeHandle = (value: HCascaderModelValueType, option: HCascaderExtendOption) => {
  console.info('change: ', value, option);
};

const updateHandle = (value: HCascaderModelValueType) => {
  console.info('update: ', value);
};

onMounted(async () => {
  baseData.value = await fetch(new URL('/unselectable-options.json', import.meta.url).href).then(
    r => r.json(),
  );
});
</script>
