<template>
  <h-row align="middle">
    <h-col :span="12">
      <h-date-picker v-model="value" type="datetime" show-now>
        <template #pickerOuter>
          <h-button plain>Pick datetime: {{ value }}</h-button>
        </template>
      </h-date-picker>
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="12">
      <h-date-picker v-model="rangeValue" type="datetimeRange" show-now>
        <template #pickerOuter>
          <h-button plain>Pick datetimeRange: {{ rangeValue }}</h-button>
        </template>
      </h-date-picker>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
</script>
