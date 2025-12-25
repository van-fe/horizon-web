<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
        <n-radio label="large" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="inputStyle">
      <n-radio-group v-model="inputStyle">
        <n-radio label="normal" />
        <n-radio label="no-border" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="disabled">
      <n-radio-group v-model="disabled">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="filterable">
      <n-radio-group v-model="filterable">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>

  <n-row>
    <n-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">基础单选</div>
      <n-modal-select
        v-model="value1"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        :to-body="false"
        :filterable="filterable"
        :clearable="true"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      >
        <n-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </n-modal-select>
    </n-col>
    <n-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">基础多选</div>
      <n-modal-select
        v-model="value2"
        :multiple="true"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        :filterable="filterable"
        :clearable="true"
        :fit-input-width="false"
        :to-body="false"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      >
        <n-option v-for="item of selectOptions" :key="item.value" :value="item.value" :label="item.label" />
      </n-modal-select>
    </n-col>
  </n-row>

</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { useOptionProps } from '@aurora/horizon-web';

const size = ref('medium');
const inputStyle = ref('normal');
const disabled = ref(false);
const filterable = ref(false);

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

function onChange(inp: string, opts: ExtractPropTypes<typeof useOptionProps>[]) {
  console.info(inp, opts);
}

function onFocus() {
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}
</script>
