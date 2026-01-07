<template>
  <h-row>
    <h-col :span="6">
      <h-modal-time-picker v-model="value" start-at="08" end-at="21" placeholder="Please pick work time" />
    </h-col>
    <h-col :span="6">
      <h-modal-time-picker v-model="value2" start-at="00" end-at="30" placeholder="after the day" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
</script>
