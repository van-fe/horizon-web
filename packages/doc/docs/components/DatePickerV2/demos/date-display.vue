<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker v-model="value" type="date" placeholder="default" />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value2" type="date" :show-before-after-date="true" placeholder="show before after date" />
    </n-col>
    <n-col :span="6">
      <n-date-picker v-model="value3" type="date" :show-before-after-date="true" :fixed-six-rows="true" placeholder="fixed six rows" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
const value3 = ref();
</script>
