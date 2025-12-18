<template>
  <n-row>
    <n-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">基础单选</div>
      <n-select
        v-model="value1"
        :show-popover-content-only="true"
      >
        <n-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </n-select>
    </n-col>
    <n-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">基础多选</div>
      <n-select
        v-model="value2"
        :multiple="true"
        :show-popover-content-only="true"
      >
        <n-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </n-select>
    </n-col>
  </n-row>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(9);
const value2 = ref();

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
</script>
