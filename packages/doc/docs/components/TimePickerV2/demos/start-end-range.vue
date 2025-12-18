<template>
  <n-row>
    <n-col :span="6">
      <n-time-picker-v2 v-model="value" start-at="08" end-at="21" placeholder="Please pick work time" />
    </n-col>
    <n-col :span="6">
      <n-time-picker-v2 v-model="value2" start-at="00" end-at="30" placeholder="after the day" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
