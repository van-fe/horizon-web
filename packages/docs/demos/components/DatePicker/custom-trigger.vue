<template>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="12">
      <h-date-picker v-model="value" type="datetime" show-now>
        <template #pickerOuter>
          <h-button plain>Pick datetime: {{ value }}</h-button>
        </template>
      </h-date-picker>
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="12">
      <h-date-picker v-model="rangeValue" type="datetimeRange" show-now>
        <template #pickerOuter>
          <h-button plain>Pick datetimeRange: {{ rangeValue }}</h-button>
        </template>
      </h-date-picker>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
</script>
