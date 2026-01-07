<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选: 不具名分组</div>
      <h-modal-select v-model="value1" clearable :to-body="false" filterable>
        <template v-for="(group, index) of selectOptionGroupsMixins">
          <h-option-group
            v-if="group.children"
            :key="index"
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
          <h-option
            v-else
            :key="`option_${index}`"
            :label="group.label"
            :value="group.value"
            :disabled="group.disabled"
          />
        </template>
      </h-modal-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">单选: 不具名分组</div>
      <h-modal-select v-model="value2" clearable :to-body="false" filterable>
        <h-option-group
          v-for="(group, index) in selectOptionGroupsNoLabel"
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
      </h-modal-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">单选: 具名分组</div>
      <h-modal-select v-model="value3" clearable :to-body="false" filterable>
        <h-option-group
          v-for="(group, index) in selectOptionGroupsHasLabel"
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
      </h-modal-select>
    </h-col>
  </h-row>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">多选: 不具名分组</div>
      <h-modal-select v-model="values1" clearable multiple :to-body="false" filterable>
        <template v-for="(group, index) of selectOptionGroupsMixins">
          <h-option-group
            v-if="group.children"
            :key="index"
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
          <h-option
            v-else
            :key="`option_${index}`"
            :label="group.label"
            :value="group.value"
            :disabled="group.disabled"
          />
        </template>
      </h-modal-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选: 不具名分组</div>
      <h-modal-select v-model="values2" clearable multiple :to-body="false" filterable>
        <h-option-group
          v-for="(group, index) in selectOptionGroupsNoLabel"
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
      </h-modal-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选: 具名分组</div>
      <h-modal-select v-model="values3" clearable multiple :to-body="false" filterable>
        <h-option-group
          v-for="(group, index) in selectOptionGroupsHasLabel"
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
      </h-modal-select>
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ExtractPropTypes, ref } from 'vue';
import { useOptionGroupProps, useOptionProps } from '@aurora/horizon-web';

const value1 = ref();
const value2 = ref();
const value3 = ref();
const values1 = ref([]);
const values2 = ref([]);
const values3 = ref([]);

const selectOptionGroupsHasLabel: Array<Partial<ExtractPropTypes<typeof useOptionGroupProps>> & {children: Partial<ExtractPropTypes<typeof useOptionProps>>[]}> = [
  {
    label: '第一批',
    children: [
      { value: 1, label: '上海' },
      { value: 2, label: '北京' },
      { value: 3, label: '合肥' },
      { value: 4, label: '深圳' },
      { value: 5, label: '杭州' },
    ]},
  {
    label: '第二批',
    children: [
      { value: 6, label: '天津' },
      { value: 7, label: '西安' },
      { value: 8, label: '南京' },
      { value: 9, label: '哈尔滨' },
      { value: 10, label: '香港' },
    ]},
];

const selectOptionGroupsNoLabel: Array<Partial<ExtractPropTypes<typeof useOptionGroupProps>> & {children: Partial<ExtractPropTypes<typeof useOptionProps>>[]}> = [
  {
    children: [
      { value: 1, label: '上海' },
      { value: 2, label: '北京' },
      { value: 3, label: '合肥' },
      { value: 4, label: '深圳' },
      { value: 5, label: '杭州' },
    ]},
  {
    children: [
      { value: 6, label: '天津' },
      { value: 7, label: '西安' },
      { value: 8, label: '南京' },
      { value: 9, label: '哈尔滨' },
      { value: 10, label: '香港' },
    ]},
];

const selectOptionGroupsMixins: Array<(Partial<ExtractPropTypes<typeof useOptionGroupProps> | ExtractPropTypes<typeof useOptionProps>>) & {children?: Partial<ExtractPropTypes<typeof useOptionProps>>[]}> = [
  {
    label: '第一批',
    children: [
      { value: 1, label: '上海' },
      { value: 2, label: '北京' },
      { value: 3, label: '合肥' },
      { value: 4, label: '深圳' },
      { value: 5, label: '杭州' },
    ],
  },
  { value: 6, label: '天津' },
  { value: 7, label: '西安' },
  { value: 8, label: '南京' },
  { value: 9, label: '哈尔滨' },
  { value: 10, label: '香港' },
];
</script>
