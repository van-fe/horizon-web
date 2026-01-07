<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">自定义 select icon</div>
      <h-select v-model="value1" :dropdowh-icon="IconTriangleDownFilled" :to-body="false">
        <h-option label="中国" :value="1" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">select icon 为空</div>
      <h-select v-model="value2" :custom-select-icon="false" :to-body="false">
        <h-option label="中国" :value="1" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import {IconTriangleDownFilled} from '@aurora/icon';

const value1 = ref();
const value2 = ref();
</script>
