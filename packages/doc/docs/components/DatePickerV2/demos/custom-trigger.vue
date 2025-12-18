<template>
  <n-row align="middle">
    <n-col :span="12">
      <n-date-picker v-model="value" type="datetime" show-now>
        <template #pickerOuter>
          <n-button plain>Pick datetime: {{ value }}</n-button>
        </template>
      </n-date-picker>
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="12">
      <n-date-picker v-model="rangeValue" type="datetimeRange" show-now>
        <template #pickerOuter>
          <n-button plain>Pick datetimeRange: {{ rangeValue }}</n-button>
        </template>
      </n-date-picker>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
</script>
