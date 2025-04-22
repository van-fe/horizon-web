<template>
  <n-row>
    <n-col :span="8">
      <div class="demo-title">
        Default: {{ value }}
      </div>
      <n-date-picker-v2 v-model="value" type="date" format="YYYY-MM-DD" />
    </n-col>
    <n-col :span="8">
      <div class="demo-title">
        Datetime Format: {{ value2 }}
      </div>
      <n-date-picker-v2 v-model="value2" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD HH:mm" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="8">
      <div class="demo-title">
        Timestamp: {{ value3 }}
      </div>
      <n-date-picker-v2 v-model="value3" type="datetime" format="YYYY-MM-DD HH:mm:ss" value-format="X" />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">
        Timestamp(ms): {{ value4 }}
      </div>
      <n-date-picker-v2 v-model="value4" type="date-range" format="YYYY/MM/DD wo" value-format="x" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref<Dayjs>();
const value2 = ref<string>();
const value3 = ref<number>(1734559200);
const value4 = ref<[number, number]>();
</script>
