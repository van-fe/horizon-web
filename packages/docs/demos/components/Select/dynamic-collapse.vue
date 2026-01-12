<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-select
        v-model="values1"
        placeholder="请选择"
        :collapse="collapse"
        :multiple="true"
        :to-body="false"
        @focus="focusHandle"
        @blur="blurHandle"
      >
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const values1 = ref([]);
const collapse = ref(false);

const selectOptions = [
  { value: 1, label: '上海' },
  { value: 2, label: '北京' },
  { value: 3, label: '合肥' },
  { value: 4, label: '深圳' },
  { value: 5, label: '杭州' },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];

const focusHandle = () => {
  console.info('focus');
  collapse.value = false;
};

const blurHandle = () => {
  console.info('blur');
  collapse.value = true;
};
</script>
