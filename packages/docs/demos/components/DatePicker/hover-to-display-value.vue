<template>
  <h-form>
    <h-form-item label="hover to display value">
      <h-radio-group v-model="hoverToDisplayValue">
        <h-radio :value="true">True</h-radio>
        <h-radio :value="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-date-picker v-model="value" type="date" :hover-to-display-value="hoverToDisplayValue" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="values" type="dateRange" :hover-to-display-value="hoverToDisplayValue" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-date-picker v-model="value2" type="dateMinutes" :hover-to-display-value="hoverToDisplayValue" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h-date-picker v-model="values2" type="dateMinutesRange" :hover-to-display-value="hoverToDisplayValue" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
const values = ref();
const values2 = ref();
const hoverToDisplayValue = ref(true);
</script>
