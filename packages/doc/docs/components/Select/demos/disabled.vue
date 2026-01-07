<template>
  <div>
    <h-row>
      <h-col :span="6">
        <div class="demo-title">
          单选: 整体禁用
        </div>
        <h-select
            v-model="value1"
            :clearable="true"
            placeholder="请选择"
            :disabled="true"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.value === 2"
          />
        </h-select>
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          单选: 选项禁用
        </div>
        <h-select
            v-model="value2"
            :clearable="true"
            placeholder="请选择"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option
              v-for="item in selectOptionsHasDisabled"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
          />
        </h-select>
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          单选: 选项组禁用
        </div>
        <h-select
            v-model="value3"
            :clearable="true"
            placeholder="请选择"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option-group
            v-for="(group, index) in selectOptionGroupsHasDisabled"
            :key="index"
            :label="group.label"
            :disabled="group.disabled"
          >
            <h-option
              v-for="item in group.children"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </h-option-group>
        </h-select>
      </h-col>
    </h-row>
    <h-row>
      <h-col :span="6">
        <div class="demo-title">
          多选: 整体禁用
        </div>
        <h-select
            v-model="values1"
            :multiple="true"
            :clearable="true"
            placeholder="请选择"
            :disabled="true"
            :collapse="true"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </h-select>
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          多选: 选项禁用
        </div>
        <h-select
            v-model="values2"
            :multiple="true"
            :clearable="true"
            placeholder="请选择"
            :collapse="true"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option
              v-for="item in selectOptionsHasDisabled"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
          />
        </h-select>
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          多选: 选项组禁用
        </div>
        <h-select
            v-model="values3"
            :multiple="true"
            :clearable="true"
            placeholder="请选择"
            :collapse="true"
            :to-body="false"
            @change="changeHandle"
        >
          <h-option-group
              v-for="(group, index) in selectOptionGroupsHasDisabled"
              :key="index"
              :label="group.label"
              :disabled="group.disabled"
          >
            <h-option
              v-for="item in group.children"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </h-option-group>
        </h-select>
      </h-col>
    </h-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { OptionProps, OptionGroupProps } from '@aurora/horizon-web';
import type { ModelValueType } from '@aurora/horizon-web/es/components/Select/src/utils/types';

const value1 = ref(1);
const value2 = ref(1);
const value3 = ref(1);
const values1 = ref([1]);
const values2 = ref([1]);
const values3 = ref([1]);

const selectOptions: OptionProps[] = [
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

const selectOptionsHasDisabled: OptionProps[] = [
  { value: 1, label: '上海', disabled: true },
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

const selectOptionGroupsHasDisabled: Array<OptionGroupProps & {children: OptionProps[]}> = [
  {
    disabled: true,
    children: [
      { value: 1, label: '上海', disabled: true },
      { value: 2, label: '北京' },
      { value: 3, label: '合肥' },
      { value: 4, label: '深圳' },
      { value: 5, label: '杭州' },
    ]},
  {
    disabled: false,
    children: [
      { value: 6, label: '天津' },
      { value: 7, label: '西安' },
      { value: 8, label: '南京' },
      { value: 9, label: '哈尔滨' },
      { value: 10, label: '香港' },
    ]},
];

const changeHandle = (inputVal: null | undefined | string, opts: ModelValueType) => {
  console.info('change:', inputVal, opts);
};
</script>

<style scoped>
</style>
