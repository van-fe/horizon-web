<template>
  <n-form>
    <n-form-item label="hover to display value">
      <n-radio-group v-model="hoverToDisplayValue">
        <n-radio :value="true">True</n-radio>
        <n-radio :value="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value" type="date" :hover-to-display-value="hoverToDisplayValue" />
    </n-col>
    <n-col :span="6">
      <n-date-picker-v2 v-model="values" type="dateRange" :hover-to-display-value="hoverToDisplayValue" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value2" type="dateMinutes" :hover-to-display-value="hoverToDisplayValue" />
    </n-col>
    <n-col :span="12">
      <n-date-picker-v2 v-model="values2" type="dateMinutesRange" :hover-to-display-value="hoverToDisplayValue" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
const values = ref();
const values2 = ref();
const hoverToDisplayValue = ref(true);
</script>
