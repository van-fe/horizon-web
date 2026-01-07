<template>
  <h-row>
    <h-col :span="6">
      <h-date-picker v-model="value" type="date" :show-year-button="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
</script>
