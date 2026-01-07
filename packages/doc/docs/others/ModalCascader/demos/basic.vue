<template>
  <h-form label-position="left" label-width="fit-content">
    <h-form-item label="size">
      <h-radio-group v-model="sizeValue">
        <h-radio value="small" label="small" />
        <h-radio value="medium" label="medium" />
        <h-radio value="large" label="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="input style">
      <h-radio-group v-model="inputStyle">
        <h-radio value="normal" label="normal" />
        <h-radio value="no-border" label="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="check-strictly">
      <h-radio-group v-model="checkStrictly">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-modal-cascader
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
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-modal-cascader
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
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CascaderExposes, CascaderProps, HCascader } from '@aurora/horizon-web';
import type { HCascaderExtendOption, HCascaderModelValueType } from '@aurora/horizon-web';
import { HorizonWebComponentInstance } from '@aurora/utils';

const cascaderDomRef1 = ref<HorizonWebComponentInstance<typeof HCascader, CascaderExposes>>();
const cascaderDomRef2 = ref<HorizonWebComponentInstance<typeof HCascader, CascaderExposes>>();

const currentVal1 = ref<string[]>(["guide", "navigation", "side nav"]);
const currentVal2 = ref<string[][]>([]);
const baseData = ref([]);

const sizeValue = ref<NonNullable<CascaderProps['size']>>('medium');
const inputStyle = ref<NonNullable<CascaderProps['inputStyle']>>('normal');
const disabled = ref(false);
const checkStrictly = ref(false);

const changeHandle = (selectOrDeselect: boolean | undefined, option?: HCascaderExtendOption) => {
  console.info('change: ', selectOrDeselect, option);
};

const inputHandle = (value: string) => {
  console.info('input: ', value);
};

const updateHandle = (value: HCascaderModelValueType) => {
  console.info('update: ', value);
};

function onFocus() {
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}

onMounted(async()=>{
  baseData.value = await fetch(`https://static.nio.com/fx-static/horizon-web/clzuyi8za019o086o9mtt36gn/tree-data-level-not-equal.json?t=12`).then(r => r.json());
  currentVal2.value.push(["guide", "navigation", "side nav"]);

  console.info(cascaderDomRef1.value, cascaderDomRef2.value);
});
</script>
