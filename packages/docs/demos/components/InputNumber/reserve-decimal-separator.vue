<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(null);
const value2 = ref(null);
</script>

<template>
  <h-row :gutter="12">
    <h-col :span="8">
      <div class="demo-title">默认模式</div>
      <h-input-number v-model="value1" :precision="4" />
    </h-col>
    <h-col :span="8">
      <div class="demo-title">字符串模式</div>
      <h-input-number v-model="value2" :precision="4" :string-mode="true" />
    </h-col>
  </h-row>
</template>
