<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
</script>

<template>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">large</div>
      <n-input-number v-model="value" size="large" clearable />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">medium (default)</div>
      <n-input-number v-model="value" clearable />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">small</div>
      <n-input-number v-model="value" size="small" clearable />
    </n-col>
  </n-row>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">默认</div>
      <n-input-number v-model="value" clearable />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">控制器位于两侧</div>
      <n-input-number v-model="value" controls-position="between" clearable />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">控制器隐藏</div>
      <n-input-number v-model="value" :controls="false" clearable />
    </n-col>
  </n-row>
</template>
