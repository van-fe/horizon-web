<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(1.255);
const value2 = ref(1.255);
</script>

<template>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">普通四舍五入 (default)</div>
      <h-input-number v-model="value1" :precision="2" />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">银行家舍入法</div>
      <h-input-number v-model="value2" :precision="2" precision-type="bankers" />
    </h-grid-item>
  </h-grid>
</template>
