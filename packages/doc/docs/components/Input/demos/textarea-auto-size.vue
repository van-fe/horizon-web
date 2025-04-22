<template>
  <n-row>
    <n-col :span="24">
      <div class="demo-title">自适应高度</div>
      <n-input v-model="val1" :auto-size="true" type="textarea" />
    </n-col>
    <n-col :span="24">
      <div class="demo-title">最小高度</div>
      <n-input v-model="val2" :auto-size="{ minRows: 2, maxRows: undefined }" type="textarea" />
    </n-col>
    <n-col :span="24">
      <div class="demo-title">最大高度</div>
      <n-input v-model="val3" :auto-size="{ maxRows: 6 }" type="textarea" />
    </n-col>
    <n-col :span="24">
      <div class="demo-title">最大最小高度结合</div>
      <n-input v-model="val4" :auto-size="{ minRows: 4, maxRows: 8 }" type="textarea" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const val1 = ref('');
const val2 = ref('');
const val3 = ref('');
const val4 = ref('');
</script>
