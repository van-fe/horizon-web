<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(null);
const value2 = ref(null);
</script>

<template>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">默认模式</div>
      <n-input-number v-model="value1" :precision="4" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">字符串模式</div>
      <n-input-number v-model="value2" :precision="4" :string-mode="true" />
    </n-col>
  </n-row>
</template>
