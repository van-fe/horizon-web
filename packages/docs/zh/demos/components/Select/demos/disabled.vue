<template>
  <div>
    <n-row>
      <n-col :span="6">
        <div class="demo-title">
          单选: 整体禁用
        </div>
        <n-select
            v-model="value1"
            :clearable="true"
            placeholder="请选择"
            :disabled="true"
            :to-body="false"
            @change="changeHandle"
        >
          <n-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.value === 2"
          />
        </n-select>
      </n-col>
      <n-col :span="6">
        <div class="demo-title">
          单选: 选项禁用
        </div>
        <n-select
            v-model="value2"
            :clearable="true"
            placeholder="请选择"
            :to-body="false"
            @change="changeHandle"
        >
          <n-option
              v-for="item in selectOptionsHasDisabled"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
          />
        </n-select>
      </n-col>
      <n-col :span="6">
        <div class="demo-title">
          单选: 选项组禁用
        </div>
        <n-select
            v-model="value3"
            :clearable="true"
            placeholder="请选择"
            :to-body="false"
            @change="changeHandle"
        >
          <n-option-group
            v-for="(group, index) in selectOptionGroupsHasDisabled"
            :key="index"
            :label="group.label"
            :disabled="group.disabled"
          >
            <n-option
              v-for="item in group.children"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </n-option-group>
        </n-select>
      </n-col>
    </n-row>
    <n-row>
      <n-col :span="6">
        <div class="demo-title">
          多选: 整体禁用
        </div>
        <n-select
            v-model="values1"
            :multiple="true"
            :clearable="true"
            placeholder="请选择"
            :disabled="true"
            :collapse="true"
            :to-body="false"
            @change="changeHandle"
        >
          <n-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </n-select>
      </n-col>
      <n-col :span="6">
        <div class="demo-title">
          多选: 选项禁用
        </div>
        <n-select
            v-model="values2"
            :multiple="true"
            :clearable="true"
            placeholder="请选择"
            :collapse="true"
            :to-body="false"
            @change="changeHandle"
        >
          <n-option
              v-for="item in selectOptionsHasDisabled"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
          />
        </n-select>
      </n-col>
      <n-col :span="6">
        <div class="demo-title">
          多选: 选项组禁用
        </div>
        <n-select
            v-model="values3"
            :multiple="true"
            :clearable="true"
            placeholder="请选择"
            :collapse="true"
            :to-body="false"
            @change="changeHandle"
        >
          <n-option-group
              v-for="(group, index) in selectOptionGroupsHasDisabled"
              :key="index"
              :label="group.label"
              :disabled="group.disabled"
          >
            <n-option
              v-for="item in group.children"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </n-option-group>
        </n-select>
      </n-col>
    </n-row>
  </div>
</template>

<script lang="ts" setup>
import { ExtractPropTypes, ref } from 'vue';
import { useOptionProps, useOptionGroupProps } from '@aurora/horizon-web';

const value1 = ref(1);
const value2 = ref(1);
const value3 = ref(1);
const values1 = ref([1]);
const values2 = ref([1]);
const values3 = ref([1]);

const selectOptions: ExtractPropTypes<useOptionProps>[] = [
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

const selectOptionsHasDisabled: ExtractPropTypes<useOptionProps>[] = [
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

const selectOptionGroupsHasDisabled: Array<ExtractPropTypes<useOptionGroupProps> & {children: ExtractPropTypes<useOptionProps>[]}> = [
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

const changeHandle = () => {
  console.info(value1.value);
};
</script>

<style scoped>
</style>
