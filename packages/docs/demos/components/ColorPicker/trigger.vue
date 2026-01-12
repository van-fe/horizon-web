<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="触发器类型">
      <h-radio-group v-model="type">
        <h-radio label="square">正方形</h-radio>
        <h-radio label="square-text">带色号</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>

  <h-color-picker v-model="value1" trigger-type="square" :square-text="squareText" :need-confirm="false" :clearable="false" @change="onChange" />
  <h-color-picker v-model="value1" trigger-type="square" :square-text="squareText" :need-confirm="false" :clearable="false" disabled />
  <h-color-picker v-model="value4" trigger-type="square" :square-text="squareText" :need-confirm="false" @change="onChange" />
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

.h-color-picker--square + .h-color-picker--square {
  margin-left: 16px;
}

.h-color-picker--input + .h-color-picker--input {
  margin-top: 12px;
}
</style>
