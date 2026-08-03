<template>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">
        Default: {{ value }}
      </div>
      <h-date-picker v-model="value" type="date" format="YYYY-MM-DD" />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">
        Datetime Format: {{ value2 }}
      </div>
      <h-date-picker v-model="value2" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD HH:mm" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">
        Timestamp: {{ value3 }}
      </div>
      <h-date-picker v-model="value3" type="datetime" format="YYYY-MM-DD HH:mm:ss" value-format="X" />
    </h-grid-item>
    <h-grid-item :span="12">
      <div class="demo-title">
        Timestamp(ms): {{ value4 }}
      </div>
      <h-date-picker v-model="value4" type="date-range" format="YYYY/MM/DD wo" value-format="x" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

const value = ref<Dayjs>();
const value2 = ref<string>();
const value3 = ref<number>(1734559200);
const value4 = ref<[number, number]>();
</script>
