<template>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Date:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value" show-now default-time="00:00" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="values" type="dateRange" show-now default-time="00:00" />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Datetime:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value2" type="dateSeconds" show-now default-time="00:00" need-confirm />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="values2" type="dateSecondsRange" show-now need-confirm />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="4">
      Custom:
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker ref="datePickerRef" v-model="value3">
        <template #showNow>
          <h-button size="small" plain @click="setSingleDate">Tomorrow</h-button>
        </template>
      </h-date-picker>
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker ref="datePickerRef2" v-model="values3" type="datetimeRange">
        <template #showNow>
          <h-button size="small" plain @click="setRangeDate">Five minute later</h-button>
        </template>
      </h-date-picker>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const value = ref();
const value2 = ref();
const value3 = ref();
const values = ref();
const values2 = ref();
const values3 = ref();

const datePickerRef = ref();
const datePickerRef2 = ref();

function setSingleDate() {
  value3.value = dayjs().add(1, 'day');
  datePickerRef.value?.confirmHandle();
}

function setRangeDate() {
  values3.value = [dayjs(), dayjs().add(5, 'minutes')];
  datePickerRef2.value?.confirmHandle();
}
</script>
