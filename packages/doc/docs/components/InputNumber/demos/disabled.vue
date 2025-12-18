<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref(12);
const value3 = ref(12);
</script>

<template>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">默认（居右）</div>
      <n-input-number v-model="value" disabled />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">两侧</div>
      <n-input-number v-model="value2" controls-position="between" disabled />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">隐藏</div>
      <n-input-number v-model="value3" :controls="false" disabled />
    </n-col>
  </n-row>
</template>
