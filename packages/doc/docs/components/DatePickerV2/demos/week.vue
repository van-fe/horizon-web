<template>
  <n-row>
    <n-col :span="6">
      <n-date-picker-v2 v-model="value" type="week" format="[week] ww" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(new Date);
</script>
