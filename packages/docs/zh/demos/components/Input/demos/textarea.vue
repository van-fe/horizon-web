<template>
  <n-row>
    <n-col :span="12">
      <h6>普通</h6>
      <n-input v-model="val1" type="textarea" :rows="3" resize="none" />
    </n-col>
    <n-col :span="12">
      <h6>可拖拽</h6>
      <n-input v-model="val2" type="textarea" :rows="3" />
    </n-col>
    <n-col :span="12">
      <h6>自适应高度</h6>
      <n-input v-model="val3" :auto-size="true" type="textarea" />
    </n-col>
    <n-col :span="12">
      <h6>最大最小高度</h6>
      <n-input v-model="val4" :auto-size="{ minRows: 4, maxRows: 8 }" type="textarea" />
    </n-col>
    <n-col :span="12">
      <h6>最小高度</h6>
      <n-input v-model="val7" :auto-size="{ minRows: 2,maxRows:null }" type="textarea" />
    </n-col>
    <n-col :span="12">
      <h6>最大高度</h6>
      <n-input v-model="val8" :auto-size="{ maxRows: 6 }" type="textarea" />
    </n-col>
    <n-col :span="12">
      <h6>input-style为noborder</h6>
      <n-input v-model="val5" resize="none" type="textarea" input-style="no-border" />
    </n-col>
    <n-col :span="12">
      <h6>input-style为emphasize</h6>
      <n-input v-model="val6" resize="none" type="textarea" input-style="emphasize" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const val1 = ref('');
const val2 = ref('');
const val3 = ref('');
const val4 = ref('');
const val5 = ref('');
const val6 = ref('');
const val7 = ref('');
const val8 = ref('');
</script>
<style scoped>
h6 {
  font-size: 14px;
}
</style>
