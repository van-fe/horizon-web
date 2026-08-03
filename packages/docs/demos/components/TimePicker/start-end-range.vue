<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-time-picker v-model="value" start-at="08" end-at="21" placeholder="Please pick work time" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-time-picker v-model="value2" start-at="00" end-at="30" placeholder="after the day" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
