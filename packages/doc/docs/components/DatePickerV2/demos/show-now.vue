<template>
  <n-row align="middle">
    <n-col :span="4">
      Date:
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value" show-now default-time="00:00" />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="values" type="dateRange" show-now default-time="00:00" />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      Datetime:
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value2" type="dateSeconds" show-now default-time="00:00" need-confirm />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="values2" type="dateSecondsRange" show-now need-confirm />
    </n-col>
  </n-row>
  <n-row align="middle">
    <n-col :span="4">
      Custom:
    </n-col>
    <n-col :span="6">
      <n-date-picker ref="datePickerRef" v-model="value3">
        <template #showNow>
          <n-button size="small" plain @click="setSingleDate">Tomorrow</n-button>
        </template>
      </n-date-picker>
    </n-col>
    <n-col :span="6">
      <n-date-picker ref="datePickerRef2" v-model="values3" type="datetimeRange">
        <template #showNow>
          <n-button size="small" plain @click="setRangeDate">Five minute later</n-button>
        </template>
      </n-date-picker>
    </n-col>
  </n-row>
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
