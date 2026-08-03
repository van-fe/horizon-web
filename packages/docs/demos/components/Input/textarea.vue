<template>
  <h-grid :gap="12">
    <h-grid-item :span="12">
      <h6>普通</h6>
      <h-input v-model="val1" type="textarea" :rows="3" resize="none" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h6>可拖拽</h6>
      <h-input v-model="val2" type="textarea" :rows="3" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h6>自适应高度</h6>
      <h-input v-model="val3" :auto-size="true" type="textarea" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h6>最大最小高度</h6>
      <h-input v-model="val4" :auto-size="{ minRows: 4, maxRows: 8 }" type="textarea" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h6>最小高度</h6>
      <h-input v-model="val7" :auto-size="{ minRows: 2,maxRows:null }" type="textarea" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h6>最大高度</h6>
      <h-input v-model="val8" :auto-size="{ maxRows: 6 }" type="textarea" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h6>input-style为noborder</h6>
      <h-input v-model="val5" resize="none" type="textarea" input-style="no-border" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h6>input-style为emphasize</h6>
      <h-input v-model="val6" resize="none" type="textarea" input-style="emphasize" />
    </h-grid-item>
  </h-grid>
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
