<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">自定义 select icon</div>
      <n-modal-select v-model="value1" :dropdown-icon="IconTriangleDownFilled" :to-body="false">
        <n-option label="中国" :value="1" />
        <n-option :value="2" label="美国" />
        <n-option :value="3" label="日本" />
      </n-modal-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">select icon 为空</div>
      <n-modal-select v-model="value2" :custom-select-icon="false" :to-body="false">
        <n-option label="中国" :value="1" />
        <n-option :value="2" label="美国" />
        <n-option :value="3" label="日本" />
      </n-modal-select>
    </n-col>
  </n-row>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import {IconTriangleDownFilled} from '@aurora/icon';

const value1 = ref();
const value2 = ref();
</script>
