<template>
  <h-form label-position="left" label-width="160px" label-vertical-align="middle" class="grid-form">
    <h-form-item label="带渐变设置">
      <h-color-picker
        v-model="value1"
        trigger-type="square"
        :enable-gradient="true"
        :editable="true"
        :alpha="true"
        :need-confirm="false"
        :clearable="false"
      />
    </h-form-item>
    <h-form-item label="只有一种渐变">
      <h-color-picker
        v-model="value2"
        trigger-type="square"
        :enable-gradient="true"
        :gradient-list="['linear']"
        :editable="true"
        :alpha="true"
      />
    </h-form-item>
    <h-form-item label="带系统预设颜色">
      <h-color-picker v-model="value3" trigger-type="square" editable alpha show-swatch :swatches="swatches" :need-confirm="false" :clearable="false" />
    </h-form-item>
    <h-form-item label="带取消/确认按钮">
      <h-color-picker v-model="value4" trigger-type="square" editable alpha :clearable="false" />
    </h-form-item>
    <h-form-item label="带最近使用颜色">
      <h-color-picker v-model="value5" trigger-type="square" editable alpha recently-colors :need-confirm="false" :clearable="false" />
    </h-form-item>
    <h-form-item label="带清空按钮">
      <h-color-picker v-model="value6" trigger-type="square" editable alpha :need-confirm="false" />
    </h-form-item>
    <h-form-item label="带自定义预设颜色">
      <h-color-picker v-model="value7" trigger-type="square" editable alpha :need-confirm="false" :clearable="false" :custom-colors="true" />
    </h-form-item>
    <h-form-item label="带取消/确认+清空按钮">
      <h-color-picker v-model="value8" trigger-type="square" editable alpha  />
    </h-form-item>
    <h-form-item label="带网页取色">
      <h-color-picker v-model="value9" trigger-type="square" :enable-eye-dropper="true" editable alpha />
    </h-form-item>
    <h-form-item label="默认显示 RGB">
      <h-color-picker v-model="value10" v-model:edit-mode="editMode" trigger-type="square" :enable-eye-dropper="true" editable alpha />
    </h-form-item>
    <h-form-item label="联合使用">
      <h-color-picker
        v-model="value11"
        trigger-type="square"
        :enable-gradient="true"
        :editable="true"
        :alpha="true"
        :show-swatch="true"
        :swatches="swatches"
        :recently-colors="true"
        :custom-colors="true"
      />
    </h-form-item>
  </h-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('#178CA6');
const value2 = ref('linear-gradient(90deg, #45D0E2FF 0%, #FE0000FF 60.60606060606061%, #000000FF 100%)');
const value3 = ref('#178CA6');
const value4 = ref('#178CA6');
const value5 = ref('#178CA6');
const value6 = ref('#178CA6');
const value7 = ref('#178CA6');
const value8 = ref('#178CA6');
const value9 = ref('#178CA6');
const value10 = ref('#178CA6');
const value11 = ref('#178CA6');

const swatches = [
  '#178CA6',
  '#0BA1D6',
  '#26BD4B',
  '#FDA71C',
  '#E83030',
  '#178CA6',
  '#0BA1D6',
  '#26BD4B',
  '#FDA71C',
  '#E83030',
];

const editMode = ref('rgb');
</script>

<style scoped>
.grid-form {
  display: grid;
  grid-template-columns: repeat(2, mih-content);
  grid-column-gap: 80px;
}
</style>
