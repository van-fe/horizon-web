<template>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="demo-title">默认</div>
      <n-input-number v-model="value" enable-lang-press />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">两侧（设置了步长）</div>
      <n-input-number v-model="value" enable-lang-press controls-position="between" :step="5" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);
</script>
