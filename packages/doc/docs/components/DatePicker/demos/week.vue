<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="week" format="[week] ww" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(new Date);
</script>
