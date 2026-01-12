<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选-允许创建 <h-tooltip content="拦截创建【南京】"><IconHelp /></h-tooltip></div>
      <h-select v-model="value1" allow-create :before-create="beforeCreate" :to-body="false" @input="onInput">
        <h-option value="1" label="上海" />
        <h-option value="2" label="北京" />
        <h-option value="3" label="合肥" name="hefei" />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选-允许创建</div>
      <h-select v-model="values1" allow-create multiple :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选-带创建选项长度超长</div>
      <h-select v-model="values2" allow-create multiple :to-body="false">
        <h-option label="齐齐哈尔" :value="1" />
        <h-option :value="2" label="那然色布斯台音布拉格" />
        <h-option label="上海" :value="3" />
        <h-option :value="4" label="北京" />
        <h-option :value="5" label="合肥" name="hefei" />
        <h-option
          :value="6"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconHelp } from '@aurora/icon';

const value1 = ref();
const values1 = ref([]);
const values2 = ref([]);

const beforeCreate = (value: string, optionMap: Map<any, any>) => {
  console.info(value);
  console.info(optionMap);

  if (optionMap.get(value) || value === '南京') return false;
};

function onInput(val) {
  console.info('input:', val);
}
</script>

<style scoped>
</style>
