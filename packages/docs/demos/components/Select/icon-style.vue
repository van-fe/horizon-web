<template>
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <div class="demo-title">自定义 select icon</div>
      <h-select v-model="value1" :dropdown-icon="IconTriangleDownFilled" :to-body="false">
        <h-option label="中国" :value="1" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
    </h-grid-item>

    <h-grid-item :span="6">
      <div class="demo-title">select icon 为空</div>
      <h-select v-model="value2" :dropdown-icon="false" :to-body="false">
        <h-option label="中国" :value="1" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { IconTriangleDownFilled } from '@aurora/icon';

const value1 = ref();
const value2 = ref();
</script>
