<template>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">普通多选</div>
      <h-select v-model="values1" :multiple="true" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">折叠多选</div>
      <h-select v-model="values2" :multiple="true" :collapse-tags="true" :to-body="false">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">+N 显示其余已选项</div>
      <h-select v-model="values3" :multiple="true" :to-body="false" :collapse-tags="true" :collapse-tags-tooltip="true">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">强制显示3个已选项，其余折叠</div>
      <h-select v-model="values4" :multiple="true" :to-body="false" :collapse-tags="true" :collapse-tags-tooltip="true" :max-collapse-tags="3">
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
  </h-row>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const values1 = ref<number[]>([1, 2, 9, 3, 4]);
const values2 = ref<number[]>([1, 2, 9, 3, 4]);
const values3 = ref<number[]>([1, 2, 9, 3, 4]);
const values4 = ref<number[]>([1, 2, 9, 3, 4]);

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
