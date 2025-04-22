<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(100000);
const value2 = ref(100000);
const precision = ref(2);
</script>

<template>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">精度</div>
      <n-input-number v-model="precision" :min="0" :max="4" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">默认模式</div>
      <n-input-number v-model="value1" :step="0.01" :max="9999.99" :precision="precision" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">字符串模式</div>
      <n-input-number v-model="value2" :step="0.01" :max="9999.99" :precision="precision" :string-mode="true" />
    </n-col>
  </n-row>
</template>
