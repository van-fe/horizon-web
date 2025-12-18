<template>
  <n-form label-position="left" label-width="fit-content">
    <n-form-item label="size">
      <n-radio-group v-model="sizeValue">
        <n-radio value="large" label="large" />
        <n-radio value="medium" label="medium" />
        <n-radio value="small" label="small" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="input style">
      <n-radio-group v-model="inputStyle">
        <n-radio value="normal" label="normal" />
        <n-radio value="emphasize" label="emphasize" />
        <n-radio value="no-border" label="no-border" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="disabled">
      <n-radio-group v-model="disabled">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="check-strictly">
      <n-radio-group v-model="checkStrictly">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-cascader
        ref="cascaderDomRef1"
        v-model="currentVal1"
        :clearable="true"
        :size="sizeValue"
        :to-body="false"
        :input-style="inputStyle"
        :check-strictly="checkStrictly"
        :options="baseData"
        :disabled="disabled"
        @update:modelValue="updateHandle"
        @input="inputHandle"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-cascader
        ref="cascaderDomRef2"
        v-model="currentVal2"
        :clearable="true"
        :size="sizeValue"
        :input-style="inputStyle"
        :check-strictly="checkStrictly"
        :options="baseData"
        :multiple="true"
        :to-body="false"
        :disabled="disabled"
        @update:modelValue="updateHandle"
        @input="inputHandle"
        @change="changeHandle"
        @focus="onFocus"
        @blur="onBlur"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, onMounted, ref } from 'vue';
import { CascaderExposes, NCascader, useCascaderProps } from '@aurora/horizon-web';
import type { NCascaderExtendOption, NCascaderModelValueType } from '@aurora/horizon-web';
import { LegoComponentInstance } from '@aurora/utils';

const cascaderDomRef1 = ref<LegoComponentInstance<typeof NCascader, CascaderExposes>>();
const cascaderDomRef2 = ref<LegoComponentInstance<typeof NCascader, CascaderExposes>>();

const currentVal1 = ref<string[]>(["guide", "navigation", "side nav"]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);

const sizeValue = ref<Required<ExtractPropTypes<typeof useCascaderProps>['size']>>('medium');
const inputStyle = ref<Required<ExtractPropTypes<typeof useCascaderProps>['inputStyle']>>('normal');
const disabled = ref(false);
const checkStrictly = ref(false);

const changeHandle = (value: NCascaderModelValueType, option: NCascaderExtendOption) => {
  console.log('change: ', value, option);
};

const inputHandle = (value: string) => {
  console.log('input: ', value);
};

const updateHandle = (value: NCascaderModelValueType) => {
  console.log('update: ', value);
};

function onFocus() {
  console.log('focus');
}

function onBlur() {
  console.log('blur');
}

onMounted(async()=>{
  baseData.value = await fetch(`https://static.nio.com/fx-static/51/fixed/cascader-tree-data.prod.json?t=${Date.now()}`).then(r => r.json());
  currentVal2.value.push(["guide", "navigation", "side nav"]);

  console.log(cascaderDomRef1.value, cascaderDomRef2.value);
});
</script>
