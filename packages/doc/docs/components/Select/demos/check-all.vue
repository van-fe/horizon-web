<template>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">普通全选</div>
      <h-select
        v-model="value1"
        :multiple="true"
        :use-check-all="true"
        :filterable="true"
        :to-body="false"
        :clearable="true"
        :collapse-tags="true"
        :collapse-tags-tooltip="true"
      >
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">全选后标记为“全部”</div>
      <h-select
        v-model="value2"
        :multiple="true"
        :use-check-all="true"
        :use-check-all-summary="true"
        :to-body="false"
        :clearable="true"
        :collapse-tags="true"
        :collapse-tags-tooltip="true"
      >
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">全选后自定义标记为“全部选择”</div>
      <h-select
        v-model="value3"
        :multiple="true"
        :use-check-all="true"
        :use-check-all-summary="true"
        check-all-summary-text="全部选择"
        :to-body="false"
        :clearable="true"
        :collapse-tags="true"
        :collapse-tags-tooltip="true"
      >
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </h-select>
    </h-col>
  </h-row>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">存在禁用选项的全选</div>
      <h-select
        v-model="value4"
        :multiple="true"
        :use-check-all="true"
        :filterable="true"
        :to-body="false"
        :clearable="true"
        :collapse-tags="true"
        :collapse-tags-tooltip="true"
      >
        <h-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" :disabled="item.value % 2 === 0" />
      </h-select>
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">统计已选择的数量</div>
      <h-select
        v-model="value5"
        :multiple="true"
        :use-check-all="true"
        :use-check-all-summary="true"
        check-all-summary-text="全部选择"
        :use-check-all-count="true"
        :to-body="false"
        :clearable="true"
        :collapse-tags="true"
        :collapse-tags-tooltip="true"
        :filterable="true"
        :options="selectOptions"
      />
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">统计已选择的数量（不考虑过滤）</div>
      <h-select
        v-model="value6"
        :multiple="true"
        :use-check-all="true"
        :use-check-all-summary="true"
        check-all-summary-text="全部选择"
        :use-check-all-count="true"
        :check-all-count-consider-filter="false"
        :to-body="false"
        :clearable="true"
        :collapse-tags="true"
        :collapse-tags-tooltip="true"
        :filterable="true"
        :options="selectOptions"
      />
    </h-col>
  </h-row>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref([]);
const value2 = ref([]);
const value3 = ref([]);
const value4 = ref([]);
const value5 = ref([]);
const value6 = ref([]);

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
