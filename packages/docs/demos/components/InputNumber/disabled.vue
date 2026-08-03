<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref(12);
const value3 = ref(12);
</script>

<template>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">默认（居右）</div>
      <h-input-number v-model="value" disabled />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">两侧</div>
      <h-input-number v-model="value2" controls-position="between" disabled />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">隐藏</div>
      <h-input-number v-model="value3" :controls="false" disabled />
    </h-grid-item>
  </h-grid>
</template>
