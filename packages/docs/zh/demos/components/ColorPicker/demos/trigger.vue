<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="触发器类型">
      <n-radio-group v-model="type">
        <n-radio label="square">正方形</n-radio>
        <n-radio label="square-text">带色号</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>

  <n-color-picker v-model="value1" trigger-type="square" :square-text="squareText" :need-confirm="false" :clearable="false" @change="onChange" />
  <n-color-picker v-model="value1" trigger-type="square" :square-text="squareText" :need-confirm="false" :clearable="false" disabled />
  <n-color-picker v-model="value4" trigger-type="square" :square-text="squareText" :need-confirm="false" @change="onChange" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const type = ref('square');

const value1 = ref('#178CA6');
const value4 = ref();

const squareText = computed(() => type.value === 'square-text');

function onChange(color: string) {
  console.info('change:', color);
}
</script>

<style scoped>
p {
  margin-top: 10px;
}

.n-color-picker--square + .n-color-picker--square {
  margin-left: 16px;
}

.n-color-picker--input + .n-color-picker--input {
  margin-top: 12px;
}
</style>
